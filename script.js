// ─── 0. Preloader ─────────────────────────────────────────
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => preloader.classList.add('loaded'), 400);
    }
});

// ─── 1. Floating Hearts Generator ────────────────────────
function createHearts() {
    const container = document.getElementById('hearts-container');
    const symbols = ['❤️', '🌸', '✨', '💕', '🌺', '💖', '🌷', '🌹'];
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.8 + 1.2) + 'rem';
        heart.style.animationDuration = (Math.random() * 15 + 12) + 's';
        heart.style.animationDelay = (Math.random() * 15) + 's';
        container.appendChild(heart);
    }
}
createHearts();

// ─── 1b. Drifting Rose Petals (falls from top, sways side to side) ──
function createPetals() {
    const container = document.getElementById('hearts-container');
    const petals = ['🌹', '🥀', '🌸'];
    for (let i = 0; i < 18; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal-float';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = (Math.random() * 1.2 + 1) + 'rem';
        petal.style.animationDuration = (Math.random() * 10 + 14) + 's';
        petal.style.animationDelay = (Math.random() * 18) + 's';
        petal.style.setProperty('--sway', (Math.random() * 80 - 40) + 'px');
        container.appendChild(petal);
    }
}
createPetals();

// ─── 1c. Shared burst helpers (confetti + ripple + click hearts) ──
const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function spawnRipple(x, y) {
    if (prefersReducedMotionQuery.matches) return;
    const ring = document.createElement('div');
    ring.className = 'ripple-ring';
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 900);
}

function burstConfetti(x, y, count = 22) {
    if (prefersReducedMotionQuery.matches) return;
    const symbols = ['🌹', '❤️', '💕', '✨', '🌸', '💖'];
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 170;
        piece.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        piece.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        piece.style.left = x + 'px';
        piece.style.top = y + 'px';
        piece.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 1200);
    }
}

// Little heart that pops wherever you click/tap, anywhere on the page
document.addEventListener('click', (e) => {
    if (prefersReducedMotionQuery.matches) return;
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = ['💕', '💖', '❤️', '🌹'][Math.floor(Math.random() * 4)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 900);
});

// Subtle parallax drift of the floating hearts/petals as the cursor moves
const heartsContainerEl = document.getElementById('hearts-container');
if (heartsContainerEl && !prefersReducedMotionQuery.matches) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 24;
        const y = (e.clientY / window.innerHeight - 0.5) * 24;
        heartsContainerEl.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// ─── 1d. Gate screen sparkles ─────────────────────────────
function createGateSparkles() {
    const container = document.getElementById('gate-sparkles');
    if (!container || prefersReducedMotionQuery.matches) return;
    const symbols = ['✦', '✧', '⋆'];
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-dot';
        sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = (Math.random() * 2.6) + 's';
        sparkle.style.fontSize = (Math.random() * 0.8 + 0.6) + 'rem';
        container.appendChild(sparkle);
    }
}
createGateSparkles();

// ─── 2. Running "No" Button (Romantic version) ──────────
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const gateScreen = document.getElementById('gate-screen');
const mainContent = document.getElementById('main-content');

// Set button texts (already in HTML, but we set again for safety)
btnNo.innerText = "No 💔";
btnYes.innerText = "Yes 💖";

btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    const margin = 20;
    const maxX = window.innerWidth - btnNo.offsetWidth - margin;
    const maxY = window.innerHeight - btnNo.offsetHeight - margin;
    // Avoid going out of bounds
    if (maxX < 0 || maxY < 0) return;
    const randomX = Math.floor(Math.random() * (maxX - margin)) + margin;
    const randomY = Math.floor(Math.random() * (maxY - margin)) + margin;
    btnNo.style.position = 'fixed';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    btnNo.style.zIndex = '1000';
}

// ─── 3. Proceed to Main Content (Yes button) ─────────────
btnYes.addEventListener('click', () => {
    const rect = btnYes.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    spawnRipple(cx, cy);
    burstConfetti(cx, cy, 26);

    gateScreen.style.opacity = '0';
    gateScreen.style.visibility = 'hidden';
    setTimeout(() => {
        gateScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }, 500);

    // Try to start the ambient background music now that we have a real click (user gesture)
    startBgMusicIfEnabled();
});

