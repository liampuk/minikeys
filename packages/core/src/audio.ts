import type { NoteName, Sample } from './types.js';
import { getClosestNote, noteToMidi } from './utils.js';

export class MiniKeys {
  private audioContext: AudioContext;
  private compressorNode: DynamicsCompressorNode;
  private forteNotes: Map<number, AudioBuffer> = new Map();
  private pianoNotes: Map<number, AudioBuffer> = new Map();
  private sustain: boolean = false;
  private playingNotes: Map<AudioBufferSourceNode, {node: GainNode, note: number}> = new Map();
  private progress: number = 0;

  constructor() {
    this.audioContext = new AudioContext();
    this.compressorNode = this.audioContext.createDynamicsCompressor();
    this.compressorNode.threshold.value = -24;
    this.compressorNode.knee.value = 0;
    this.compressorNode.ratio.value = 2;
    this.compressorNode.attack.value = 0.001;
    this.compressorNode.release.value = 0.5;
    this.compressorNode.connect(this.audioContext.destination);
  }

  setSustain = (sustain: boolean) => {
    this.sustain = sustain;
    if (!sustain) {
      this.playingNotes.forEach((gainNode) => {
        const now = this.audioContext.currentTime;
        gainNode.node.gain.cancelScheduledValues(now);
        gainNode.node.gain.setValueAtTime(gainNode.node.gain.value, now);
        gainNode.node.gain.linearRampToValueAtTime(0.001, now + 0.5);
      });
    } else {
      this.playingNotes.forEach((gainNode) => {
        const now = this.audioContext.currentTime;
        gainNode.node.gain.cancelScheduledValues(now);
        gainNode.node.gain.setValueAtTime(gainNode.node.gain.value, now);
      });
    }
  };

  loadNotes = async (
    samples: Sample[],
    handleSampleLoaded?: (progress: number) => void,
  ) => {
    this.forteNotes.clear();
    this.pianoNotes.clear();

    const requests = samples.map(async (sample) => {
      const data = await fetch(sample.url);
      const arrayBuffer = await data.arrayBuffer();
      const decodedAudio = await this.audioContext.decodeAudioData(arrayBuffer);
      if (sample.velocity === 'piano') {
        this.pianoNotes.set(noteToMidi[sample.note], decodedAudio);
      } else {
        this.forteNotes.set(noteToMidi[sample.note], decodedAudio);
      }
      if (handleSampleLoaded) {
        const newProgress =
          (this.pianoNotes.size + this.forteNotes.size) / samples.length;
        if (newProgress > this.progress) {
          this.progress = newProgress;
          handleSampleLoaded(this.progress);
        }
      }
    });
    return await Promise.all(requests);
  };

  playNoteFromMidi = (midiNote: number, velocity?: number) => {
    const gain = 0.5;
    if (midiNote < 0 || midiNote > 127) {
      throw new Error('Invalid midi note');
    } else if (velocity && (velocity < 0 || velocity > 127)) {
      throw new Error('Invalid velocity value');
    } else if (!this.audioContext) {
      throw new Error('Audio context not initialized');
    }

    const source = this.audioContext.createBufferSource();

    const { closestNoteMidi, closestNote } = getClosestNote(
      this.forteNotes,
      this.pianoNotes,
      midiNote,
      velocity,
    );

    if (closestNote) {
      source.buffer = closestNote;

      const gainNode = this.audioContext.createGain();
      const clippedVelocity = Math.min(127, velocity ?? 127);
      gainNode.gain.value = ((clippedVelocity / 127) * 0.9 + 0.1) * gain;

      source.connect(gainNode);

      gainNode.connect(this.compressorNode);
      source.playbackRate.value = 2 ** ((midiNote - closestNoteMidi) / 12);

      source.start();
      this.playingNotes.set(source, {node: gainNode, note: midiNote});

      // if (!this.sustain) {
      //   const now = this.audioContext.currentTime;
      //   // gainNode.gain.exponentialRampToValueAtTime(Number.EPSILON, now + 8);
      //   gainNode.gain.cancelScheduledValues(now);
      //   gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      //   gainNode.gain.exponentialRampToValueAtTime(Number.EPSILON, now + 8);
      // }
      source.onended = () => {
        source.disconnect();
        this.playingNotes.delete(source);
      };
    } else {
      throw new Error('Note not found');
    }
  };

  playNoteFromName = (noteName: NoteName, velocity?: number) => {
    this.playNoteFromMidi(noteToMidi[noteName], velocity);
  };

  liftNoteFromMidi = (midiNote: number) => {
    this.playingNotes.forEach((gainNode) => {
      if(gainNode.note === midiNote) {
        if (!this.sustain) {
          const now = this.audioContext.currentTime;
          // gainNode.gain.exponentialRampToValueAtTime(Number.EPSILON, now + 8);
          gainNode.node.gain.cancelScheduledValues(now);
          gainNode.node.gain.setValueAtTime(gainNode.node.gain.value, now);
          gainNode.node.gain.exponentialRampToValueAtTime(Number.EPSILON, now + 8);
        }
      }
    })
  }

  liftNoteFromName = (noteName: NoteName, velocity?: number) => {
    this.liftNoteFromMidi(noteToMidi[noteName]);
  };
}
