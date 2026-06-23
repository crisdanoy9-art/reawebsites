// --- 1. Running "No" Button Logic ---
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const gateScreen = document.getElementById('gate-screen');
const mainContent = document.getElementById('main-content');

// For mouse users (desktop)
btnNo.addEventListener('mouseover', moveNoButton);
// For touch users (mobile)
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents clicking it on mobile
    moveNoButton();
});

function moveNoButton() {
    // Calculate random X and Y positions within the viewport boundaries
    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Apply the new coordinates
    btnNo.style.position = 'fixed'; // Fixed ensures it stays on screen
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

// --- 2. Proceed to Dashboard (Yes Button) ---
btnYes.addEventListener('click', () => {
    gateScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    generateHearts(); // Start background hearts once entered
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
    // Hide the button container, show the letter
    envelopeContainer.classList.add('hidden');
    openedLetter.classList.remove('hidden');
});


// --- 5. Generate Floating Hearts Background ---
function generateHearts() {
    const container = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💖', '💕', '💘'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Randomize heart appearance and physics
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's'; // Between 4s and 7s
        heart.style.fontSize = Math.random() * 20 + 15 + 'px'; // Between 15px and 35px

        container.appendChild(heart);

        // Remove the heart from the DOM after animation completes (to prevent lag)
        setTimeout(() => {
            heart.remove();
        }, 7000); 
    }, 400); // Spawns a new heart every 400ms
}