// ─── 4. Navigation ──────────────────────────────────────
function updateNavIndicator(activeBtn) {
    const indicator = document.getElementById('nav-indicator');
    if (!indicator || !activeBtn) return;
    indicator.style.width = activeBtn.offsetWidth + 'px';
    indicator.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
    indicator.style.top = (activeBtn.offsetTop + activeBtn.offsetHeight - 3) + 'px';
}

function navigate(targetId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });

    // Deactivate all nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show target section and activate its button
    const target = document.getElementById(targetId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
    const navBtn = document.getElementById('nav-' + targetId);
    if (navBtn) {
        navBtn.classList.add('active');
        updateNavIndicator(navBtn);
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Keep the indicator aligned on load and on resize
window.addEventListener('load', () => {
    const activeBtn = document.querySelector('.nav-btn.active') || document.getElementById('nav-home');
    updateNavIndicator(activeBtn);
});
window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.nav-btn.active');
    updateNavIndicator(activeBtn);
});

// ─── 5. Envelope Logic ──────────────────────────────────
const envelopeBtn = document.getElementById('envelope-btn');
const openedLetter = document.getElementById('opened-letter');
const envelopeContainer = document.getElementById('envelope-container');

envelopeBtn.addEventListener('click', () => {
    const rect = envelopeBtn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    spawnRipple(cx, cy);
    burstConfetti(cx, cy, 20);

    const waxSeal = document.getElementById('wax-seal');
    if (waxSeal) waxSeal.classList.add('cracked');

    envelopeContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    envelopeContainer.style.opacity = '0';
    envelopeContainer.style.transform = 'scale(0.9)';
    setTimeout(() => {
        envelopeContainer.classList.add('hidden');
        openedLetter.classList.remove('hidden');
        openedLetter.scrollIntoView({ behavior: 'smooth', block: 'center' });
        revealLetterParagraphs();
    }, 400);
});

// ─── 6. Footer year ──────────────────────────────────────
const footerYear = document.getElementById('footer-year');
if (footerYear) {
    footerYear.textContent = '· ' + new Date().getFullYear();
}

