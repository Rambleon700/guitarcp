// =============================================
// engine.js - Core Chord Renderer + Audio
// =============================================

// Global BPM
let currentBPM = 80;

// SVG Chord Renderer
function renderChordDiagram(container, chord) {
  container.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 120 160");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");

  const numStrings = 6;
  const numFrets = 4;
  const stringSpacing = 100 / (numStrings - 1);
  const fretSpacing = 120 / numFrets;

  // Strings
  for (let i = 0; i < numStrings; i++) {
    const x = 10 + i * stringSpacing;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", x); line.setAttribute("y1", 20);
    line.setAttribute("x2", x); line.setAttribute("y2", 140);
    line.setAttribute("stroke", "#333");
    svg.appendChild(line);
  }

  // Frets
  for (let f = 0; f <= numFrets; f++) {
    const y = 20 + f * fretSpacing;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", 10); line.setAttribute("y1", y);
    line.setAttribute("x2", 110); line.setAttribute("y2", y);
    line.setAttribute("stroke", f === 0 ? "#000" : "#666");
    line.setAttribute("stroke-width", f === 0 ? "4" : "2");
    svg.appendChild(line);
  }

  // Fingers
  chord.frets.forEach((fret, i) => {
    const x = 10 + i * stringSpacing;
    if (fret === 0) {
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x); text.setAttribute("y", 15);
      text.setAttribute("text-anchor", "middle");
      text.textContent = "O";
      svg.appendChild(text);
    } else if (fret > 0) {
      const y = 20 + (fret - 1) * fretSpacing + fretSpacing / 2;
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", 8);
      circle.setAttribute("fill", "#222");
      svg.appendChild(circle);
    }
  });

  container.appendChild(svg);
}

// Simple Audio
const openMidi = [40, 45, 50, 55, 59, 64]

function playChord(chord) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  chord.frets.forEach((fret, i) => {
    if (fret < 0) return;

    const midi = openMidi[i] + fret;
    const freq = 440 * Math.pow(2, (midi - 69) / 12);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.value = freq;

    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2);
  });
}
o
// Main load function
function loadChord(name) {
  ensureChordExists(name);
  const chordData = CHORDS[name].voicings[0];
  const container = document.getElementById("chordViewer");
  if (container) renderChordDiagram(container, chordData);
}

// Strum & Rhythm (basic)
function renderStrumArrows() {
  const container = document.getElementById("strum-arrows");
  if (container) container.innerHTML = "↓ ↓ ↓ ↓ ↓ ↓";
}

function renderRhythmGrid(pattern) {
  const container = document.getElementById("rhythmGrid");
  if (container) container.innerHTML = `<div style="padding:10px; background:#333; border-radius:6px;">${pattern}</div>`;
}

// Export
window.loadChord = loadChord;
window.playChord = playChord;
window.renderStrumArrows = renderStrumArrows;
window.renderRhythmGrid = renderRhythmGrid;
