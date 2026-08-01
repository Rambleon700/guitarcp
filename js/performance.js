// ------------------------------------------------------------
// PERFORMANCE.JS — FULL PERFORMANCE MODE ENGINE
// ------------------------------------------------------------

let perfPaused = false;
let currentSong = "Wonderwall";

// ------------------------------------------------------------
// BUTTON HANDLERS
// ------------------------------------------------------------

document.getElementById("enterPerformance").onclick = () => {
  enterPerformanceMode("Wonderwall");
};

document.getElementById("perfExit").onclick = () => {
  document.getElementById("performanceMode").classList.add("hidden");
  perfPaused = true;

  const video = document.getElementById("perfVideo");
  if (video) video.pause();
};

document.getElementById("perfPlay").onclick = () => {
  perfPaused = false;

  const video = document.getElementById("perfVideo");
  if (video) video.play();
};

document.getElementById("perfPause").onclick = () => {
  perfPaused = true;

  const video = document.getElementById("perfVideo");
  if (video) video.pause();
};

document.getElementById("perfRestart").onclick = () => {
  perfPaused = false;
  startPerformancePlayback(currentSong, true);
};

document.getElementById("perfVideoToggle").onclick = () => {
  const vid = document.getElementById("perfVideoContainer");
  vid.classList.toggle("hidden");
};

// ------------------------------------------------------------
// ENTER PERFORMANCE MODE
// ------------------------------------------------------------

function enterPerformanceMode(songTitle) {
  currentSong = songTitle;

  const perf = document.getElementById("performanceMode");
  perf.classList.remove("hidden");

  const song = getSongByTitle(songTitle);
  if (!song) return;

  document.getElementById("perfSongTitle").textContent = songTitle;

  renderStrumArrows("down", "perfStrumArrows");
  renderRhythmGrid(song.strumming, "perfRhythmGrid");

  startPerformancePlayback(songTitle, true);
}

// ------------------------------------------------------------
// METRONOME PULSE
// ------------------------------------------------------------

function pulseMetronome(targetId = "perfMetronome") {
  const m = document.getElementById(targetId);
  m.classList.add("active");

  setTimeout(() => m.classList.remove("active"), 120);
}

// ------------------------------------------------------------
// PERFORMANCE PLAYBACK ENGINE
// ------------------------------------------------------------

function startPerformancePlayback(songTitle, restart = false) {
  const song = getSongByTitle(songTitle);
  if (!song) return;

  const steps = song.strumming.replace(/\s+/g, "").split("");

  // Performance mode uses a single section (main)
  const sectionNames = ["main"];
  const sections = {
    main: { chords: song.chords }
  };

  let sectionIndex = 0;
  let chordIndex = 0;
  let stepIndex = 0;

  if (restart) perfPaused = false;

  // Load initial section
  function loadSection() {
    const sectionName = sectionNames[sectionIndex];
    const section = sections[sectionName];

    PracticeSession.bpm = song.bpm;
    updateTempo();

    loadChord(section.chords[chordIndex], "perfChordViewer");
  }

  loadSection();

  // Main performance loop
  function perfStep() {
    if (perfPaused) return;

    const sectionName = sectionNames[sectionIndex];
    const section = sections[sectionName];

    // Animate strum + rhythm
    animateStrumStep(stepIndex, "perfStrumArrows");
    highlightRhythmCell(stepIndex, "perfRhythmGrid");

    // Metronome pulse
    pulseMetronome("perfMetronome");

    // Play chord
    playChordAudio(section.chords[chordIndex]);

    // Advance step
    stepIndex++;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
      chordIndex++;

      // Loop chords
      if (chordIndex >= section.chords.length) {
        chordIndex = 0;
        sectionIndex++;

        // Loop entire song
        if (sectionIndex >= sectionNames.length) {
          sectionIndex = 0;
        }

        loadSection();
      }

      loadChord(section.chords[chordIndex], "perfChordViewer");
    }

    setTimeout(perfStep, getInterval());
  }

  setTimeout(perfStep, getInterval());
}
