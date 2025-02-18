import { describe, expect, test, vi } from 'vitest';
import { getClosestNote } from './utils.js';

vi.stubGlobal(
  'AudioBuffer',
  class {
    length: number;
    sampleRate: number;

    constructor({
      length,
      sampleRate,
    }: {
      length: number;
      sampleRate: number;
    }) {
      this.length = length;
      this.sampleRate = sampleRate;
    }
  },
);

describe('utils', () => {
  test('finds closest midi note for undefined velocity', () => {
    const expecetdAudioBuffer = new AudioBuffer({ length: 1, sampleRate: 0 });

    const forteNotes = new Map([
      [10, mockAudioBuffer],
      [20, expecetdAudioBuffer],
    ]);
    const pianoNotes = new Map([
      [10, mockAudioBuffer],
      [20, mockAudioBuffer],
    ]);

    const { closestNoteMidi, closestNote } = getClosestNote(
      forteNotes,
      pianoNotes,
      22,
    );

    expect(closestNoteMidi).toBe(20);
    expect(closestNote).toBe(expecetdAudioBuffer);
  });

  test('finds closest midi note for forte velocity', () => {
    const expecetdAudioBuffer = new AudioBuffer({ length: 1, sampleRate: 0 });

    const forteNotes = new Map([
      [10, mockAudioBuffer],
      [20, expecetdAudioBuffer],
    ]);
    const pianoNotes = new Map([
      [10, mockAudioBuffer],
      [20, mockAudioBuffer],
    ]);

    const { closestNoteMidi, closestNote } = getClosestNote(
      forteNotes,
      pianoNotes,
      22,
      80,
    );

    expect(closestNoteMidi).toBe(20);
    expect(closestNote).toBe(expecetdAudioBuffer);
  });

  test('finds closest midi note for piano velocity', () => {
    const expecetdAudioBuffer = new AudioBuffer({ length: 1, sampleRate: 0 });

    const forteNotes = new Map([
      [10, mockAudioBuffer],
      [20, mockAudioBuffer],
    ]);
    const pianoNotes = new Map([
      [10, mockAudioBuffer],
      [20, expecetdAudioBuffer],
    ]);

    const { closestNoteMidi, closestNote } = getClosestNote(
      forteNotes,
      pianoNotes,
      22,
      20,
    );

    expect(closestNoteMidi).toBe(20);
    expect(closestNote).toBe(expecetdAudioBuffer);
  });
});

const mockAudioBuffer = new AudioBuffer({ length: 0, sampleRate: 0 });
