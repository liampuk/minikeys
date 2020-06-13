# MiniKeys

A small javascript library for playing piano samples, simply pass in an array of samples with the following naming scheme:

`[p/f][midi note]`

*piano* (low velocity) samples should begin with **p**, and *forte* (high velocity) samples should begin with **f**. *midi note* should correspond to the midi value of the note (ie. **60** for *C4*).

example:
```
'/samples/p45.ogg'
'/samples/f45.ogg'
```
- 1 sample of *C4* provided for *piano* and *forte* dynamics.