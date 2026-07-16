// NIMBUS Skeuomorphic Music Player - Engine & OS

// 1. Tracks Database (Royalty-free public URLs)
const tracks = [
  {
    title: "I Thought I Saw Your Face Today",
    artist: "She & Him",
    url: "./music/She & Him - I Thought I Saw Your Face Today (Official Lyric Video).mp3",
    cover: "./cover/She & Him - I Thought I Saw Your Face Today (Official Lyric Video).jpg",
    cardCover: "./picture/1.jpg",
    iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    pinIcon: "⭐",
    glowColor: "#ffeb3b"
  },
  {
    title: "Love Songs (Bonus)",
    artist: "song and lyrics by Kaash Paige",
    url: "./music/Love Songs (Bonus).mp3",
    cover: "./cover/Love Songs (Bonus).jpg",
    cardCover: "./picture/2.jpg",
    iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
    pinIcon: "💖",
    glowColor: "#e91e63"
  },
  {
    title: "SZA - Snooze (Audio)",
    artist: "SZA",
    url: "./music/SZA - Snooze (Audio).mp3",
    cover: "./cover/SZA - Snooze (Audio).jpg",
    cardCover: "./picture/3.jpg",
    iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`,
    pinIcon: "🍀",
    glowColor: "#00e676"
  },
  {
    title: "Get You (feat. Kali Uchis)",
    artist: "Daniel Caesar",
    url: "./music/Get You (feat. Kali Uchis).mp3",
    cover: "./cover/Get You (feat. Kali Uchis).jpg",
    cardCover: "./picture/4.jpg",
    iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/></svg>`,
    pinIcon: "⚡",
    glowColor: "#29b6f6"
  },
  {
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    url: "./music/I Wanna Be Yours.mp3",
    cover: "./cover/I Wanna Be Yours.png",
    cardCover: "./picture/5.jpg",
    iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 4c.83 0 1.5.67 1.5 1.5S14.83 9 14 9s-1.5-.67-1.5-1.5S13.17 6 14 6zm-4 3c-.83 0-1.5-.67-1.5-1.5S9.17 6 10 6s1.5.67 1.5 1.5S10.83 9 10 9zm2 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/></svg>`,
    pinIcon: "🍒",
    glowColor: "#ff1744"
  },
  {
    title: "Daniel Caesar - Best Part (Audio) ft. H.E.R.",
    artist: "Daniel Caesar",
    url: "./music/Daniel Caesar - Best Part (Audio) ft. H.E.R..mp3",
    cover: "./cover/Daniel Caesar - Best Part (Audio) ft. H.E.R..jpg",
    cardCover: "./picture/6.jpg",
    iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 23c4.97 0 9-4.03 9-9 0-3.72-2.18-7.23-5.26-9.1-.47-.29-1.04.14-.92.68.86 3.86-1.5 6.94-3.82 8.35v-9.4c0-.6-.62-1.01-1.16-.74C6.27 5.6 4.09 9.61 4.09 14c0 4.97 4.03 9 8.91 9z"/></svg>`,
    pinIcon: "🪐",
    glowColor: "#7c4dff"
  }
];

// 2. State Variables
let currentTrackIndex = 0;
let isPlaying = false;
let isPowerOn = true;
let volume = 0.5; // 0.0 to 1.0
let activeView = "now-playing"; // "now-playing", "menu", "songs", "visualizer", "settings"
let menuSelectionIndex = 0;
let clickSoundEnabled = true;

// Audio Context & Visualizer state
let audioContext;
let audioSource;
let analyser;
let animationFrameId;

// HTML Elements
const audio = new Audio();
audio.volume = volume;
audio.crossOrigin = "anonymous";

const clickSound = document.getElementById("click-sound");
const btnPlayPause = document.getElementById("btn-playpause");
const btnMenu = document.getElementById("btn-menu");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const btnSelect = document.getElementById("btn-select");
const statusLedBtn = document.getElementById("status-led-btn");
const clickwheel = document.getElementById("clickwheel");
const wheelOuterWrap = document.querySelector(".clickwheel-outer-wrap");

