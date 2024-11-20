const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const coverArt = document.getElementById("cover-art");
const currentTime = document.getElementById("current-time");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const songs = [
  {
    title: "Thunderstruck",
    artist: "AC/DC",
    src: "/contenido/audio/ACDC - Thunderstruck.mp3",
    cover: "/contenido/imagen/acdc.png",
  },
  {
    title: "You Shook Me All Night Long",
    artist: "AC/DC",
    src: "/contenido/audio/ACDC - You Shook Me All Night Long.mp3",
    cover: "/contenido/imagen/musica2.jpg",
  },
   {
    title: "Sol",
    artist: "Willian",
    src: "/contenido/audio/Willian - Sol.mp3",
    cover: "/contenido/imagen/sol.jpeg",
  },
  {
    title: "Rock N Roll Train",
    artist: "AC/DC",
    src: "/contenido/audio/Rock N Roll Train .mp3",
    cover: "/contenido/imagen/musica3.jpg",
  },
];


let currentSongIndex = 0;
let isPlaying = false;

function loadSong(song) {
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  coverArt.src = song.cover;
  audio.src = song.src;
}

function togglePlay() {
  const playIcon = document.getElementById("play-icon");
  
  if (isPlaying) {
    audio.pause();
    playIcon.src = "/contenido/imagen/jugar.png"; 
  } else {
    audio.play();
    playIcon.src = "/contenido/imagen/pausa.png"; 
  }
  isPlaying = !isPlaying;
}
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
  isPlaying = true;
  document.getElementById("play-icon").src = "/contenido/imagen/pausa.png"; 
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length; 
  loadSong(songs[currentSongIndex]);
  audio.play();
  isPlaying = true;
  document.getElementById("play-icon").src = "/contenido/imagen/pausa.png"; 
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;


    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60)
      .toString()
      .padStart(2, "0"); 
    currentTime.textContent = `${minutes}:${seconds}`;
  }
});


progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});


playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);


loadSong(songs[currentSongIndex]);
