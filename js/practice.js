// =============================================
// practice.js - Full Updated Version
// =============================================

const PracticeSession = {
  isPlaying: false,
  currentExercise: null
};

let practiceTimeout = null;

// Turn a song's strumming text into an array of "D"/"U" strokes.
// Patterns already written as strokes (e.g. "D DU UDU") are used directly;
// anything else (Fingerstyle, Arpeggio, Pop Groove, Country, Reggae, ...)
// falls back to a standard alternating pattern so it still has a strum feel.
function parseStrumPattern(strumming) {
  const clean = (strumming || "").replace(/\s+/g, "");
  if (clean.length > 0 && /^[DU]+$/.test(clean)) {
    return clean.split("");
  }
  return ["D", "D", "U", "U", "D", "U"];
}

function playChordAudio(chordName = "Em", direction = "D", velocityScale = 1) {
  if (typeof playChord === "function") {
    ensureChordExists(chordName);
    const chordData = CHORDS[chordName].voicings[0];
    playChord(chordData, direction, velocityScale);
  }
}

function startCustomExercise() {
  const titleEl = document.getElementById("currentSongTitle");
  let chords = ["Em", "C", "G", "D"];
  let strumPattern = ["D", "D", "U", "U", "D", "U"];

  // Use the current song's chords and its real strumming pattern
  if (titleEl && titleEl.textContent) {
    const song = SONG_LIBRARY.find(s => s.title === titleEl.textContent);
    if (song) {
      chords = song.chords || chords;
      strumPattern = parseStrumPattern(song.strumming);
    }
  }

  PracticeSession.currentExercise = { chords, strumPattern };
  PracticeSession.isPlaying = true;

  if (practiceTimeout) clearTimeout(practiceTimeout);

  let chordIndex = 0;
  let strokeIndex = 0;

  function step() {
    if (!PracticeSession.isPlaying) return;

    const chord = chords[chordIndex % chords.length];
    const stroke = strumPattern[strokeIndex % strumPattern.length];

    loadChord(chord);
    // Upstrokes are quieter and lighter, like a real strum
    playChordAudio(chord, stroke, stroke === "U" ? 0.7 : 1);

    strokeIndex++;
    // Move to the next chord only once the full strum pattern has played
    if (strokeIndex % strumPattern.length === 0) {
      chordIndex++;
    }

    // Re-read currentBPM every step so slider changes apply immediately
    const intervalMs = (60000 / currentBPM) / 2;
    practiceTimeout = setTimeout(step, intervalMs);
  }

  step();

  console.log(`▶️ Practice started - ${chords.join(" → ")} (${strumPattern.join("")}) @ ${currentBPM} BPM`);
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