// Screen elements
const npSongTitle = document.getElementById("np-song-title");
const npSongArtist = document.getElementById("np-song-artist");
const npCoverArt = document.getElementById("np-cover-art");
const vinylDisc = document.getElementById("vinyl-disc");
const tonearm = document.getElementById("tonearm-assembly");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const progressBarFill = document.getElementById("progress-bar-fill");
const progressBarBg = document.getElementById("progress-bar-bg");
const statusTimeEl = document.getElementById("status-time");

// Volume HUD elements
const volumeHud = document.getElementById("volume-hud");
const volumeBarFill = document.getElementById("volume-bar-fill");
let volumeHudTimeout;

// 3. Audio Controller
function loadTrack(index) {
  currentTrackIndex = index;
  const track = tracks[currentTrackIndex];
  audio.src = track.url;
  
  // Update Now Playing UI
  npSongTitle.textContent = track.title;
  npSongArtist.textContent = track.artist;
  npCoverArt.src = track.cover;
  
  // Reset progress
  progressBarFill.style.width = "0%";
  currentTimeEl.textContent = "0:00";
  totalTimeEl.textContent = "0:00";
  
  // Set details for Visualizer header too
  document.getElementById("viz-song-title").textContent = track.title;
  document.getElementById("viz-song-artist").textContent = track.artist;

  // Update polaroid active card state
  updateActiveCard();
}

function playTrack() {
  if (!isPowerOn) return;
  isPlaying = true;
  audio.play().then(() => {
    // Rotation animation on vinyl
    vinylDisc.classList.add("playing");
    // Swing tonearm onto vinyl
    tonearm.style.transform = "rotate(26deg)";
    // Update play indicators
    document.querySelector(".icon-play").style.display = "none";
    document.querySelector(".icon-pause").style.display = "block";
    
    // Initialize Web Audio Context if not done
    initVisualizer();
  }).catch(err => {
    console.log("Audio play deferred/failed:", err);
  });
}

function pauseTrack() {
  isPlaying = false;
  audio.pause();
  vinylDisc.classList.remove("playing");
  // Retract tonearm
  tonearm.style.transform = "rotate(0deg)";
  document.querySelector(".icon-play").style.display = "block";
  document.querySelector(".icon-pause").style.display = "none";
}

function togglePlay() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function nextTrack() {
  let nextIdx = (currentTrackIndex + 1) % tracks.length;
  loadTrack(nextIdx);
  if (isPlaying) playTrack();
}

function prevTrack() {
  let prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(prevIdx);
  if (isPlaying) playTrack();
}

// 4. UI Screen Navigation System (OS)
let uniqueArtists = [];
let currentArtistSongs = [];

function showView(viewId) {
  activeView = viewId;
  document.querySelectorAll(".view-panel").forEach(panel => {
    panel.classList.remove("active");
  });
  
  const targetPanel = document.getElementById(`view-${viewId}`);
  if (targetPanel) {
    targetPanel.classList.add("active");
  }
  
  // Menu logic setup
  if (viewId === "menu") {
    menuSelectionIndex = 0;
    updateMenuHighlight("menu-list");
  } else if (viewId === "songs") {
    populateSongsList();
    menuSelectionIndex = 0;
    updateMenuHighlight("songs-list");
  } else if (viewId === "artists") {
    populateArtistsList();
    menuSelectionIndex = 0;
    updateMenuHighlight("artists-list");
  } else if (viewId === "artist-songs") {
    menuSelectionIndex = 0;
    updateMenuHighlight("artist-songs-list");
  } else if (viewId === "settings") {
    menuSelectionIndex = 0;
    updateMenuHighlight("settings-list");
  }
}

function populateSongsList() {
  const container = document.getElementById("songs-list");
  container.innerHTML = "";
  tracks.forEach((track, index) => {
    const item = document.createElement("div");
    item.className = `menu-item ${index === menuSelectionIndex ? 'selected' : ''}`;
    item.textContent = `${index + 1}. ${track.title}`;
    item.dataset.index = index;
    container.appendChild(item);
  });
}

function populateArtistsList() {
  const container = document.getElementById("artists-list");
  container.innerHTML = "";
  
  // Get unique artists
  const artistSet = new Set();
  tracks.forEach(track => {
    if (track.artist) {
      artistSet.add(track.artist);
    }
  });
  uniqueArtists = Array.from(artistSet);
  
  uniqueArtists.forEach((artist, index) => {
    const item = document.createElement("div");
    item.className = `menu-item ${index === menuSelectionIndex ? 'selected' : ''}`;
    item.textContent = artist;
    item.dataset.artist = artist;
    container.appendChild(item);
  });
}

