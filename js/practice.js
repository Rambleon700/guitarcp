// =============================================
// practice.js - Minimal Working Version
// =============================================

let currentBPM = 80;
let isPlaying = false;
let timer = null;

// Global session
const PracticeSession = {
  currentExercise: null,
  isPlaying: false
};

// Play a chord sound
function playChordAudio(chordName = "Em") {
  ensureChordExists(chordName);
  const chordData = CHORDS[chordName].voicings[0];
  playChord(chordData);   // from engine.js
  console.log("Playing chord:", chordName);
}

// Start Practice
function startCustomExercise(ex) {
  PracticeSession.currentExercise = ex;
  PracticeSession.isPlaying = true;
  isPlaying = true;

  document.getElementById("currentSongTitle").textContent = "Practice Mode";

  // Show first chord
  if (ex.chords && ex.chords.length > 0) {
    loadChord(ex.chords[0]);
  }

  console.log("✅ Practice Started with", ex.chords);
  alert("Practice Started! Check console for logs.");
}

// Stop Practice
function stopPracticeSession() {
  PracticeSession.isPlaying = false;
  isPlaying = false;
  console.log("⛔ Practice Stopped");
}

// Build custom exercise (simple)
function buildCustomExercise() {
  return {
    chords: ["Em", "C", "G", "D"],
    pattern: "D DU UDU",
    bpm: currentBPM,
    duration: 60
  };
}

// Make functions globally available
window.playChordAudio = playChordAudio;
window.startCustomExercise = startCustomExercise;
window.stopPracticeSession = stopPracticeSession;
window.buildCustomExercise = buildCustomExercise;
