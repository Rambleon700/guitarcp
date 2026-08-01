// ------------------------------------------------------------
// ENGINE.JS — CORE RENDERER (CHORDS, STRUMMING, RHYTHM GRID)
// ------------------------------------------------------------

// Global BPM
let currentBPM = 72;

// ------------------------------------------------------------
// SVG CHORD DIAGRAM RENDERER
// ------------------------------------------------------------

function renderChordDiagram(container, chord) {
  container.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 120 160");
  svg.classList.add("chord-diagram");

  const numStrings = 6;
  const numFrets = 4;
  const stringSpacing = 100 / (numStrings - 1);
  const fretSpacing = 120 / numFrets;

  // Draw strings
  for (let i = 0; i < numStrings; i++) {
    const x = 10 + i * stringSpacing;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", 20);
    line.setAttribute("x2", x);
    line.setAttribute("y2", 140);
    line.setAttribute("stroke", "#333");
    svg.appendChild(line);
  }

  // Draw frets
  for (let f = 0; f <= numFrets; f++) {
    const y = 20 + f * fretSpacing;
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", 10);
    line.setAttribute("y1", y);
    line.setAttribute("x2", 110);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", f === 0 ? "#000" : "#666");
    line.setAttribute("stroke-width", f === 0 ? "3" : "1");
    svg.appendChild(line);
  }

  // Draw finger positions
  chord.frets.forEach((fret, stringIndex) => {
    const x = 10 + stringIndex * stringSpacing;

    // Open string
    if (fret === 0) {
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x);
      text.setAttribute("y", 15);
      text.setAttribute("text-anchor", "middle");
      text.textContent = "O";
      svg.appendChild(text);
      return;
    }

    // Muted string
    if (fret < 0) {
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x);
      text.setAttribute("y", 15);
      text.setAttribute("text-anchor", "middle");
      text.textContent = "X";
      svg.appendChild(text);
      return;
    }

    // Finger dot
    const y = 20 + (fret - chord.position + 1) * fretSpacing - fretSpacing / 2;
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 8);
    circle.classList.add("finger-dot");
    svg.appendChild(circle);
  });

  container.appendChild(svg);
}

// ------------------------------------------------------------
// AUDIO ENGINE — SIMPLE OSCILLATOR CHORD PLAYER
// ------------------------------------------------------------

const openMidi = [40, 45, 50, 55, 59, 64]; // EADGBE

function playChord(chord) {
  const ctx = new AudioContext();

  chord.frets.forEach((fret, i) => {
    if (fret < 0) return;

    const midi = openMidi[i] + fret;
    const freq = 440 * Math.pow(2, (midi - 69) / 12);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);

    osc.start();
    osc.stop(ctx.currentTime + 1.1);
  });
}

// ------------------------------------------------------------
// LOAD CHORD INTO VIEWER
// ------------------------------------------------------------

function loadChord(name, containerId = "chordViewer") {
  ensureChordExists(name);

  const chordData = CHORDS[name].voicings[0];
  const container = document.getElementById(containerId);

  renderChordDiagram(container, chordData);

  if (containerId === "chordViewer") {
    document.getElementById("chordName").textContent = CHORDS[name].name;
    document.getElementById("playChord").onclick = () => playChord(chordData);
  }
}

// ------------------------------------------------------------
// STRUMMING ARROWS
// ------------------------------------------------------------

function renderStrumArrows(direction = "down", targetId = "strum-arrows") {
  const arrows = [];
  for (let i = 0; i < 6; i++) {
    arrows.push(
      `<span class="strum-arrow" data-string="${i}">
        ${direction === "down" ? "↓" : "↑"}
      </span>`
    );
  }
  document.getElementById(targetId).innerHTML = arrows.join(" ");
}

function animateStrumStep(stepIndex, targetId = "strum-arrows") {
  const arrows = document.querySelectorAll(`#${targetId} .strum-arrow`);
  arrows.forEach(a => a.classList.remove("flash"));
  const arrow = arrows[stepIndex];
  if (arrow) arrow.classList.add("flash");
}

// ------------------------------------------------------------
// RHYTHM GRID
// ------------------------------------------------------------

function patternToGrid(pattern) {
  const clean = pattern.replace(/\s+/g, "");
  const events = clean.split("");
  const grid = new Array(8).fill(null);

  let i = 0;
  events.forEach(ev => {
    if (i < grid.length) {
      grid[i] = ev;
      i++;
    }
  });

  return grid;
}

function renderRhythmGrid(pattern, targetId = "rhythmGrid") {
  const grid = patternToGrid(pattern);
  const container = document.getElementById(targetId);
  const labels = ["1", "&", "2", "&", "3", "&", "4", "&"];

  container.innerHTML = grid
    .map((ev, i) => {
      const isBeat = labels[i] !== "&";
      return `
        <div class="rhythm-cell ${isBeat ? "beat" : ""}" data-step="${i}">
          ${ev ? `<span class="strum">${ev === "D" ? "↓" : "↑"}</span>` : labels[i]}
        </div>
      `;
    })
    .join("");
}

function highlightRhythmCell(stepIndex, targetId = "rhythmGrid") {
  const cells = document.querySelectorAll(`#${targetId} .rhythm-cell`);
  cells.forEach(c => c.classList.remove("active"));
  const cell = cells[stepIndex];
  if (cell) cell.classList.add("active");
}

// ------------------------------------------------------------
// INITIAL LOAD
// ------------------------------------------------------------

window.onload = () => {
  loadChord("C");
  renderStrumArrows("down");
  renderRhythmGrid("D DU UDU");

  document.getElementById("nextVoicing").onclick = () => loadChord("Am");
  document.getElementById("strumDown").onclick = () => renderStrumArrows("down");
  document.getElementById("strumUp").onclick = () => renderStrumArrows("up");
};