function populateArtistSongsList(artist) {
  const header = document.getElementById("artist-songs-header");
  header.textContent = artist;
  
  const container = document.getElementById("artist-songs-list");
  container.innerHTML = "";
  
  currentArtistSongs = [];
  tracks.forEach((track, index) => {
    if (track.artist === artist) {
      currentArtistSongs.push({
        track: track,
        index: index
      });
    }
  });
  
  currentArtistSongs.forEach((itemData, index) => {
    const item = document.createElement("div");
    item.className = `menu-item ${index === menuSelectionIndex ? 'selected' : ''}`;
    item.textContent = `${index + 1}. ${itemData.track.title}`;
    item.dataset.index = itemData.index; // original global index
    container.appendChild(item);
  });
}

function updateMenuHighlight(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = container.querySelectorAll(".menu-item");
  items.forEach((item, index) => {
    if (index === menuSelectionIndex) {
      item.classList.add("selected");
      // Scroll to view if overflowed
      item.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } else {
      item.classList.remove("selected");
    }
  });
}

function handleMenuNavigation(direction) {
  // Navigation scrolling up or down
  let containerId = "";
  if (activeView === "menu") containerId = "menu-list";
  else if (activeView === "songs") containerId = "songs-list";
  else if (activeView === "artists") containerId = "artists-list";
  else if (activeView === "artist-songs") containerId = "artist-songs-list";
  else if (activeView === "settings") containerId = "settings-list";
  
  if (!containerId) return;
  
  const container = document.getElementById(containerId);
  const maxItems = container.querySelectorAll(".menu-item").length;
  if (maxItems === 0) return;
  
  if (direction === "down") {
    menuSelectionIndex = (menuSelectionIndex + 1) % maxItems;
  } else {
    menuSelectionIndex = (menuSelectionIndex - 1 + maxItems) % maxItems;
  }
  
  triggerTactileClick();
  updateMenuHighlight(containerId);
}

function selectCurrentMenuItem() {
  triggerTactileClick();
  if (activeView === "menu") {
    const selectedItem = document.getElementById("menu-list").querySelectorAll(".menu-item")[menuSelectionIndex];
    const action = selectedItem.dataset.action;
    if (action === "songs") showView("songs");
    else if (action === "artists") showView("artists");
    else if (action === "now-playing") showView("now-playing");
    else if (action === "visualizer") showView("visualizer");
    else if (action === "settings") showView("settings");
  } else if (activeView === "songs") {
    loadTrack(menuSelectionIndex);
    showView("now-playing");
    playTrack();
  } else if (activeView === "artists") {
    const selectedItem = document.getElementById("artists-list").querySelectorAll(".menu-item")[menuSelectionIndex];
    if (selectedItem) {
      const artist = selectedItem.dataset.artist;
      populateArtistSongsList(artist);
      showView("artist-songs");
    }
  } else if (activeView === "artist-songs") {
    const selectedItem = document.getElementById("artist-songs-list").querySelectorAll(".menu-item")[menuSelectionIndex];
    if (selectedItem) {
      const globalIndex = parseInt(selectedItem.dataset.index, 10);
      loadTrack(globalIndex);
      showView("now-playing");
      playTrack();
    }
  } else if (activeView === "settings") {
    const selectedItem = document.getElementById("settings-list").querySelectorAll(".menu-item")[menuSelectionIndex];
    const setting = selectedItem.dataset.setting;
    if (setting === "import") {
      document.getElementById("local-file-input").click();
    } else if (setting === "click-sound") {
      clickSoundEnabled = !clickSoundEnabled;
      selectedItem.textContent = `Click Sound: ${clickSoundEnabled ? "ON" : "OFF"}`;
    } else if (setting === "theme") {
      const isDark = selectedItem.dataset.value === "dark";
      selectedItem.dataset.value = isDark ? "light" : "dark";
      selectedItem.textContent = `Theme: ${isDark ? "Light Silver" : "Dark Metal"}`;
      document.querySelector(".nimbus-device").style.background = isDark 
        ? "linear-gradient(135deg, #d8dcd0 0%, #b0b4b8 50%, #888d92 100%)" 
        : "var(--metal-shine)";
    }
  }
}

