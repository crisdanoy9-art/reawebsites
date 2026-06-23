// --- 1. Running "No" Button Logic ---
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const gateScreen = document.getElementById('gate-screen');
const mainContent = document.getElementById('main-content');

// For desktop pointer hover
btnNo.addEventListener('mouseover', moveNoButton);
// For mobile screen touch
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveNoButton();
});

function moveNoButton() {
    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    btnNo.style.position = 'fixed'; 
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

// --- 2. Proceed to Dashboard (Yes Button) ---
btnYes.addEventListener('click', () => {
    gateScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    generateHearts(); 
});


// --- 3. Navigation Logic ---
function navigate(targetId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('active');
    });

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(targetId).classList.remove('hidden');
    document.getElementById(targetId).classList.add('active');
    document.getElementById('nav-' + targetId).classList.add('active');
}


// --- 4. Envelope Logic ---
const envelopeBtn = document.getElementById('envelope-btn');
const openedLetter = document.getElementById('opened-letter');
const envelopeContainer = document.getElementById('envelope-container');

envelopeBtn.addEventListener('click', () => {
    envelopeContainer.classList.add('hidden');
    openedLetter.classList.remove('hidden');
});


// --- 5. Enhanced Falling Hearts Background Generator ---
function generateHearts() {
    const container = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💖', '💕', '💘'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';

        // Mix Sizing Logic (Small, Medium, Big) combined with Falling Physics
        const sizeChoice = Math.random();
        let size, speed, opacity;

        if (sizeChoice < 0.45) { 
            // SMALL HEARTS (Background Layer)
            size = Math.floor(Math.random() * 8) + 12 + 'px';       
            speed = (Math.random() * 2 + 4).toFixed(1) + 's';       // Falls slightly quicker 
            opacity = (Math.random() * 0.3 + 0.4).toFixed(2);       
        } else if (sizeChoice < 0.85) { 
            // MEDIUM HEARTS (Midground Layer)
            size = Math.floor(Math.random() * 12) + 24 + 'px';      
            speed = (Math.random() * 3 + 6).toFixed(1) + 's';       
            opacity = (Math.random() * 0.3 + 0.6).toFixed(2);       
        } else { 
            // BIG HEARTS (Foreground Layer)
            size = Math.floor(Math.random() * 15) + 48 + 'px';      
            speed = (Math.random() * 4 + 9).toFixed(1) + 's';       // Heavy, slow drifting fall
            opacity = (Math.random() * 0.2 + 0.8).toFixed(2);       
        }

        heart.style.fontSize = size;
        heart.style.animationDuration = speed;
        heart.style.opacity = opacity;

        container.appendChild(heart);

        // Clears elements out of memory safely right after they finish falling
        const lifespan = parseFloat(speed) * 1000;
        setTimeout(() => {
            heart.remove();
        }, lifespan); 
    }, 300); 
}