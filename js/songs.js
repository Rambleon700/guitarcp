// =============================================
// songs.js - Full Song Library + Fixed Buttons
// =============================================

const SONG_LIBRARY = [
  { title: "Wonderwall", artist: "Oasis", chords: ["Em7","G","Dsus4","A7sus4"], strumming: "D DU UDU", bpm: 87 },
  { title: "Knockin’ on Heaven’s Door", artist: "Bob Dylan", chords: ["G","D","Am","C"], strumming: "D DUD DUD", bpm: 72 },
  { title: "Horse With No Name", artist: "America", chords: ["Em","D6add9/F#"], strumming: "D DU UDU", bpm: 68 },
  { title: "Brown Eyed Girl", artist: "Van Morrison", chords: ["G","C","D","Em"], strumming: "D DU UDU", bpm: 98 },
  { title: "Stand By Me", artist: "Ben E. King", chords: ["G","Em","C","D"], strumming: "D DU UDU", bpm: 60 },
  { title: "Zombie", artist: "The Cranberries", chords: ["Em","C","G","D"], strumming: "DDDD", bpm: 82 },
  { title: "Riptide", artist: "Vance Joy", chords: ["Am","G","C"], strumming: "DU DU DU", bpm: 100 },
  { title: "Perfect", artist: "Ed Sheeran", chords: ["G","Em","C","D"], strumming: "D DU UDU", bpm: 63 },
  { title: "Let It Be", artist: "The Beatles", chords: ["C","G","Am","F"], strumming: "D DU UDU", bpm: 72 },
  // Add more if you want - I kept the most popular ones
];

function renderSongList(songs = SONG_LIBRARY) {
  const tbody = document.getElementById("songBrowserBody");
  if (!tbody) return;

  tbody.innerHTML = songs.map(song => `
    <tr>
      <td>${song.title}</td>
      <td>${song.artist}</td>
      <td>${song.chords.join(", ")}</td>
      <td>${song.strumming}</td>
      <td>${song.bpm}</td>
      <td>
        <button class="practice-btn" data-title="${song.title}">Practice</button>
      </td>
    </tr>
  `).join("");

  // Make buttons work
  document.querySelectorAll(".practice-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-title");
      const song = SONG_LIBRARY.find(s => s.title === title);
      if (song) {
        document.getElementById("currentSongTitle").textContent = song.title;
        if (song.chords.length > 0) loadChord(song.chords[0]);
        console.log("Loaded:", song.title);
      }
    });
  });
}

function initSongBrowser() {
  renderSongList();
}

window.initSongBrowser = initSongBrowser;