// 5. Tactical Sound
function triggerTactileClick() {
  if (clickSoundEnabled) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }
}

// 6. Rotational Wheel Volume & Navigation Control
let isDraggingWheel = false;
let startAngle = 0;
let lastAngle = 0;
let angleAccumulator = 0;

function getWheelAngle(clientX, clientY) {
  const rect = clickwheel.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
}

function handleWheelStart(e) {
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  
  // Bail out if user taps directly on any inner button — let the click fire
  if (e.target.closest(".clickwheel-center, .wheel-btn")) return;
  
  isDraggingWheel = true;
  startAngle = getWheelAngle(clientX, clientY);
  lastAngle = startAngle;
  angleAccumulator = 0;
}

function handleWheelMove(e) {
  if (!isDraggingWheel) return;
  
  // Prevent page scroll while rotating the clickwheel on touch
  if (e.touches) e.preventDefault();
  
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  
  const currentAngle = getWheelAngle(clientX, clientY);
  let delta = currentAngle - lastAngle;
  
  // Normalize delta across boundaries (-180 to 180 transition)
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  
  angleAccumulator += delta;
  lastAngle = currentAngle;
  
  // We trigger a tick action every 18 degrees of rotation
  const degreesPerTick = 18;
  if (Math.abs(angleAccumulator) >= degreesPerTick) {
    const ticks = Math.floor(Math.abs(angleAccumulator) / degreesPerTick);
    const direction = angleAccumulator > 0 ? "clockwise" : "counterclockwise";
    
    // Clear residual accumulator
    angleAccumulator = angleAccumulator % degreesPerTick;
    
    for (let i = 0; i < ticks; i++) {
      if (activeView === "now-playing" || activeView === "visualizer") {
        // Adjust volume
        adjustVolume(direction === "clockwise" ? 0.05 : -0.05);
      } else {
        // Navigate list menu
        handleMenuNavigation(direction === "clockwise" ? "down" : "up");
      }
    }
  }
}

function handleWheelEnd() {
  isDraggingWheel = false;
}

function adjustVolume(amount) {
  volume = Math.min(Math.max(volume + amount, 0), 1);
  audio.volume = volume;
  
  // Volume HUD
  volumeBarFill.style.width = `${volume * 100}%`;
  volumeHud.classList.add("visible");
  
  triggerTactileClick();
  
  clearTimeout(volumeHudTimeout);
  volumeHudTimeout = setTimeout(() => {
    volumeHud.classList.remove("visible");
  }, 1500);
}

