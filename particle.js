const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

// Particle constructor
function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1; // Random size between 1 and 5
    this.speedX = Math.random() * 4 - 2; // Random horizontal speed (-2 to 2)
    this.speedY = Math.random() * 4 - 2; // Random vertical speed (-2 to 2)
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
    this.opacity = 1; // Full opacity at first

    // Update particle position and fade effect
    this.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01; // Fade out over time

        // Remove particle when it is faded out
        if (this.opacity <= 0) {
            return false;
        }
        return true;
    };

    // Draw the particle
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity; // Apply fading effect
        ctx.fill();
    };
}

// Generate particles when the mouse moves or clicks
canvas.addEventListener('mousemove', (e) => {
    generateParticles(e.x, e.y);
});

canvas.addEventListener('click', (e) => {
    generateParticles(e.x, e.y);
});

// Function to generate particles at a given location
function generateParticles(x, y) {
    const numParticles = 10; // Number of particles to generate per event
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y));
    }
}

// Update and draw particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Update and draw each particle
    particles.forEach((particle, index) => {
        if (!particle.update()) {
            particles.splice(index, 1); // Remove particle when it's faded out
        } else {
            particle.draw();
        }
    });

    requestAnimationFrame(animateParticles); // Keep animating the particles
}

// Start the animation loop
animateParticles();