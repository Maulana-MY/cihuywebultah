/**
 * CIHUY — Interactive Birthday Greeting Website
 * main.js — All interactivity: particles, gift box, confetti,
 *            music, and microphone-powered candle blow.
 */

"use strict";

/* ═══════════════════════════════════════════════════════════
   1. BACKGROUND PARTICLE SYSTEM
   ═══════════════════════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById("bgCanvas");
  const ctx    = canvas.getContext("2d");
  let W, H, particles = [];
  const PINK  = "233,30,140";
  const BLUE  = "0,229,255";
  const PURP  = "170,50,220";

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /** Create a single particle */
  function makeParticle() {
    const cols = [PINK, BLUE, PURP];
    const col  = cols[Math.floor(Math.random() * cols.length)];
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 2.5 + 0.5,
      dx:   (Math.random() - 0.5) * 0.5,
      dy:   -(Math.random() * 0.6 + 0.2),
      alpha:Math.random() * 0.6 + 0.2,
      col
    };
  }

  function initParticlePool() {
    particles = [];
    for (let i = 0; i < 120; i++) particles.push(makeParticle());
  }

  function drawBg() {
    // Dark radial gradient background
    const grd = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H));
    grd.addColorStop(0,   "#130025");
    grd.addColorStop(0.5, "#0d001e");
    grd.addColorStop(1,   "#07001a");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
  }

  let raf;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawBg();
    particles.forEach((p, i) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -5) { particles[i] = makeParticle(); particles[i].y = H + 5; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.col},${p.alpha})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => { resize(); initParticlePool(); });
  resize();
  initParticlePool();
  loop();
})();


/* ═══════════════════════════════════════════════════════════
   2. SCENE MANAGEMENT
   ═══════════════════════════════════════════════════════════ */
const giftScene = document.getElementById("giftScene");
const cardScene = document.getElementById("cardScene");

function switchToCard() {
  giftScene.classList.add("leaving");
  setTimeout(() => {
    giftScene.classList.remove("active", "leaving");
    cardScene.classList.add("active");
  }, 600);
}


/* ═══════════════════════════════════════════════════════════
   3. CONFETTI BURST
   ═══════════════════════════════════════════════════════════ */
function launchConfetti() {
  /** Fire confetti from both sides, firework-style */
  const end = Date.now() + 3200;
  const colors = ["#e91e8c", "#00e5ff", "#ff6bc2", "#ffe082", "#7b1fa2", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      startVelocity: 40,
      gravity: 0.8,
      scalar: 1.1,
      drift: 0.2
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      startVelocity: 40,
      gravity: 0.8,
      scalar: 1.1,
      drift: -0.2
    });
    // Firework bursts
    if (Date.now() < end) requestAnimationFrame(frame);
  }());

  // Extra central burst after brief delay
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { x: 0.5, y: 0.35 },
      colors,
      startVelocity: 50,
      scalar: 1.3
    });
  }, 300);
}


/* ═══════════════════════════════════════════════════════════
   4. GIFT BOX CLICK
   ═══════════════════════════════════════════════════════════ */
const giftBox   = document.getElementById("giftBox");
const giftBounce= giftBox.querySelector(".gift-bounce");
const bgMusic   = document.getElementById("bgMusic");
let   musicPlaying = false;

giftBox.addEventListener("click", function handleGiftClick() {
  // Prevent double-click
  giftBox.style.pointerEvents = "none";

  // 1. Burst animation on the box
  giftBounce.classList.add("gift-burst");

  // 2. Play background music (requires user interaction — this is the moment)
  bgMusic.volume = 0.5;
  bgMusic.play().then(() => {
    musicPlaying = true;
    fabMusicIcon.textContent = "🎵";
    fabMusic.classList.add("playing");
  }).catch(() => {
    // Autoplay blocked; user can toggle manually
  });

  // 3. Confetti!
  launchConfetti();

  // 4. Switch scene after brief delay
  setTimeout(switchToCard, 700);
}, { once: true });


/* ═══════════════════════════════════════════════════════════
   5. MUSIC FAB TOGGLE
   ═══════════════════════════════════════════════════════════ */
const fabMusic     = document.getElementById("fabMusic");
const fabMusicIcon = document.getElementById("fabMusicIcon");

fabMusic.addEventListener("click", () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    fabMusicIcon.textContent = "🔇";
    fabMusic.classList.remove("playing");
  } else {
    bgMusic.play().then(() => {
      musicPlaying = true;
      fabMusicIcon.textContent = "🎵";
      fabMusic.classList.add("playing");
    }).catch(err => console.warn("Music play blocked:", err));
  }
});


/* ═══════════════════════════════════════════════════════════
   6. INTERACTIVE CANDLE BLOW (Microphone)
   ═══════════════════════════════════════════════════════════ */
const micBtn         = document.getElementById("micBtn");
const micStatus      = document.getElementById("micStatus");
const micBar         = document.getElementById("micBar");
const micHint        = document.getElementById("micHint");
const candleAssembly = document.getElementById("candleAssembly");
const flameWrapper   = document.getElementById("flameWrapper");
const flameGlow      = document.getElementById("flameGlow");
const smokeContainer = document.getElementById("smokeContainer");
const blownMsg       = document.getElementById("blownMsg");