// 7. HTML5 Audio Event Listeners (Progress, Time updating)
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBarFill.style.width = `${pct}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    totalTimeEl.textContent = formatTime(audio.duration);
  }
});

audio.addEventListener("ended", () => {
  nextTrack();
});

function formatTime(secs) {
  if (isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Interactive clicking on progress bar to seek
progressBarBg.addEventListener("click", (e) => {
  if (!audio.duration) return;
  const rect = progressBarBg.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const pct = clickX / rect.width;
  audio.currentTime = pct * audio.duration;
  triggerTactileClick();
});

// 8. Physical buttons event binding
btnPlayPause.addEventListener("click", () => {
  triggerTactileClick();
  togglePlay();
});

btnMenu.addEventListener("click", () => {
  triggerTactileClick();
  if (activeView === "artist-songs") {
    showView("artists");
  } else if (activeView === "artists" || activeView === "songs" || activeView === "visualizer" || activeView === "settings") {
    showView("menu");
  } else if (activeView === "now-playing") {
    showView("menu");
  } else {
    showView("now-playing");
  }
});

btnNext.addEventListener("click", () => {
  triggerTactileClick();
  nextTrack();
});

btnPrev.addEventListener("click", () => {
  triggerTactileClick();
  prevTrack();
});

btnSelect.addEventListener("click", () => {
  selectCurrentMenuItem();
});

statusLedBtn.addEventListener("click", () => {
  isPowerOn = !isPowerOn;
  statusLedBtn.classList.toggle("off", !isPowerOn);
  triggerTactileClick();
  
  if (!isPowerOn) {
    pauseTrack();
    document.querySelector(".screen").style.opacity = "0.02";
  } else {
    document.querySelector(".screen").style.opacity = "1";
  }
});

// Clickwheel gestures listeners — mouse
clickwheel.addEventListener("mousedown", handleWheelStart);
window.addEventListener("mousemove", handleWheelMove);
window.addEventListener("mouseup", handleWheelEnd);

// Touch: attach to the outer wrap so the ring area always fires touchstart,
// even if buttons inside the ring are covering the inner part.
// passive:false lets us call preventDefault() in handleWheelMove to stop scroll.
wheelOuterWrap.addEventListener("touchstart", handleWheelStart, { passive: false });
window.addEventListener("touchmove", handleWheelMove, { passive: false });
window.addEventListener("touchend", handleWheelEnd);

// Vinyl disc direct play/pause
vinylDisc.addEventListener("click", (e) => {
  // Prevent propagation to not conflict with clickwheel center
  e.stopPropagation();
  triggerTactileClick();
  togglePlay();
});

// 9. Web Audio API & Visualizer Mode
function initVisualizer() {
  if (audioContext) return;
  
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextClass();
    audioSource = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const canvas = document.getElementById("visualizer-canvas");
    const ctx = canvas.getContext("2d");
    
    function drawVisualizer() {
      if (activeView === "visualizer") {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        
        analyser.getByteFrequencyData(dataArray);
        
        const barWidth = (width / bufferLength) * 1.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 1.6;
          
          // Orange to Red gradient
          const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
          gradient.addColorStop(0, '#ff9800');
          gradient.addColorStop(0.5, '#e65100');
          gradient.addColorStop(1, '#ff3d00');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
          
          x += barWidth;
        }
      }
      animationFrameId = requestAnimationFrame(drawVisualizer);
    }
    
    drawVisualizer();
  } catch (error) {
    console.warn("Visualizer init blocked/failed:", error);
  }
}

// 10. Update Digital Clock in status bar
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 12 instead of 0
  statusTimeEl.textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// 12. Polaroid Gallery Rendering & Sync
function renderPolaroidGallery() {
  const gallery = document.getElementById("polaroid-gallery");
  if (!gallery) return;
  gallery.innerHTML = "";
  
  tracks.forEach((track, index) => {
    const card = document.createElement("div");
    card.className = "polaroid-card";
    
    // Generate scattered slant rotations between -6 and 6 deg
    const rotation = (Math.random() * 12 - 6).toFixed(1);
    
    card.style.setProperty("--rotation", `${rotation}deg`);
    card.style.setProperty("--pin-glow", track.glowColor || "#ff007f");
    card.dataset.index = index;
    
    card.innerHTML = `
      <div class="card-pin">${track.pinIcon || "📌"}</div>
      <div class="card-image-wrapper">
        <img src="${track.cardCover || track.cover}" alt="${track.title}" class="card-image">
      </div>
      <div class="card-info" style="display: flex; justify-content: center; align-items: center; padding-top: 2px;">
        <div class="card-heart" style="font-size: 18px; margin: 0; display: flex; align-items: center; justify-content: center;">${track.iconSvg || "♥"}</div>
      </div>
    `;
    
    card.addEventListener("click", () => {
      triggerTactileClick();
      const heart = card.querySelector(".card-heart");
      if (heart) {
        heart.classList.toggle("liked-heart");
      }
    });
    
    gallery.appendChild(card);
  });
  
  updateActiveCard();
}

function updateActiveCard() {
  document.querySelectorAll(".polaroid-card").forEach((card, index) => {
    if (parseInt(card.dataset.index, 10) === currentTrackIndex) {
      card.classList.add("active-card");
    } else {
      card.classList.remove("active-card");
    }
  });
}

// Initial load
loadTrack(0);
renderPolaroidGallery();

// 11. Handle local file input importing
document.getElementById("local-file-input").addEventListener("change", (e) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileUrl = URL.createObjectURL(file);
    const fileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    
    tracks.push({
      title: fileName,
      artist: "Local File",
      url: fileUrl,
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80"
    });
  }
  
  renderPolaroidGallery();
  showView("songs");
});
