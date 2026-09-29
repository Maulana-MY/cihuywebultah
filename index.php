<?php
// ============================================================
// CIHUY — Interactive Birthday Greeting Website
// Technology : PHP (HTML/CSS/JS embedded)
// Backend    : No Database — all data is static
// ============================================================

$config = [
    "site_title"    => "CIHUY 🎉 Happy Birthday!",
    "recipient"     => "Sahabatku Tersayang",
    "from"          => "Dari yang selalu ada untukmu 💖",
    "message_1"     => "Semoga hari ini membawa kebahagiaan yang tak terbatas dan senyum yang tak pernah pudar.",
    "message_2"     => "Setiap langkahmu adalah cahaya, setiap mimpimu adalah doa kami. Selamat ulang tahun! 🌟",
    "music_url"     => "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "photo_1_label" => "Foto Kenangan 1",
    "photo_2_label" => "Foto Kenangan 2",

    // ⬇⬇⬇ TARUH PATH FOTO 1 DI SINI ⬇⬇⬇
    // Contoh: "assets/foto/foto1.jpg"  (letakkan file foto di folder assets/foto/)
    "photo_1_src"   => "",   // 👈 ← ISI INI DENGAN PATH FOTO PERTAMA

    // ⬇⬇⬇ TARUH PATH FOTO 2 DI SINI ⬇⬇⬇
    // Contoh: "assets/foto/foto2.jpg"
    "photo_2_src"   => "",   // 👈 ← ISI INI DENGAN PATH FOTO KEDUA
];
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="CIHUY – Ucapan Ulang Tahun Interaktif!" />
  <title><?php echo htmlspecialchars($config["site_title"]); ?></title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
<canvas id="bgCanvas"></canvas>

<section id="giftScene" class="scene active">
  <div class="gift-wrapper" id="giftBox" title="Klik untuk membuka hadiah!">
    <div class="gift-bounce">
      <svg class="gift-svg" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="110" width="160" height="100" rx="8" fill="url(#boxGrad)" />
        <rect x="10" y="85" width="180" height="35" rx="8" fill="url(#lidGrad)" />
        <rect x="90" y="85" width="20" height="125" fill="url(#ribbonGrad)" />
        <rect x="10" y="95" width="180" height="15" fill="url(#ribbonGrad)" />
        <ellipse cx="75" cy="72" rx="28" ry="14" fill="url(#bowGrad)" transform="rotate(-30 75 72)" />
        <ellipse cx="125" cy="72" rx="28" ry="14" fill="url(#bowGrad)" transform="rotate(30 125 72)" />
        <circle cx="100" cy="78" r="12" fill="url(#knotGrad)" />
        <text x="30" y="50" font-size="18" fill="#fff" opacity="0.9">✨</text>
        <text x="148" y="45" font-size="14" fill="#ff8cff" opacity="0.9">⭐</text>
        <text x="155" y="155" font-size="12" fill="#8cf" opacity="0.8">✦</text>
        <defs>
          <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#c2185b"/><stop offset="100%" stop-color="#7b1fa2"/>
          </linearGradient>
          <linearGradient id="lidGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#e91e8c"/><stop offset="100%" stop-color="#9c27b0"/>
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#00e5ff"/><stop offset="100%" stop-color="#1565c0"/>
          </linearGradient>
          <linearGradient id="bowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00bcd4"/><stop offset="100%" stop-color="#0288d1"/>
          </linearGradient>
          <linearGradient id="knotGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#26c6da"/><stop offset="100%" stop-color="#007c91"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="sparkle-ring ring1"></div>
      <div class="sparkle-ring ring2"></div>
      <div class="sparkle-ring ring3"></div>
    </div>
    <p class="gift-hint">🎁 Klik untuk membuka hadiah!</p>
  </div>

  <div class="float-stars" aria-hidden="true">
    <?php
    $icons = ['✨','⭐','🌟','💫','✦','★'];
    for ($i = 0; $i < 20; $i++):
      $l = rand(0,100); $t = rand(0,100);
      $sz = rand(10,28); $delay = rand(0,4000); $dur = rand(2000,5000);
      $ico = $icons[array_rand($icons)];
    ?>
    <span class="fstar" style="left:<?php echo $l ?>%;top:<?php echo $t ?>%;font-size:<?php echo $sz ?>px;animation-delay:<?php echo $delay ?>ms;animation-duration:<?php echo $dur ?>ms;"><?php echo $ico ?></span>
    <?php endfor; ?>
  </div>
</section>

