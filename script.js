// --- 1. Running "No" Button Logic (ABORT styled) ---
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const gateScreen = document.getElementById('gate-screen');
const mainContent = document.getElementById('main-content');

// Change text to 'ABORT' to fit theme
btnNo.innerText = "ABORT";
btnYes.innerText = "EXECUTE";

// For desktop pointer hover - moves before clicking
btnNo.addEventListener('mouseover', moveNoButton);

// For mobile screen touch - moves before releasing touch
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveNoButton();
});

function moveNoButton() {
    const margin = 20;
    
    // Calculates available coordinates
    const maxX = window.innerWidth - btnNo.offsetWidth - margin;
    const maxY = window.innerHeight - btnNo.offsetHeight - margin;
    
    // Generates a random position
    const randomX = Math.floor(Math.random() * (maxX - margin)) + margin;
    const randomY = Math.floor(Math.random() * (maxY - margin)) + margin;

    btnNo.style.position = 'fixed'; 
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    btnNo.style.zIndex = "1000"; 
}

// --- 2. Proceed to Dashboard (Yes/EXECUTE Button) ---
btnYes.addEventListener('click', () => {
    gateScreen.style.transition = "opacity 0.5s ease, visibility 0.5s";
    gateScreen.style.opacity = "0";
    gateScreen.style.visibility = "hidden";
    
    setTimeout(() => {
        gateScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Start "Matrix" text effect
        startMatrixEffect(); 
    }, 500);
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
    
    window.scrollTo(0, 0);
}

// --- 4. Envelope Logic ---
const envelopeBtn = document.getElementById('envelope-btn');
const openedLetter = document.getElementById('opened-letter');
const envelopeContainer = document.getElementById('envelope-container');

envelopeBtn.addEventListener('click', () => {
    envelopeContainer.style.transition = "opacity 0.3s ease";
    envelopeContainer.style.opacity = "0";
    
    setTimeout(() => {
        envelopeContainer.classList.add('hidden');
        openedLetter.classList.remove('hidden');
    }, 300);
});

// --- 5. Terminal "Matrix" Background Effect ---
// This replaces the moving hearts
function startMatrixEffect() {
    // Note: This is a visual effect managed by CSS via linear gradients in body.
    // For a deep technical look, keep text content simple.
    const title = document.querySelector('.title');
    if (title) {
        title.style.textShadow = '0 0 10px #00ff41';
    }
}