// Create image train with CSS animations
function createImageTrain() {
    const imageTrain = document.getElementById('imageTrain');
    if (!imageTrain) {
        console.error('imageTrain element not found');
        return;
    }
    
    const images = [
        'images/1.jpeg',
        'images/2.jpeg',
        'images/4.jpeg',
        'images/5.jpeg',
        'images/8.jpeg',
        'images/9 .jpeg',
        'images/WhatsApp Image 2026-02-12 at 07.37.50.jpeg'
    ];
    
    // Create images with CSS animation
    images.forEach((imagePath, index) => {
        const img = document.createElement('img');
        img.src = imagePath;
        img.className = 'train-image';
        img.alt = `Image ${index + 1}`;
        
        // Add error handling for images
        img.onerror = function() {
            console.error(`Failed to load image: ${imagePath}`);
        };
        
        img.onload = function() {
            console.log(`Successfully loaded image: ${imagePath}`);
        };
        
        // Calculate delay for each image to create train effect
        // No delay - images start immediately but are spaced along the path
        const delay = (index * 1.14); // Spacing based on 8s animation / 7 images
        img.style.animationDelay = `${delay}s`;
        
        imageTrain.appendChild(img);
    });
}

// Create ambient sparkles around the heart
function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    if (!sparklesContainer) {
        console.error('sparkles element not found');
        return;
    }
    
    const numSparkles = 20;
    
    for (let i = 0; i < numSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position around the heart
        const angle = Math.random() * 2 * Math.PI;
        const distance = 0.2 + Math.random() * 0.15;
        const centerX = 0.5;
        const centerY = 0.5;
        
        sparkle.style.left = `${(centerX + Math.cos(angle) * distance) * 100}%`;
        sparkle.style.top = `${(centerY + Math.sin(angle) * distance) * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparkle.style.animationDuration = `${1.5 + Math.random() * 1}s`;
        
        sparklesContainer.appendChild(sparkle);
    }
}

// Login functionality
function initLogin() {
    const loginScreen = document.getElementById('loginScreen');
    const mainContent = document.getElementById('mainContent');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    const correctPassword = '2602';
    
    if (!loginScreen || !mainContent || !passwordInput) {
        console.error('Login elements not found');
        return;
    }
    
    // Check if already logged in
    if (sessionStorage.getItem('authenticated') === 'true') {
        loginScreen.style.display = 'none';
        mainContent.style.display = 'flex';
        initContent();
        return;
    }
    
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const enteredPassword = passwordInput.value;
            if (enteredPassword === correctPassword) {
                sessionStorage.setItem('authenticated', 'true');
                loginScreen.style.display = 'none';
                mainContent.style.display = 'flex';
                initContent();
            } else {
                if (errorMessage) {
                    errorMessage.textContent = 'Incorrect code. Please try again.';
                    errorMessage.classList.add('show');
                }
                passwordInput.value = '';
                setTimeout(() => {
                    if (errorMessage) {
                        errorMessage.classList.remove('show');
                    }
                }, 3000);
            }
        }
    });
    
    // Only allow numbers
    passwordInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if (errorMessage) {
            errorMessage.classList.remove('show');
        }
    });
}

// Initialize content after login
function initContent() {
    console.log('Initializing content...');
    setTimeout(() => {
        createImageTrain();
        createSparkles();
    }, 100);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    initLogin();
});
