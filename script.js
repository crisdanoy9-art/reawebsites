// --- 1. Running "No" Button Logic ---
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const gateScreen = document.getElementById('gate-screen');
const mainContent = document.getElementById('main-content');

// For desktop pointer hover - moves before clicking
btnNo.addEventListener('mouseover', moveNoButton);

// For mobile screen touch - moves before releasing touch
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents actual clicking/focus on mobile devices
    moveNoButton();
});

function moveNoButton() {
    // Defines margins so the button doesn't hug the absolute edge
    const margin = 20;
    
    // Calculates available random coordinates based on viewport size and button size
    const maxX = window.innerWidth - btnNo.offsetWidth - margin;
    const maxY = window.innerHeight - btnNo.offsetHeight - margin;
    
    // Generates a random position that is still visible on screen
    const randomX = Math.floor(Math.random() * (maxX - margin)) + margin;
    const randomY = Math.floor(Math.random() * (maxY - margin)) + margin;

    // Sets the button to a fixed position to override flex/relative layout
    btnNo.style.position = 'fixed'; 
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    btnNo.style.zIndex = "1000"; // Ensures it stays above all other content
}

// --- 2. Proceed to Dashboard (Yes Button) ---
btnYes.addEventListener('click', () => {
    // Adds a simple fade-out transition for the gate
    gateScreen.style.transition = "opacity 0.5s ease, visibility 0.5s";
    gateScreen.style.opacity = "0";
    gateScreen.style.visibility = "hidden";
    
    // Small timeout to allow transition before fully hiding and showing content
    setTimeout(() => {
        gateScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Start background heart generator after proceeding
        generateHearts(); 
    }, 500);
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

    // Show the target section with fade-in animation defined in CSS
    document.getElementById(targetId).classList.remove('hidden');
    document.getElementById(targetId).classList.add('active');

    // Highlight the corresponding nav button
    document.getElementById('nav-' + targetId).classList.add('active');
    
    // Scrolls to top when changing pages (useful on mobile)
    window.scrollTo(0, 0);
}


// --- 4. Envelope Logic ---
const envelopeBtn = document.getElementById('envelope-btn');
const openedLetter = document.getElementById('opened-letter');
const envelopeContainer = document.getElementById('envelope-container');

envelopeBtn.addEventListener('click', () => {
    // Transition effects: Fade out envelope button, fade in letter
    envelopeContainer.style.transition = "opacity 0.3s ease";
    envelopeContainer.style.opacity = "0";
    
    setTimeout(() => {
        envelopeContainer.classList.add('hidden');
        openedLetter.classList.remove('hidden');
    }, 300);
});


// --- 5. Heart Background Generator: LARGER AND NOT ROTATING ---
function generateHearts() {
    const container = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💖', '💕', '💘'];

    // Interval settings: frequency vs. complexity balance
    // Spawns less frequently (400ms) because hearts are larger, preventing overlap clutter
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Pick a random heart emoji
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random horizontal position across the viewport width
        heart.style.left = Math.random() * 100 + 'vw';

        // --- UPDATED Sizing Logic: Distribution (small/medium/large mix) ---
        const sizeChoice = Math.random();
        let size, speed, opacity;

        if (sizeChoice < 0.40) { 
            // SMALLER HEARTS - Background depth layer
            // Random size between 25px and 45px
            size = Math.floor(Math.random() * 20) + 25 + 'px';       
            // Random speed between 5s and 8s (Falls slightly quicker)
            speed = (Math.random() * 3 + 5).toFixed(1) + 's';       
            // Semi-transparent for depth
            opacity = (Math.random() * 0.2 + 0.4).toFixed(2);       
        } else if (sizeChoice < 0.80) { 
            // MEDIUM HEARTS - Midground layer
            // Random size between 60px and 90px
            size = Math.floor(Math.random() * 30) + 60 + 'px';      
            // Random speed between 8s and 11s
            speed = (Math.random() * 3 + 8).toFixed(1) + 's';       
            // Medium clarity
            opacity = (Math.random() * 0.2 + 0.6).toFixed(2);       
        } else {
            // LARGE HEARTS - Foreground layer
            // Random size between 100px and 130px
            size = Math.floor(Math.random() * 30) + 100 + 'px';     
            // Majestic, slow fall pace between 12s and 16s
            speed = (Math.random() * 4 + 12).toFixed(1) + 's';      
            // Bold and prominent
            opacity = (Math.random() * 0.1 + 0.8).toFixed(2);       
        }

        // Apply calculated styles to the temporary element
        heart.style.fontSize = size;
        heart.style.animationDuration = speed;
        heart.style.opacity = opacity;

        // Inject the heart into the main screen layout
        container.appendChild(heart);

        // Clears elements out of memory safely right after they finish falling past the screen
        const lifespan = parseFloat(speed) * 1000;
        setTimeout(() => {
            heart.remove();
        }, lifespan); 
    }, 400); 
}