// practice.js - Improved

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

let practiceInterval = null;

function startCustomExercise() {
  // Use current song if available
  const titleEl = document.getElementById("currentSongTitle");
  let chords = ["Em", "C", "G", "D"]; // fallback

  if (titleEl && titleEl.textContent) {
    // Try to find song by title
    const song = SONG_LIBRARY.find(s => s.title === titleEl.textContent);
    if (song && song.chords) chords = song.chords;
  }

  PracticeSession.currentExercise = { chords };
  PracticeSession.isPlaying = true;

  let index = 0;

  if (practiceInterval) clearInterval(practiceInterval);

  practiceInterval = setInterval(() => {
    if (!PracticeSession.isPlaying) {
      clearInterval(practiceInterval);
      return;
    }
    const chord = chords[index % chords.length];
    loadChord(chord);
    playChordAudio(chord);
    index++;
  }, 1200); // Change chord every 1.2 seconds

  console.log("▶️ Practice started with chords:", chords);
}

function stopPracticeSession() {
  PracticeSession.isPlaying = false;
  if (practiceInterval) clearInterval(practiceInterval);
  console.log("⏹️ Practice stopped");
}

// Global
window.playChordAudio = playChordAudio;
window.startCustomExercise = startCustomExercise;
window.stopPracticeSession = stopPracticeSession;
