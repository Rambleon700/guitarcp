// =============================================
// practice.js - Full Updated Version
// =============================================

const PracticeSession = {
  isPlaying: false,
  currentExercise: null
};

let practiceTimeout = null;

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

  // Try to use the current song's chords. Tempo always comes from the
  // shared currentBPM (kept in sync with the song and the BPM slider).
  if (titleEl && titleEl.textContent) {
    const song = SONG_LIBRARY.find(s => s.title === titleEl.textContent);
    if (song) {
      chords = song.chords || chords;
    }
  }

  PracticeSession.currentExercise = { chords };
  PracticeSession.isPlaying = true;

  if (practiceTimeout) clearTimeout(practiceTimeout);

  let index = 0;

  function step() {
    if (!PracticeSession.isPlaying) return;

    const chord = chords[index % chords.length];
    loadChord(chord);
    playChordAudio(chord);
    index++;

    // Re-read currentBPM every step, so dragging the slider mid-practice
    // changes tempo immediately instead of only on the next start.
    const intervalMs = (60000 / currentBPM) / 2;
    practiceTimeout = setTimeout(step, intervalMs);
  }

  step();

  console.log(`▶️ Practice started - ${chords.join(" → ")} @ ${currentBPM} BPM`);
}

function stopPracticeSession() {
  PracticeSession.isPlaying = false;
  if (practiceTimeout) {
    clearTimeout(practiceTimeout);
    practiceTimeout = null;
  }
  console.log("⏹️ Practice stopped");
}

// Make functions available to HTML buttons
window.playChordAudio = playChordAudio;
window.startCustomExercise = startCustomExercise;
window.stopPracticeSession = stopPracticeSession;