let audioCtx        = null;
let analyser        = null;
let micStream       = null;
let animFrameId     = null;
let candleBlown     = false;
let micActive       = false;

/** Thresholds — tweak to calibrate sensitivity */
const BLOW_THRESHOLD = 85;   // RMS volume level (0–255) to trigger blow
const BLOW_SUSTAIN_MS = 280; // Must sustain above threshold for this long
let   blowStartTime  = null;

/** Extinguish the candle */
function blowOutCandle() {
  if (candleBlown) return;
  candleBlown = true;

  // Hide flame
  flameWrapper.style.opacity   = "0";
  flameWrapper.style.transform = "scale(0.2)";
  flameWrapper.style.transition= "opacity 0.4s ease, transform 0.4s ease";
  if (flameGlow) flameGlow.style.display = "none";

  // Show smoke
  smokeContainer.classList.add("visible");

  // Show blown message
  blownMsg.classList.add("visible");

  // Extra confetti
  setTimeout(() => {
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#e91e8c","#00e5ff","#ffe082","#7b1fa2","#ffffff"],
      startVelocity: 55,
      scalar: 1.2,
      gravity: 0.7
    });
  }, 400);

  // Update hint
  micHint.textContent = "🎉 Selamat! Semua harapanmu terkabul!";
  micHint.style.color = "#ff6bc2";

  // Stop mic
  stopMic();

  // Disable button
  micBtn.classList.add("disabled-btn");
  micBtn.querySelector(".mic-label").textContent = "Lilin Padam! 🕯️";
}

/** Stop microphone stream */
function stopMic() {
  micActive = false;
  if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
  if (micStream)   { micStream.getTracks().forEach(t => t.stop()); micStream = null; }
  micBtn.classList.remove("listening");
  micStatus.classList.remove("visible");
  micBar.style.width = "0%";
}

/** Analyse microphone volume in a loop */
function analyseAudio() {
  if (!analyser || !micActive) return;

  const data = new Uint8Array(analyser.fftSize);
  analyser.getByteTimeDomainData(data);

  // Compute RMS volume
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    const v = (data[i] - 128) / 128;
    sum += v * v;
  }
  const rms = Math.sqrt(sum / data.length) * 255;

  // Update visual bar
  const pct = Math.min(rms / BLOW_THRESHOLD * 100, 100);
  micBar.style.width = pct + "%";

  // Detect sustained blow
  if (rms > BLOW_THRESHOLD) {
    if (!blowStartTime) blowStartTime = performance.now();
    else if (performance.now() - blowStartTime > BLOW_SUSTAIN_MS) {
      blowOutCandle();
      return;
    }
  } else {
    blowStartTime = null;
  }

  animFrameId = requestAnimationFrame(analyseAudio);
}

/** Start microphone capture */
async function startMic() {
  if (candleBlown) return;
  if (micActive) { stopMic(); return; } // Toggle off

  try {
    micStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
    });

    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") await audioCtx.resume();

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;

    const source = audioCtx.createMediaStreamSource(micStream);
    source.connect(analyser);

    micActive = true;
    micBtn.classList.add("listening");
    micStatus.classList.add("visible");
    micBtn.querySelector(".mic-label").textContent = "Sedang Mendengarkan… (tiup sekarang!)";
    micHint.textContent = "🎤 Tiup ke microphone dengan kuat!";

    analyseAudio();
  } catch (err) {
    console.error("Microphone error:", err);
    alert("Tidak dapat mengakses mikrofon. Pastikan izin diberikan di browser kamu! 🎤");
  }
}

micBtn.addEventListener("click", startMic);


/* ═══════════════════════════════════════════════════════════
   7. TYPING EFFECT on card title (optional polish)
   ═══════════════════════════════════════════════════════════ */
cardScene.addEventListener("transitionend", function onCardVisible() {
  if (!cardScene.classList.contains("active")) return;
  // Small celebration confetti when card first appears
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { x: 0.5, y: 0.1 },
    colors: ["#e91e8c","#00e5ff","#ffe082"],
    startVelocity: 30,
    scalar: 0.9,
    gravity: 1
  });
}, { once: true });


/* ═══════════════════════════════════════════════════════════
   8. PHOTO SLOT — click-to-upload (bonus UX)
   ═══════════════════════════════════════════════════════════ */
["photoSlot1","photoSlot2"].forEach((id, idx) => {
  const slot = document.getElementById(id);
  if (!slot) return;

  slot.addEventListener("click", () => {
    // Only trigger upload if showing placeholder
    if (slot.querySelector(".photo-placeholder")) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = () => {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          slot.innerHTML = `<img src="${e.target.result}" alt="Foto ${idx+1}" class="photo-img" style="border-radius:19px;" />
                            <div class="photo-glow"></div>`;
        };
        reader.readAsDataURL(file);
      };
      input.click();
    }
  });
});


/* ═══════════════════════════════════════════════════════════
   9. VISIBILITY CHANGE — pause music when tab hidden
   ═══════════════════════════════════════════════════════════ */
document.addEventListener("visibilitychange", () => {
  if (document.hidden && musicPlaying) bgMusic.pause();
  else if (!document.hidden && musicPlaying) bgMusic.play().catch(() => {});
});
