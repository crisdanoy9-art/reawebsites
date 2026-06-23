// --- 1. Running "No" Button Logic ---
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const gateScreen = document.getElementById('gate-screen');
const mainContent = document.getElementById('main-content');

// For mouse users (desktop)
btnNo.addEventListener('mouseover', moveNoButton);
// For touch users (mobile)
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents actual clicking on mobile devices
    moveNoButton();
});

function moveNoButton() {
    // Calculate random X and Y positions within the viewport boundaries
    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Apply the new coordinates dynamically
    btnNo.style.position = 'fixed'; 
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

// --- 2. Proceed to Dashboard (Yes Button) ---
btnYes.addEventListener('click', () => {
    gateScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    generateHearts(); // Starts the enhanced heart generator
});


// --- 3. Navigation Logic ---
function navigate(targetId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });

    // Remove 'active' styling from all nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show the target section
    document.getElementById(targetId).classList.remove('hidden');
    document.getElementById(targetId).classList.add('active');

    // Highlight the clicked nav button
    document.getElementById('nav-' + targetId).classList.add('active');
}


// --- 4. Envelope Logic ---
const envelopeBtn = document.getElementById('envelope-btn');
const openedLetter = document.getElementById('opened-letter');
const envelopeContainer = document.getElementById('envelope-container');

envelopeBtn.addEventListener('click', () => {
    // Hide the button container, show the romantic letter
    envelopeContainer.classList.add('hidden');
    openedLetter.classList.remove('hidden');
});


// --- 5. Enhanced Floating Hearts Background ---
function generateHearts() {
    const container = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💖', '💕', '💘'];

    // Spawns a new heart every 300ms for a lush, rich background atmosphere
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Pick a random heart emoji
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        // Random horizontal spawning point
        heart.style.left = Math.random() * 100 + 'vw';

        // Mix Logic: Small, Medium, and Big presets
        const sizeChoice = Math.random();
        let size, speed, opacity;

        if (sizeChoice < 0.45) { 
            // 1. SMALL HEARTS (45% chance)
            size = Math.floor(Math.random() * 8) + 12 + 'px';       // 12px to 20px
            speed = (Math.random() * 2 + 3).toFixed(1) + 's';       // 3s to 5s (Moves faster in the background)
            opacity = (Math.random() * 0.3 + 0.4).toFixed(2);       // Subtle, semi-transparent depth
        } else if (sizeChoice < 0.85) { 
            // 2. MEDIUM HEARTS (40% chance)
            size = Math.floor(Math.random() * 12) + 24 + 'px';      // 24px to 36px
            speed = (Math.random() * 3 + 5).toFixed(1) + 's';       // 5s to 8s (Standard pace)
            opacity = (Math.random() * 0.3 + 0.6).toFixed(2);       // Slightly clearer
        } else { 
            // 3. BIG HEARTS (15% chance)
            size = Math.floor(Math.random() * 15) + 48 + 'px';      // 48px to 63px
            speed = (Math.random() * 4 + 8).toFixed(1) + 's';       // 8s to 12s (Drifts past majestically slow)
            opacity = (Math.random() * 0.2 + 0.8).toFixed(2);       // Solid and bold
        }

        // Apply styles to the heart element
        heart.style.fontSize = size;
        heart.style.animationDuration = speed;
        heart.style.opacity = opacity;

        container.appendChild(heart);

        // Performance Optimization: Safely removes the heart right after its animation finishes
        const lifespan = parseFloat(speed) * 1000;
        setTimeout(() => {
            heart.remove();
        }, lifespan); 
    }, 300); 
}