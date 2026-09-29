# 🎉 CIHUY — Interactive Birthday Greeting Website

> **PHP SPA · Glassmorphism · No Database · Mobile-First**

![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?logo=php&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Fitur

| Fitur | Keterangan |
|-------|-----------|
| 🎁 Gift Box Animation | Kotak hadiah animasi 3D — klik untuk membuka |
| 🎊 Confetti Explosion | Efek confetti canvas-confetti saat buka hadiah |
| 💎 Glassmorphism Card | Kartu ucapan frosted-glass + gradient Pink/Blue |
| 📸 2 Photo Slots | Upload foto langsung dari browser (FileReader) |
| 🎵 Background Music | Audio otomatis play setelah interaksi |
| 🎂 CSS Birthday Cake | Kue ulang tahun 3 tier murni CSS + animasi lilin |
| 🎤 Candle Blow | Tiup via mikrofon — lilin padam + efek asap + confetti |
| 📱 Responsive | Mobile-first, mulus di HP & laptop |
| ✨ Particle BG | 120 partikel animasi di background canvas |

---

## 🚀 Cara Pakai

### Requirements
- PHP 7.4+ (XAMPP / Laragon / dsb.)
- Browser modern (Chrome / Firefox / Edge)

### Instalasi
```bash
git clone https://github.com/Maulana-MY/cihuywebultah.git
# Letakkan di folder htdocs XAMPP
# Buka: http://localhost/cihuywebultah/
```

### Kustomisasi Foto & Teks
Edit bagian `$config` di `index.php`:

```php
$config = [
    "recipient"   => "Nama si Penerima",
    "message_1"   => "Pesan ucapan kamu...",
    "photo_1_src" => "assets/foto/foto1.jpg",  // ← taruh foto di sini
    "photo_2_src" => "assets/foto/foto2.jpg",  // ← taruh foto di sini
    "music_url"   => "https://link-mp3-happy-birthday.mp3",
];
```

---

## 📁 Struktur File

```
cihuywebultah/
├── index.php       # PHP entry point + HTML structure
├── style.css       # Glassmorphism CSS + animations
├── main.js         # Particles, confetti, mic, music logic
├── .gitignore
├── README.md
└── assets/
    └── foto/       # Taruh foto kamu di sini (tidak di-upload ke GitHub)
```

---

## 🎨 Tech Stack

- **PHP** — static config & HTML generation
- **Vanilla CSS** — glassmorphism, animations, responsive
- **Vanilla JS** — particle system, Web Audio API, MediaDevices
- **canvas-confetti** CDN — firework confetti effect
- **Google Fonts** — Outfit + Dancing Script

---

Made with 💖 by Maulana-MY · No database · No framework
