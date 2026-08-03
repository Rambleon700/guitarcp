// =============================================
// practice.js - Full Updated Version
// =============================================

const PracticeSession = {
  isPlaying: false,
  currentExercise: null
};

let practiceInterval = null;

function playChordAudio(chordName = "Em") {
  if (typeof playChord === "function") {
    ensureChordExists(chordName);
    const chordData = CHORDS[chordName].voicings[0];
    playChord(chordData);
  }
}

function startCustomExercise() {
  const titleEl = document.getElementById("currentSongTitle");
  let chords = ["Em", "C", "G", "D"];
  let bpm = 80;

  // Try to use current song's chords and BPM
  if (titleEl && titleEl.textContent) {
    const song = SONG_LIBRARY.find(s => s.title === titleEl.textContent);
    if (song) {
      chords = song.chords || chords;
      bpm = song.bpm || bpm;
    }
  }

  PracticeSession.currentExercise = { chords, bpm };
  PracticeSession.isPlaying = true;

  if (practiceInterval) clearInterval(practiceInterval);

  // Timing based on BPM (roughly half-beat)
  const intervalMs = (60000 / bpm) / 2;

  let index = 0;

  practiceInterval = setInterval(() => {
    if (!PracticeSession.isPlaying) {
      clearInterval(practiceInterval);
      return;
    }

    const chord = chords[index % chords.length];
    loadChord(chord);
    playChordAudio(chord);
    index++;
  }, intervalMs);

  console.log(`▶️ Practice started - ${chords.join(" → ")} @ ${bpm} BPM`);
}

function stopPracticeSession() {
  PracticeSession.isPlaying = false;
  if (practiceInterval) {
    clearInterval(practiceInterval);
    practiceInterval = null;
  }
  console.log("⏹️ Practice stopped");
}

// Make functions available to HTML buttons
window.playChordAudio = playChordAudio;
window.startCustomExercise = startCustomExercise;
window.stopPracticeSession = stopPracticeSession;
