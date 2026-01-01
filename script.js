// Confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FF91A4', '#FF7F7F', '#FFDAB9', '#E6E6FA'];
    const shapes = ['🧁', '🌸', '💕', '🎊', '🎈', '🎉', '⭐', '💖'];
    
    // Create initial confetti burst
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiContainer, colors, shapes);
        }, i * 50);
    }
    
    // Continuous confetti
    setInterval(() => {
        if (Math.random() > 0.7) {
            createConfettiPiece(confettiContainer, colors, shapes);
        }
    }, 300);
}

function createConfettiPiece(container, colors, shapes) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Randomly choose between emoji or colored square
    if (Math.random() > 0.5) {
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.fontSize = '20px';
        confetti.style.background = 'transparent';
        confetti.style.width = 'auto';
        confetti.style.height = 'auto';
    } else {
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    }
    
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    
    container.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Add sparkle effects on hover
function addSparkleEffects() {
    const giftCards = document.querySelectorAll('.gift-card');
    const themeItems = document.querySelectorAll('.theme-item');
    
    [...giftCards, ...themeItems].forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            createSparkles(e.currentTarget);
        });
    });
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * rect.width + 'px';
        sparkle.style.top = Math.random() * rect.height + 'px';
        sparkle.style.width = '6px';
        sparkle.style.height = '6px';
        sparkle.style.background = '#FFFFFF';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        sparkle.style.zIndex = '100';
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createConfetti();
    addSparkleEffects();
    
    // Add click effects to gift cards
    const giftCards = document.querySelectorAll('.gift-card');
    giftCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
});

// Parallax effect for background
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    const container = document.querySelector('.container');
    if (container) {
        container.style.transform = `translate(${mouseX * 0.1}px, ${mouseY * 0.1}px)`;
    }
});

