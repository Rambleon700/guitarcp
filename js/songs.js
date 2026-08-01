// ------------------------------------------------------------
// SONGS.JS — FULL 55-SONG LIBRARY + BROWSER + INTEGRATION
// ------------------------------------------------------------

// FULL SONG LIBRARY — 55 SONGS
const SONG_LIBRARY = [
  { title: "Wonderwall", artist: "Oasis", chords: ["Em7","G","Dsus4","A7sus4"], strumming: "D DU UDU", bpm: 87 },
  { title: "Knockin’ on Heaven’s Door", artist: "Bob Dylan", chords: ["G","D","Am","C"], strumming: "D DUD DUD", bpm: 72 },
  { title: "Horse With No Name", artist: "America", chords: ["Em","D6add9/F#"], strumming: "D DU UDU", bpm: 68 },
  { title: "Brown Eyed Girl", artist: "Van Morrison", chords: ["G","C","D","Em"], strumming: "D DU UDU", bpm: 98 },
  { title: "Stand By Me", artist: "Ben E. King", chords: ["G","Em","C","D"], strumming: "D DU UDU", bpm: 60 },
  { title: "Zombie", artist: "The Cranberries", chords: ["Em","C","G","D"], strumming: "DDDD", bpm: 82 },
  { title: "Perfect", artist: "Ed Sheeran", chords: ["G","Em","C","D"], strumming: "D DU UDU", bpm: 63 },
  { title: "Riptide", artist: "Vance Joy", chords: ["Am","G","C"], strumming: "DU DU DU", bpm: 100 },
  { title: "Tennessee Whiskey", artist: "Chris Stapleton", chords: ["A","Bm","D","E"], strumming: "D DU UDU", bpm: 48 },
  { title: "Hallelujah", artist: "Leonard Cohen", chords: ["C","Am","C","Am","F","G","C"], strumming: "D DU UDU", bpm: 56 },
  { title: "Free Fallin’", artist: "Tom Petty", chords: ["D","G","A"], strumming: "D DU UDU", bpm: 84 },
  { title: "Chasing Cars", artist: "Snow Patrol", chords: ["A","E","D"], strumming: "DDDD", bpm: 84 },
  { title: "Let It Be", artist: "The Beatles", chords: ["C","G","Am","F"], strumming: "D DU UDU", bpm: 72 },
  { title: "I’m Yours", artist: "Jason Mraz", chords: ["G","D","Em","C"], strumming: "D DU UDU", bpm: 76 },
  { title: "All of Me", artist: "John Legend", chords: ["Em","C","G","D"], strumming: "D DU UDU", bpm: 63 },
  { title: "Take Me Home, Country Roads", artist: "John Denver", chords: ["G","Em","D","C"], strumming: "D DU UDU", bpm: 84 },

  // Expansion pack
  { title: "Hey There Delilah", artist: "Plain White T’s", chords: ["D","F#m","Bm","G","A"], strumming: "Fingerstyle", bpm: 100 },
  { title: "Blackbird", artist: "The Beatles", chords: ["G","Am","C","D"], strumming: "Fingerstyle", bpm: 92 },
  { title: "Wish You Were Here", artist: "Pink Floyd", chords: ["G","C","D","Am","Em"], strumming: "D DU UDU", bpm: 60 },
  { title: "Hotel California", artist: "Eagles", chords: ["Bm","F#","A","E","G","D","Em"], strumming: "D DU UDU", bpm: 74 },
  { title: "Stairway to Heaven", artist: "Led Zeppelin", chords: ["Am","C","D","F","G"], strumming: "Fingerstyle", bpm: 82 },
  { title: "Nothing Else Matters", artist: "Metallica", chords: ["Em","D","C","G","B7"], strumming: "Fingerstyle", bpm: 52 },
  { title: "House of the Rising Sun", artist: "The Animals", chords: ["Am","C","D","F","E"], strumming: "Arpeggio", bpm: 84 },
  { title: "Mad World", artist: "Gary Jules", chords: ["Em","G","D","A"], strumming: "D DU UDU", bpm: 75 },
  { title: "The Scientist", artist: "Coldplay", chords: ["D","Bm","G","A"], strumming: "D DU UDU", bpm: 72 },
  { title: "Fix You", artist: "Coldplay", chords: ["C","Em","Am","G","F","Gsus4"], strumming: "D DU UDU", bpm: 60 },
  { title: "Love of My Life", artist: "Queen", chords: ["G","Em","Am","D","C","G7","Fmaj7","F","Dm"], strumming: "Fingerstyle", bpm: 72 },
  { title: "Still in Love with You", artist: "Thin Lizzy", chords: ["Am","Dm","G","C","F","E"], strumming: "D DU UDU", bpm: 68 },
  { title: "Wonderful Tonight", artist: "Eric Clapton", chords: ["G","D","C","Em","Am"], strumming: "D DU UDU", bpm: 64 },
  { title: "Scotland the Brave", artist: "Traditional", chords: ["G","C","D","Em","A7","D7"], strumming: "March", bpm: 120 },
  { title: "Hey Jude", artist: "The Beatles", chords: ["F","C","Bb"], strumming: "D DU UDU", bpm: 72 },
  { title: "Yellow", artist: "Coldplay", chords: ["G","D","C","Em"], strumming: "D DU UDU", bpm: 88 },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", chords: ["D","Bm","G","A"], strumming: "D DU UDU", bpm: 79 },
  { title: "Shape of You", artist: "Ed Sheeran", chords: ["Am","F","C","G"], strumming: "Pop Groove", bpm: 96 },
  { title: "Shallow", artist: "Lady Gaga", chords: ["Em","G","D","C"], strumming: "D DU UDU", bpm: 96 },
  { title: "Someone Like You", artist: "Adele", chords: ["A","E","F#m","D"], strumming: "Arpeggio", bpm: 68 },
  { title: "Hurt", artist: "Johnny Cash", chords: ["Am","C","D","G"], strumming: "D DU UDU", bpm: 72 },
  { title: "Jolene", artist: "Dolly Parton", chords: ["Am","C","G"], strumming: "D DU UDU", bpm: 110 },
  { title: "Ring of Fire", artist: "Johnny Cash", chords: ["G","C","D"], strumming: "Country", bpm: 100 },
  { title: "Blowin’ in the Wind", artist: "Bob Dylan", chords: ["G","C","D"], strumming: "D DU UDU", bpm: 72 },
  { title: "Wild World", artist: "Cat Stevens", chords: ["Am","D","G","C","F"], strumming: "D DU UDU", bpm: 72 },
  { title: "Have You Ever Seen the Rain", artist: "CCR", chords: ["C","G","Am","F"], strumming: "D DU UDU", bpm: 116 },
  { title: "Bad Moon Rising", artist: "CCR", chords: ["D","A","G"], strumming: "D DU UDU", bpm: 90 },
  { title: "Sweet Home Alabama", artist: "Lynyrd Skynyrd", chords: ["D","C","G"], strumming: "D DU UDU", bpm: 98 },
  { title: "Time of Your Life", artist: "Green Day", chords: ["G","C","D","Em"], strumming: "D DU UDU", bpm: 72 },
  { title: "Patience", artist: "Guns N’ Roses", chords: ["C","G","A","D"], strumming: "Arpeggio", bpm: 60 },
  { title: "Tears in Heaven", artist: "Eric Clapton", chords: ["A","E","F#m","D"], strumming: "Fingerstyle", bpm: 74 },
  { title: "More Than Words", artist: "Extreme", chords: ["G","C","D","Em","Am"], strumming: "Fingerstyle", bpm: 92 },
  { title: "Fast Car", artist: "Tracy Chapman", chords: ["C","G","Em","D"], strumming: "D DU UDU", bpm: 96 },
  { title: "No Woman No Cry", artist: "Bob Marley", chords: ["C","G","Am","F"], strumming: "Reggae", bpm: 78 }
];

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

