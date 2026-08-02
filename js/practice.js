// Clean practice.js
const PracticeSession = { isPlaying: false, currentExercise: null };

function playChordAudio(chordName = "Em") {
  if (typeof playChord === "function") {
    ensureChordExists(chordName);
    const chordData = CHORDS[chordName].voicings[0];
    playChord(chordData);
  }
  console.log("Play Chord:", chordName);
}

function startCustomExercise() {
  const ex = { chords: ["Em", "C", "G", "D"] };
  PracticeSession.currentExercise = ex;
  if (typeof loadChord === "function") loadChord("Em");
  console.log("✅ Start Practice clicked");
}

function stopPracticeSession() {
  console.log("⛔ Stop clicked");
}

// Global access
window.playChordAudio = playChordAudio;
window.startCustomExercise = startCustomExercise;
window.stopPracticeSession = stopPracticeSession;
