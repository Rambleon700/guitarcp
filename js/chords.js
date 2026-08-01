// FULL OPEN-CHORD DICTIONARY
// Covers all chords used in your 55-song library

const CHORDS = {

  // --- Major open chords ---
  C: {
    name: "C Major",
    voicings: [
      { frets: [0, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], position: 1 }
    ]
  },

  D: {
    name: "D Major",
    voicings: [
      { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], position: 1 }
    ]
  },

  E: {
    name: "E Major",
    voicings: [
      { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], position: 1 }
    ]
  },

  F: {
    name: "F Major (easy)",
    voicings: [
      { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], position: 1 }
    ]
  },

  G: {
    name: "G Major",
    voicings: [
      { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3], position: 1 }
    ]
  },

  A: {
    name: "A Major",
    voicings: [
      { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], position: 1 }
    ]
  },

  B: {
    name: "B Major (easy)",
    voicings: [
      { frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 3, 4, 2, 1], position: 2 }
    ]
  },

  // --- Minor open chords ---
  Am: {
    name: "A Minor",
    voicings: [
      { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0], position: 1 }
    ]
  },

  Dm: {
    name: "D Minor",
    voicings: [
      { frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], position: 1 }
    ]
  },

  Em: {
    name: "E Minor",
    voicings: [
      { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], position: 1 }
    ]
  },

  // --- Dominant 7 chords ---
  A7: {
    name: "A7",
    voicings: [
      { frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0], position: 1 }
    ]
  },

  B7: {
    name: "B7",
    voicings: [
      { frets: [2, 1, 2, 2, 0, 2], fingers: [2, 1, 3, 4, 0, 2], position: 1 }
    ]
  },

  C7: {
    name: "C7",
    voicings: [
      { frets: [0, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0], position: 1 }
    ]
  },

  D7: {
    name: "D7",
    voicings: [
      { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3], position: 1 }
    ]
  },

  E7: {
    name: "E7",
    voicings: [
      { frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], position: 1 }
    ]
  },

  G7: {
    name: "G7",
    voicings: [
      { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], position: 1 }
    ]
  },

  // --- Major 7 chords ---
  Cmaj7: {
    name: "Cmaj7",
    voicings: [
      { frets: [0, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0], position: 1 }
    ]
  },

  Dmaj7: {
    name: "Dmaj7",
    voicings: [
      { frets: [-1, -1, 0, 2, 2, 2], fingers: [0, 0, 0, 1, 1, 1], position: 1 }
    ]
  },

  Gmaj7: {
    name: "Gmaj7",
    voicings: [
      { frets: [3, 2, 0, 0, 0, 2], fingers: [3, 2, 0, 0, 0, 1], position: 1 }
    ]
  },

  // --- Minor 7 chords ---
  Am7: {
    name: "Am7",
    voicings: [
      { frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0], position: 1 }
    ]
  },

  Dm7: {
    name: "Dm7",
    voicings: [
      { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1], position: 1 }
    ]
  },

  Em7: {
    name: "Em7",
    voicings: [
      { frets: [0, 2, 2, 0, 3, 0], fingers: [0, 2, 3, 0, 4, 0], position: 1 }
    ]
  },

  // --- Suspended chords ---
  Csus2: {
    name: "Csus2",
    voicings: [
      { frets: [0, 3, 0, 0, 1, 3], fingers: [0, 3, 0, 0, 1, 4], position: 1 }
    ]
  },

  Csus4: {
    name: "Csus4",
    voicings: [
      { frets: [0, 3, 2, 0, 1, 1], fingers: [0, 3, 2, 0, 1, 1], position: 1 }
    ]
  },

  Dsus2: {
    name: "Dsus2",
    voicings: [
      { frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 3, 0], position: 1 }
    ]
  },

  Dsus4: {
    name: "Dsus4",
    voicings: [
      { frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4], position: 1 }
    ]
  },

  // --- Add chords ---
  Cadd9: {
    name: "Cadd9",
    voicings: [
      { frets: [3, 3, 2, 0, 3, 0], fingers: [2, 3, 1, 0, 4, 0], position: 1 }
    ]
  },

  Dadd9: {
    name: "Dadd9",
    voicings: [
      { frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 3, 0], position: 1 }
    ]
  },

  // --- Slash chords ---
  "D/F#": {
    name: "D/F#",
    voicings: [
      { frets: [2, -1, 0, 2, 3, 2], fingers: [2, 0, 0, 1, 3, 2], position: 1 }
    ]
  },

  "G/B": {
    name: "G/B",
    voicings: [
      { frets: [-1, 2, 0, 0, 0, 3], fingers: [0, 1, 0, 0, 0, 3], position: 1 }
    ]
  },

  "C/E": {
    name: "C/E",
    voicings: [
      { frets: [0, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], position: 1 }
    ]
  },

  // --- Special chords used in your songs ---
  "A7sus4": {
    name: "A7sus4",
    voicings: [
      { frets: [-1, 0, 2, 0, 3, 0], fingers: [0, 0, 2, 0, 3, 0], position: 1 }
    ]
  },

  "D6add9/F#": {
    name: "D6add9/F#",
    voicings: [
      { frets: [2, -1, 0, 2, 0, 0], fingers: [2, 0, 0, 1, 0, 0], position: 1 }
    ]
  }
};

// --- SAFETY FALLBACK FOR ANY MISSING CHORD ---
function ensureChordExists(name) {
  if (!CHORDS[name]) {
    CHORDS[name] = {
      name,
      voicings: [
        { frets: [-1, -1, -1, -1, -1, -1], fingers: [0, 0, 0, 0, 0, 0], position: 1 }
      ]
    };
  }
}
