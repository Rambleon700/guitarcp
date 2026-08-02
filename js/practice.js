// practice.js - Minimal Clean Version

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
  console.log("🎸 Playing chord:", chordName);
}

function startCustomExercise() {
  const ex = { chords: ["Em", "C", "G", "D"] };
  PracticeSession.currentExercise = ex;
  if (typeof loadChord === "function") loadChord("Em");
  console.log("▶️ Practice Started");
}

function stopPracticeSession() {
  console.log("⏹️ Practice Stopped");
}

window.playChordAudio = playChordAudio;
window.startCustomExercise = startCustomExercise;
window.stopPracticeSession = stopPracticeSession;