// ─── 7. Interactive cursor tilt on photo/video cards ─────
function initTilt() {
    const cards = document.querySelectorAll('.photo-marquee .media-card');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform =
                `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.06)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
initTilt();

// ─── 8. Music player – vinyl spin sync ───────────────────
const songAudio = document.getElementById('song-audio');
const vinyl = document.getElementById('vinyl');
const tonearm = document.getElementById('tonearm');

if (songAudio && vinyl) {
    songAudio.addEventListener('play', () => {
        vinyl.classList.add('spinning');
        if (tonearm) tonearm.classList.add('active');
    });
    songAudio.addEventListener('pause', () => {
        vinyl.classList.remove('spinning');
        if (tonearm) tonearm.classList.remove('active');
    });
    songAudio.addEventListener('ended', () => {
        vinyl.classList.remove('spinning');
        if (tonearm) tonearm.classList.remove('active');
    });
}

// ─── 9. (Optional) Video lazy load or additional features ─
// You can add automatic video poster loading, etc.
// For now, the videos are statically in HTML.

// ─── 10. Live "Together Since" Love Counter ──────────────
// Edit the date below (YYYY, MonthIndex[0-11], Day) to match your story.
const togetherSinceDate = new Date(2024, 10, 11); // November 11, 2024

function updateLoveCounter() {
    const daysEl = document.getElementById('count-days');
    if (!daysEl) return;
    const now = new Date();
    let diff = now - togetherSinceDate;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = days;
    document.getElementById('count-hours').textContent = hours;
    document.getElementById('count-mins').textContent = mins;
    document.getElementById('count-secs').textContent = secs;

    const sinceLabel = document.getElementById('together-since');
    if (sinceLabel) {
        sinceLabel.textContent = togetherSinceDate.toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }
}
updateLoveCounter();
setInterval(updateLoveCounter, 1000);

// ─── 11. Typewriter effect for the Home subtitle ─────────
function typewriteHomeSubtitle() {
    const subtitle = document.getElementById('home-subtitle');
    if (!subtitle || subtitle.dataset.typed === 'true') return;
    const fullText = subtitle.getAttribute('data-full-text') || '';
    subtitle.textContent = '';
    subtitle.dataset.typed = 'true';

    if (prefersReducedMotionQuery.matches) {
        subtitle.textContent = fullText;
        return;
    }

    let i = 0;
    function typeChar() {
        if (i <= fullText.length) {
            subtitle.textContent = fullText.slice(0, i);
            i++;
            setTimeout(typeChar, 28);
        }
    }
    typeChar();
}
typewriteHomeSubtitle();

// ─── 12. Floating Love Note – random surprise message ────
const loveNotes = [
    "You are the best part of my every single day. 💕",
    "I fall for you a little more with every sunrise. 🌅",
    "Home isn't a place, it's wherever you are. 🏡",
    "Your smile is still my favorite thing in this world. ✨",
    "I don't need a reason to love you — but I have a thousand. 🌹",
    "Thank you for choosing me, every day, again and again. 💖",
    "Even the quiet, ordinary moments are extraordinary with you. 🌸",
    "You make forever sound like a promise I can't wait to keep. ♾️"
];

const loveNoteBtn = document.getElementById('love-note-btn');
const loveNoteModal = document.getElementById('love-note-modal');
const loveNoteText = document.getElementById('love-note-text');
const loveNoteClose = document.getElementById('love-note-close');

if (loveNoteBtn && loveNoteModal && loveNoteText) {
    loveNoteBtn.addEventListener('click', () => {
        const note = loveNotes[Math.floor(Math.random() * loveNotes.length)];
        loveNoteText.textContent = note;
        loveNoteModal.classList.remove('hidden');
    });
    loveNoteClose.addEventListener('click', () => {
        loveNoteModal.classList.add('hidden');
    });
    loveNoteModal.addEventListener('click', (e) => {
        if (e.target === loveNoteModal) loveNoteModal.classList.add('hidden');
    });
}

// ─── 17. Scratch-to-Reveal Secret Note ────────────────────
function initScratchCard() {
    const card = document.getElementById('scratch-card');
    const canvas = document.getElementById('scratch-canvas');
    if (!card || !canvas) return;

    const ctx = canvas.getContext('2d');

    function sizeCanvas() {
        canvas.width = card.clientWidth;
        canvas.height = card.clientHeight;
        ctx.fillStyle = '#E3A857';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '600 15px Poppins, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.textAlign = 'center';
    }
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    ctx.globalCompositeOperation = 'destination-out';

    let isScratching = false;
    let scratchedPixels = 0;
    const checkThreshold = 45; // % scratched before auto-reveal

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const point = e.touches ? e.touches[0] : e;
        return { x: point.clientX - rect.left, y: point.clientY - rect.top };
    }

    function scratchAt(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();
    }

    function revealCard() {
        card.classList.add('revealed');
    }

    function estimateScratchedPercent() {
        // Sample a coarse grid instead of every pixel, for performance
        const { width, height } = canvas;
        if (!width || !height) return 0;
        const data = ctx.getImageData(0, 0, width, height).data;
        let cleared = 0;
        let total = 0;
        const step = 8;
        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
                total++;
                const alpha = data[(y * width + x) * 4 + 3];
                if (alpha < 10) cleared++;
            }
        }
        return total ? (cleared / total) * 100 : 0;
    }

    function handleMove(e) {
        if (!isScratching) return;
        e.preventDefault();
        const { x, y } = getPos(e);
        scratchAt(x, y);
        scratchedPixels++;
        if (scratchedPixels % 6 === 0 && estimateScratchedPercent() > checkThreshold) {
            revealCard();
        }
    }

    canvas.addEventListener('mousedown', (e) => { isScratching = true; handleMove(e); });
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', () => { isScratching = false; });

    canvas.addEventListener('touchstart', (e) => { isScratching = true; handleMove(e); }, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', () => { isScratching = false; });
}
initScratchCard();

// ─── 19. Bucket List – "Our Future" checklist ─────────────
function initBucketList() {
    const list = document.getElementById('bucket-list');
    if (!list) return;
    const checkboxes = list.querySelectorAll('input[type="checkbox"]');
    const progressBar = document.getElementById('bucket-progress-bar');
    const progressText = document.getElementById('bucket-progress-text');
    const STORAGE_PREFIX = 'loveSiteBucket_';

    function updateProgress(celebrate) {
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percent = total ? Math.round((checked / total) * 100) : 0;
        if (progressBar) progressBar.style.width = percent + '%';
        if (progressText) progressText.textContent = percent;

        if (celebrate && percent === 100) {
            const rect = list.getBoundingClientRect();
            burstConfetti(rect.left + rect.width / 2, rect.top + 20, 34);
        }
    }

    checkboxes.forEach(cb => {
        const key = STORAGE_PREFIX + cb.dataset.key;
        cb.checked = localStorage.getItem(key) === 'true';
        cb.addEventListener('change', () => {
            localStorage.setItem(key, cb.checked);
            updateProgress(true);
        });
    });

    updateProgress(false);
}
initBucketList();

// ─── 18. Ambient background music toggle ─────────────────
const bgMusic = document.getElementById('bg-music');
const bgMusicToggle = document.getElementById('bg-music-toggle');
const BG_MUSIC_KEY = 'loveSiteBgMusicEnabled';

function setBgMusicIcon(isPlaying) {
    if (!bgMusicToggle) return;
    bgMusicToggle.innerHTML = isPlaying
        ? '<i class="fas fa-volume-up"></i>'
        : '<i class="fas fa-volume-mute"></i>';
    bgMusicToggle.classList.toggle('playing', isPlaying);
}

function startBgMusicIfEnabled() {
    if (!bgMusic) return;
    const enabled = localStorage.getItem(BG_MUSIC_KEY);
    if (enabled === 'off') {
        setBgMusicIcon(false);
        return;
    }
    bgMusic.volume = 0.35;
    bgMusic.play().then(() => {
        setBgMusicIcon(true);
        localStorage.setItem(BG_MUSIC_KEY, 'on');
    }).catch(() => {
        // Autoplay blocked — she can still tap the button manually
        setBgMusicIcon(false);
    });
}

if (bgMusicToggle && bgMusic) {
    bgMusicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.volume = 0.35;
            bgMusic.play().then(() => {
                setBgMusicIcon(true);
                localStorage.setItem(BG_MUSIC_KEY, 'on');
            }).catch(() => {});
        } else {
            bgMusic.pause();
            setBgMusicIcon(false);
            localStorage.setItem(BG_MUSIC_KEY, 'off');
        }
    });
}

// ─── 13. Staggered reveal for the love letter paragraphs ─
function revealLetterParagraphs() {
    const paragraphs = document.querySelectorAll('#opened-letter p, #opened-letter h3');
    if (prefersReducedMotionQuery.matches) {
        paragraphs.forEach(p => p.classList.add('revealed'));
        return;
    }
    paragraphs.forEach((p, index) => {
        setTimeout(() => p.classList.add('revealed'), index * 220);
    });
}

// ─── 14. Photo Lightbox ───────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let lightboxPhotos = [];
let lightboxIndex = 0;

function initLightbox() {
    if (!lightbox || !lightboxImg) return;
    const imgs = document.querySelectorAll('#photos .media-card img');
    const seen = new Set();
    lightboxPhotos = [];
    imgs.forEach(img => {
        if (!seen.has(img.src)) {
            seen.add(img.src);
            lightboxPhotos.push(img.src);
        }
        img.addEventListener('click', () => openLightbox(img.src));
    });

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => shiftLightbox(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => shiftLightbox(1));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') shiftLightbox(-1);
        if (e.key === 'ArrowRight') shiftLightbox(1);
    });
}

function openLightbox(src) {
    lightboxIndex = lightboxPhotos.indexOf(src);
    if (lightboxIndex === -1) lightboxIndex = 0;
    lightboxImg.src = lightboxPhotos[lightboxIndex];
    lightbox.classList.remove('hidden');
}

function closeLightbox() {
    lightbox.classList.add('hidden');
}

function shiftLightbox(offset) {
    if (lightboxPhotos.length === 0) return;
    lightboxIndex = (lightboxIndex + offset + lightboxPhotos.length) % lightboxPhotos.length;
    lightboxImg.src = lightboxPhotos[lightboxIndex];
}

initLightbox();

// ─── 15. Footer heart row – little easter egg ─────────────
const footerHearts = document.getElementById('footer-hearts');
if (footerHearts) {
    footerHearts.addEventListener('click', () => {
        const rect = footerHearts.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        spawnRipple(cx, cy);
        burstConfetti(cx, cy, 26);
    });
}