// practice.js - Cleaned

const PracticeSession = {
  isPlaying: false,
  currentExercise: null
};

function playChordAudio(chordName = "Em") {
  if (typeof playChord === "function") {
    ensureChordExists(chordName);
    const chordData = CHORDS[chordName].voicings[0];
    playChord(chordData);
  }
}

function startCustomExercise(ex = {chords: ["Em","C","G","D"], pattern: "D DU UDU", bpm: 80}) {
  PracticeSession.currentExercise = ex;
  PracticeSession.isPlaying = true;
  console.log("Practice started with", ex.chords);
  if (ex.chords && ex.chords.length) loadChord(ex.chords[0]);
}

function stopPracticeSession() {
  PracticeSession.isPlaying = false;
  console.log("Practice stopped");
}

// Make available globally
window.playChordAudio = playChordAudio;
window.startCustomExercise = startCustomExercise;
window.stopPracticeSession = stopPracticeSession;
