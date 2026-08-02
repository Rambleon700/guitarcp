// ------------------------------------------------------------
// PRACTICE.JS — CUSTOM EXERCISES + PRACTICE ENGINE
// ------------------------------------------------------------

// Global practice session state
const PracticeSession = {
  bpm: 72,
  mode: "static",     // static | ramp | curve
  loopCount: 0,
  isPlaying: false,
  currentExercise: null
};

const PracticeQueue = [];

// ------------------------------------------------------------
// BPM + TEMPO CONTROL
// ------------------------------------------------------------

function getInterval() {
  // Half-beat interval (8 steps per bar)
  return 60000 / PracticeSession.bpm / 2;
}

function updateTempo() {
  const disp = document.getElementById("bpmDisplay");
  if (disp) disp.textContent = PracticeSession.bpm;

  const slider = document.getElementById("bpmSlider");
  if (slider) slider.value = PracticeSession.bpm;
}

document.getElementById("bpmSlider").oninput = e => {
  PracticeSession.bpm = parseInt(e.target.value);
  updateTempo();
};

// ------------------------------------------------------------
// DIFFICULTY SCALING
// ------------------------------------------------------------

function applyDifficulty(ex) {
  if (ex.difficulty === 1) PracticeSession.bpm = ex.bpm - 10;
  else if (ex.difficulty === 3) PracticeSession.bpm = ex.bpm + 10;
  else PracticeSession.bpm = ex.bpm;

  updateTempo();
}

// ------------------------------------------------------------
// AUTO ACCELERATION (RAMP MODE)
// ------------------------------------------------------------

function applyAutoAcceleration() {
  const rate = 2;   // BPM increase per loop
  const max = 140;  // safety cap

  if (PracticeSession.bpm < max) {
    PracticeSession.bpm += rate;
    updateTempo();
  }
}

// ------------------------------------------------------------
// CUSTOM EXERCISE BUILDER
// ------------------------------------------------------------

function buildCustomExercise() {
  return {
    type: "custom",
    chords: document.getElementById("customChords").value
      .split(",")
      .map(c => c.trim())
      .filter(Boolean),

    pattern: document.getElementById("customPattern").value.trim(),
    bpm: parseInt(document.getElementById("customBPM").value),
    tempoMode: document.getElementById("customTempoMode").value,
    duration: parseInt(document.getElementById("customDuration").value),
    difficulty: parseInt(document.getElementById("customDifficulty").value)
  };
}

document.getElementById("addExercise").onclick = () => {
  const ex = buildCustomExercise();
  PracticeQueue.push(ex);
};

document.getElementById("startExercise").onclick = () => {
  const ex = buildCustomExercise();
  startCustomExercise(ex);
};

// ------------------------------------------------------------
// STRUMMING PATTERN PARSER
// ------------------------------------------------------------

function parseStrummingPattern(pattern) {
  return pattern.replace(/\s+/g, "").split("");
}

// ------------------------------------------------------------
// SCHEDULER
// ------------------------------------------------------------

function scheduleNextStep(callback) {
  setTimeout(callback, getInterval());
}

// ------------------------------------------------------------
// PLAY CHORD AUDIO (SAFE)
// ------------------------------------------------------------

function playChordAudio(chordName) {
  ensureChordExists(chordName);
  const chordData = CHORDS[chordName].voicings[0];
  playChord(chordData);
}

// ------------------------------------------------------------
// STRUM ANIMATION
// ------------------------------------------------------------

function animateStrumStep(stepIndex, targetId = "strum-arrows") {
  const arrows = document.querySelectorAll(`#${targetId} .strum-arrow`);
  arrows.forEach(a => a.classList.remove("flash"));
  const arrow = arrows[stepIndex];
  if (arrow) arrow.classList.add("flash");
}

// ------------------------------------------------------------
// PRACTICE ENGINE — MAIN LOOP
// ------------------------------------------------------------

function startCustomExercise(ex) {
  PracticeSession.currentExercise = ex;
  PracticeSession.mode = ex.tempoMode;
  PracticeSession.loopCount = 0;
  PracticeSession.isPlaying = true;

  applyDifficulty(ex);

  const steps = parseStrummingPattern(ex.pattern);
  let chordIndex = 0;
  let stepIndex = 0;

  // ⭐ Show first chord immediately (fixes your issue)
  loadChord(ex.chords[chordIndex]);
  renderStrumArrows("down", "strum-arrows");
  renderRhythmGrid(ex.pattern, "rhythmGrid");

  const startTime = Date.now();

  function loopStep() {
    if (!PracticeSession.isPlaying) return;

    // Stop after duration
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed >= ex.duration) {
      stopPracticeSession();
      return;
    }

    // Animate strum + rhythm
    animateStrumStep(stepIndex, "strum-arrows");
    highlightRhythmCell(stepIndex, "rhythmGrid");

    // Play chord
    playChordAudio(ex.chords[chordIndex]);

    // Advance step
    stepIndex++;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
      chordIndex++;

      // Loop chords
      if (chordIndex >= ex.chords.length) {
        chordIndex = 0;
        PracticeSession.loopCount++;

        // Ramp mode auto-acceleration
        if (PracticeSession.mode === "ramp") {
          applyAutoAcceleration();
        }
      }

      loadChord(ex.chords[chordIndex]);
    }

    scheduleNextStep(loopStep);
  }

  scheduleNextStep(loopStep);
}

// ------------------------------------------------------------
// STOP PRACTICE SESSION
// ------------------------------------------------------------

function stopPracticeSession() {
  PracticeSession.isPlaying = false;
}
// ------------------------------------------------------------
// LOAD SONG INTO PRACTICE MODE
// ------------------------------------------------------------

function loadSongIntoPractice(title) {
  const song = SONG_LIBRARY.find(s => s.title === title);
  if (!song) return;

  // Update song title under chord viewer
  document.getElementById("currentSongTitle").textContent = song.title;

  // Load first chord immediately
  if (song.chords.length > 0) {
    loadChord(song.chords[0]);
  }

  // Update BPM slider + display
  document.getElementById("bpmSlider").value = song.bpm;
  document.getElementById("bpmDisplay").textContent = song.bpm;

  // Store exercise for practice mode
  PracticeSession.currentExercise = {
    chords: song.chords,
    pattern: song.strumming,
    bpm: song.bpm
  };

  console.log("Loaded song into practice:", song.title);
}

// ------------------------------------------------------------
// PERFORMANCE MODE (simple version)
// ------------------------------------------------------------

function enterPerformanceMode(title) {
  const song = SONG_LIBRARY.find(s => s.title === title);
  if (!song) return;

  alert(`Performance Mode\n\n${song.title}\n${song.artist}\n\nChords: ${song.chords.join(", ")}\nStrumming: ${song.strumming}\nBPM: ${song.bpm}`);
}


// ------------------------------------------------------------
// START / STOP BUTTONS
// ------------------------------------------------------------

document.getElementById("practiceStart").onclick = () => {
  const ex = buildCustomExercise();
  startCustomExercise(ex);
};

document.getElementById("practiceStop").onclick = () => {
  stopPracticeSession();
};
