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

// Plucked-string Audio (Karplus-Strong)
var openMidi = [40, 45, 50, 55, 59, 64];

// Reuse a single AudioContext instead of creating a new one per click
var sharedAudioCtx = null;
function getAudioContext() {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

// Classic Karplus-Strong plucked-string synthesis, rendered into a buffer
function pluckedStringBuffer(ctx, freq, duration, decay) {
  var sampleRate = ctx.sampleRate;
  var N = Math.max(2, Math.round(sampleRate / freq));
  var length = Math.floor(sampleRate * duration);
  var buffer = ctx.createBuffer(1, length, sampleRate);
  var data = buffer.getChannelData(0);

  // Excite the "string" with a burst of noise
  var ring = new Float32Array(N);
  for (var i = 0; i < N; i++) {
    ring[i] = Math.random() * 2 - 1;
  }

  var idx = 0;
  for (var n = 0; n < length; n++) {
    var current = ring[idx];
    var next = ring[(idx + 1) % N];
    data[n] = current;
    // Low-pass averaging filter + decay -> natural string damping over time
    ring[idx] = decay * 0.5 * (current + next);
    idx = (idx + 1) % N;
  }

  return buffer;
}

function playChord(chord, direction, velocityScale) {
  direction = direction === "U" ? "U" : "D";
  velocityScale = typeof velocityScale === "number" ? velocityScale : 1;

  var ctx = getAudioContext();
  var now = ctx.currentTime;
  var strumDelay = 0.02; // stagger notes slightly, like a real strum
  var noteDuration = direction === "U" ? 1.4 : 2.4;

  // Which strings sound, and in what order
  var order = [];
  chord.frets.forEach(function (fret, i) {
    if (fret >= 0) order.push(i);
  });

  if (direction === "U") {
    order.reverse(); // upstrums travel high string to low string
    if (order.length > 3) order = order.slice(0, order.length - 1); // typically skips the low string
  }

  order.forEach(function (stringIndex, orderIdx) {
    var fret = chord.frets[stringIndex];
    var midi = openMidi[stringIndex] + fret;
    var freq = 440 * Math.pow(2, (midi - 69) / 12);
    var startTime = now + orderIdx * strumDelay;

    var buffer = pluckedStringBuffer(ctx, freq, noteDuration, 0.9965);
    var source = ctx.createBufferSource();
    source.buffer = buffer;

    var body = ctx.createBiquadFilter();
    body.type = "lowpass";
    body.frequency.value = 5500;

    var gain = ctx.createGain();
    var velocity = (0.55 + Math.random() * 0.08) * velocityScale;
    gain.gain.setValueAtTime(velocity, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration);

    source.connect(body);
    body.connect(gain);
    gain.connect(ctx.destination);

    source.start(startTime);
    source.stop(startTime + noteDuration);
  });
}

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