<section id="cardScene" class="scene">
  <div class="card-container">

    <header class="card-header glass">
      <div class="header-sparkles" aria-hidden="true"><span>🎉</span><span>🎂</span><span>🎊</span></div>
      <h1 class="card-title">Happy Birthday!</h1>
      <p class="card-subtitle">Untuk <strong><?php echo htmlspecialchars($config["recipient"]); ?></strong></p>
    </header>

    <section class="photo-section" aria-label="Foto kenangan">
      <div class="photo-grid">
        <div class="photo-slot glass" id="photoSlot1">
          <?php if (!empty($config["photo_1_src"])): ?>
            <img src="<?php echo htmlspecialchars($config["photo_1_src"]); ?>" alt="<?php echo htmlspecialchars($config["photo_1_label"]); ?>" class="photo-img" />
          <?php else: ?>
            <div class="photo-placeholder">
              <svg viewBox="0 0 100 100" class="placeholder-svg" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="38" r="18" fill="rgba(255,100,200,0.4)" stroke="#ff69b4" stroke-width="2"/>
                <path d="M10 85 Q10 60 50 60 Q90 60 90 85" fill="rgba(255,100,200,0.3)" stroke="#ff69b4" stroke-width="2"/>
                <text x="50" y="97" text-anchor="middle" fill="#ffb3e6" font-size="8" font-family="Outfit">Tambahkan Foto</text>
              </svg>
              <span class="photo-label"><?php echo htmlspecialchars($config["photo_1_label"]); ?></span>
            </div>
          <?php endif; ?>
          <div class="photo-glow"></div>
        </div>
        <div class="photo-slot glass" id="photoSlot2">
          <?php if (!empty($config["photo_2_src"])): ?>
            <img src="<?php echo htmlspecialchars($config["photo_2_src"]); ?>" alt="<?php echo htmlspecialchars($config["photo_2_label"]); ?>" class="photo-img" />
          <?php else: ?>
            <div class="photo-placeholder">
              <svg viewBox="0 0 100 100" class="placeholder-svg" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="38" r="18" fill="rgba(100,180,255,0.4)" stroke="#69b4ff" stroke-width="2"/>
                <path d="M10 85 Q10 60 50 60 Q90 60 90 85" fill="rgba(100,180,255,0.3)" stroke="#69b4ff" stroke-width="2"/>
                <text x="50" y="97" text-anchor="middle" fill="#b3d9ff" font-size="8" font-family="Outfit">Tambahkan Foto</text>
              </svg>
              <span class="photo-label"><?php echo htmlspecialchars($config["photo_2_label"]); ?></span>
            </div>
          <?php endif; ?>
          <div class="photo-glow"></div>
        </div>
      </div>
    </section>

    <section class="message-section glass" aria-label="Pesan ulang tahun">
      <div class="message-icon">💌</div>
      <p class="message-text"><?php echo htmlspecialchars($config["message_1"]); ?></p>
      <p class="message-text secondary"><?php echo htmlspecialchars($config["message_2"]); ?></p>
      <p class="message-from"><?php echo htmlspecialchars($config["from"]); ?></p>
    </section>

    <section class="cake-section glass" aria-label="Kue ulang tahun interaktif">
      <h2 class="section-title">🎂 Tiup Lilinnya!</h2>
      <p class="mic-hint" id="micHint">Klik tombol 🎤 lalu tiup ke microphone untuk mematikan lilin!</p>
      <div class="cake-wrapper">
        <div class="candle-assembly" id="candleAssembly">
          <div class="smoke-container" id="smokeContainer" aria-hidden="true">
            <div class="smoke smoke1"></div>
            <div class="smoke smoke2"></div>
            <div class="smoke smoke3"></div>
          </div>
          <div class="flame-wrapper" id="flameWrapper">
            <div class="flame-outer" id="flame"></div>
            <div class="flame-inner"></div>
            <div class="flame-core"></div>
            <div class="flame-glow" id="flameGlow"></div>
          </div>
          <div class="candle-stick"></div>
        </div>
        <div class="cake-body">
          <div class="cake-tier tier-top"><div class="tier-deco">🌸🌸🌸</div></div>
          <div class="cake-tier tier-mid"><div class="tier-deco">✨ Happy Birthday ✨</div></div>
          <div class="cake-tier tier-bot"><div class="tier-deco">💖 CIHUY 💖</div></div>
          <div class="cake-plate"></div>
        </div>
      </div>
      <button class="mic-btn" id="micBtn" aria-label="Aktifkan mikrofon">
        <span class="mic-icon">🎤</span>
        <span class="mic-label">Aktifkan Mikrofon</span>
      </button>
      <div class="mic-status" id="micStatus">
        <div class="mic-bar" id="micBar"></div>
      </div>
      <div class="blown-msg" id="blownMsg" aria-live="polite">
        🌬️ Wow! Lilinnya padam! Semoga semua harapanmu terkabul! 🌠
      </div>
    </section>

    <footer class="card-footer">
      <p>Made with 💖 · CIHUY Birthday Greeting</p>
      <p style="font-size:0.75rem;opacity:0.5;margin-top:4px;"><?php echo date("Y"); ?> · No database · Pure PHP + HTML + CSS + JS</p>
    </footer>

  </div>
</section>

<audio id="bgMusic" loop preload="none">
  <source src="<?php echo htmlspecialchars($config["music_url"]); ?>" type="audio/mpeg" />
</audio>

<button class="fab-music" id="fabMusic" title="Toggle Music" aria-label="Toggle background music">
  <span id="fabMusicIcon">🎵</span>
</button>

<script src="main.js"></script>
</body>
</html>
