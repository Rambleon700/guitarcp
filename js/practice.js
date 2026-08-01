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

// small helper to safely access DOM elements
function getEl(id) {
  return document.getElementById(id);
}

// ------------------------------------------------------------
// BPM + TEMPO CONTROL
// ------------------------------------------------------------

function getInterval() {
  // Half-beat interval (8 steps per bar)
  return 60000 / PracticeSession.bpm / 2;
}

function updateTempo() {
  const display = getEl("bpmDisplay");
  if (display) display.textContent = PracticeSession.bpm;
  const slider = getEl("bpmSlider");
  if (slider) slider.value = PracticeSession.bpm;
}

const bpmSliderEl = getEl("bpmSlider");
if (bpmSliderEl) {
  bpmSliderEl.oninput = e => {
    const v = parseInt(e.target.value);
    if (!Number.isNaN(v)) PracticeSession.bpm = v;
    updateTempo();
  };
}

// Ensure the UI reflects the initial tempo if elements exist
updateTempo();

// ------------------------------------------------------------
// DIFFICULTY SCALING
// ------------------------------------------------------------

function applyDifficulty(ex) {
  if (ex.difficulty === 1) PracticeSession.bpm = (ex.bpm || PracticeSession.bpm) - 10;
  else if (ex.difficulty === 3) PracticeSession.bpm = (ex.bpm || PracticeSession.bpm) + 10;
  else PracticeSession.bpm = (ex.bpm || PracticeSession.bpm);

  updateTempo();
}

// ------------------------------------------------------------
// AUTO ACCELERATION (RAMP MODE)
// ------------------------------------------------------------

function applyAutoAcceleration() {
  const rate = 2;   // BPM increase per loop
  const max = 140;  // safety cap

  if (typeof PracticeSession.bpm !== 'number' || Number.isNaN(PracticeSession.bpm)) PracticeSession.bpm = 72;

  if (PracticeSession.bpm < max) {
    PracticeSession.bpm += rate;
    updateTempo();
  }
}

// ------------------------------------------------------------
// CUSTOM EXERCISE BUILDER
// ------------------------------------------------------------

function buildCustomExercise() {
  // use safe getters so this function doesn't throw when elements are missing
  const chordsRaw = getEl("customChords") ? getEl("customChords").value : "";
  const patternRaw = getEl("customPattern") ? getEl("customPattern").value : "dduudd";
  const bpmRaw = getEl("customBPM") ? getEl("customBPM").value : PracticeSession.bpm;
  const tempoModeRaw = getEl("customTempoMode") ? getEl("customTempoMode").value : PracticeSession.mode;
  const durationRaw = getEl("customDuration") ? getEl("customDuration").value : 60;
  const difficultyRaw = getEl("customDifficulty") ? getEl("customDifficulty").value : 2;

  return {
    type: "custom",
    chords: chordsRaw
      .split(",")
      .map(c => c.trim())
      .filter(Boolean),

    pattern: String(patternRaw).trim(),
    bpm: parseInt(bpmRaw) || PracticeSession.bpm,
    tempoMode: String(tempoModeRaw) || PracticeSession.mode,
    duration: parseInt(durationRaw) || 60,
    difficulty: parseInt(difficultyRaw) || 2
  };
}

const addExerciseBtn = getEl("addExercise");
if (addExerciseBtn) {
  addExerciseBtn.onclick = () => {
    const ex = buildCustomExercise();
    PracticeQueue.push(ex);
  };
}

const startExerciseBtn = getEl("startExercise");
if (startExerciseBtn) {
  startExerciseBtn.onclick = () => {
    const ex = buildCustomExercise();
    startCustomExercise(ex);
  };
}

// ------------------------------------------------------------
// STRUMMING PATTERN PARSER
// ------------------------------------------------------------

function parseStrummingPattern(pattern) {
  if (!pattern) return [];
  return pattern.replace(/\s+/g, "").split("");
}

// ------------------------------------------------------------
// SCHEDULER
// ------------------------------------------------------------

function scheduleNextStep(callback) {
  // guard getInterval in case bpm is invalid
  const interval = Number(getInterval()) || 1000;
  setTimeout(callback, interval);
}

// ------------------------------------------------------------
// PLAY CHORD AUDIO (SAFE)
// ------------------------------------------------------------

function playChordAudio(chordName) {
  if (!chordName) return;
  if (typeof ensureChordExists === 'function') {
    ensureChordExists(chordName);
  }
  if (typeof CHORDS === 'undefined' || !CHORDS[chordName]) return;
  const chordData = CHORDS[chordName].voicings[0];
  if (chordData && typeof playChord === 'function') playChord(chordData);
}

// ------------------------------------------------------------
// STRUM ANIMATION
// ------------------------------------------------------------

function animateStrumStep(stepIndex, targetId = "strum-arrows") {
  const container = getEl(targetId);
  if (!container) return;
  const arrows = container.querySelectorAll(`.strum-arrow`);
  arrows.forEach(a => a.classList.remove("flash"));
  const arrow = arrows[stepIndex];
  if (arrow) arrow.classList.add("flash");
}

// ------------------------------------------------------------
// PRACTICE ENGINE — MAIN LOOP
// ------------------------------------------------------------

function startCustomExercise(ex) {
  if (!ex) return;

  PracticeSession.currentExercise = ex;
  PracticeSession.mode = ex.tempoMode || PracticeSession.mode;
  PracticeSession.loopCount = 0;
  PracticeSession.isPlaying = true;

  applyDifficulty(ex);

  const steps = parseStrummingPattern(ex.pattern);
  let chordIndex = 0;
  let stepIndex = 0;

  if (!ex.chords || !ex.chords.length) return;

  // Initial render (guarded)
  if (typeof loadChord === 'function') loadChord(ex.chords[chordIndex]);
  if (typeof renderStrumArrows === 'function') renderStrumArrows("down", "strum-arrows");
  if (typeof renderRhythmGrid === 'function') renderRhythmGrid(ex.pattern, "rhythmGrid");

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
    if (typeof highlightRhythmCell === 'function') highlightRhythmCell(stepIndex, "rhythmGrid");

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

      if (typeof loadChord === 'function') loadChord(ex.chords[chordIndex]);
    }

    scheduleNextStep(loopStep);
  }

  scheduleNextStep(loopStep);
}

function loadSongIntoPractice(title) {
  const song = typeof getSongByTitle === 'function' ? getSongByTitle(title) : null;
  if (!song) return;

  // Populate the practice form fields (guarded)
  const customChordsEl = getEl("customChords");
  if (customChordsEl) customChordsEl.value = song.chords.join(", ");
  const customPatternEl = getEl("customPattern");
  if (customPatternEl) customPatternEl.value = song.strumming;
  const customBPMEl = getEl("customBPM");
  if (customBPMEl) customBPMEl.value = song.bpm;
  const customTempoModeEl = getEl("customTempoMode");
  if (customTempoModeEl) customTempoModeEl.value = "static";
  const customDurationEl = getEl("customDuration");
  if (customDurationEl) customDurationEl.value = 60;
  const customDifficultyEl = getEl("customDifficulty");
  if (customDifficultyEl) customDifficultyEl.value = 2;

  // Build and start the exercise
  const ex = buildCustomExercise();
  startCustomExercise(ex);
}

// ------------------------------------------------------------
// STOP PRACTICE SESSION
// ------------------------------------------------------------

function stopPracticeSession() {
  PracticeSession.isPlaying = false;
}