function getSongByTitle(title) {
  return SONG_LIBRARY.find(s => s.title === title);
}

// ------------------------------------------------------------
// SONG BROWSER RENDERER
// ------------------------------------------------------------

function renderSongList(songs) {
  const list = document.getElementById("songList");

  list.innerHTML = songs
    .map(song => `
      <div class="song-card">
        <div class="song-info">
          <strong>${song.title}</strong> – ${song.artist}<br>
          Chords: ${song.chords.join(", ")} · Strumming: ${song.strumming} · BPM: ${song.bpm}
        </div>
        <div class="song-actions">
          <button data-title="${song.title}" class="song-practice">Practice</button>
          <button data-title="${song.title}" class="song-perform">Perform</button>
        </div>
      </div>
    `)
    .join("");

  document.querySelectorAll(".song-practice").forEach(btn => {
    btn.onclick = () => loadSongIntoPractice(btn.dataset.title);
  });

  document.querySelectorAll(".song-perform").forEach(btn => {
    btn.onclick = () => enterPerformanceMode(btn.dataset.title);
  });
}

// ------------------------------------------------------------
// SONG BROWSER INIT
// ------------------------------------------------------------

function initSongBrowser() {
  renderSongList(SONG_LIBRARY);

  const search = document.getElementById("songSearch");
  const sort = document.getElementById("songSort");

  search.oninput = () => {
    const q = search.value.toLowerCase();
    const filtered = SONG_LIBRARY.filter(
      s =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q)
    );
    renderSongList(filtered);
  };

  sort.onchange = () => {
    const key = sort.value;
    const sorted = [...SONG_LIBRARY].sort((a, b) => {
      if (key === "bpm") return a.bpm - b.bpm;
      return a[key].localeCompare(b[key]);
    });
    renderSongList(sorted);
  };
}

window.addEventListener("load", initSongBrowser);

// ------------------------------------------------------------
// PRACTICE MODE INTEGRATION
// ------------------------------------------------
