// ─── 1. Floating Hearts Generator ────────────────────────
function createHearts() {
    const container = document.getElementById('hearts-container');
    const symbols = ['❤️', '🌸', '✨', '💕', '🌺', '💖', '🌷'];
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
    gateScreen.style.opacity = '0';
    gateScreen.style.visibility = 'hidden';
    setTimeout(() => {
        gateScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }, 500);
});

// ─── 4. Navigation ──────────────────────────────────────
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
    if (navBtn) navBtn.classList.add('active');

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── 5. Envelope Logic ──────────────────────────────────
const envelopeBtn = document.getElementById('envelope-btn');
const openedLetter = document.getElementById('opened-letter');
const envelopeContainer = document.getElementById('envelope-container');

envelopeBtn.addEventListener('click', () => {
    envelopeContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    envelopeContainer.style.opacity = '0';
    envelopeContainer.style.transform = 'scale(0.9)';
    setTimeout(() => {
        envelopeContainer.classList.add('hidden');
        openedLetter.classList.remove('hidden');
        openedLetter.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

// ─── 8. (Optional) Video lazy load or additional features ─
// You can add automatic video poster loading, etc.
// For now, the videos are statically in HTML.