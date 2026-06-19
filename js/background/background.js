"use strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 25 + 15;
        this.speed = Math.random() * 3 + 1.5;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.sway = Math.random() * 2 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.hue = Math.random() * 30 + 330; // розово-красные тона
    }

    update() {
        this.y -= this.speed;
        this.angle += 0.02;
        this.x += Math.sin(this.angle) * this.sway * 0.8;

        if (this.y < canvas.height * 0.3) {
            this.opacity = Math.max(0, this.opacity - 0.008);
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
        ctx.shadowBlur = 15;

        ctx.fillStyle = `hsl(${this.hue}, 100%, 75%)`;
        ctx.fillText('♥', this.x, this.y);
        ctx.restore();
    }

    isOffScreen() {
        return this.y + this.size < 0 || this.opacity <= 0;
    }
}

const hearts = [];
const maxHearts = 80;

function initHearts() {
    hearts.length = 0;
    for (let i = 0; i < maxHearts; i++) {
        const heart = new Heart();
        heart.y = Math.random() * canvas.height;
        hearts.push(heart);
    }
}

function animate() {
    ctx.fillStyle = 'rgba(26, 0, 51, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = hearts.length - 1; i >= 0; i--) {
        const heart = hearts[i];
        heart.update();
        heart.draw();

        if (heart.isOffScreen()) {
            hearts.splice(i, 1);
        }
    }

    if (hearts.length < maxHearts && Math.random() < 0.4) {
        hearts.push(new Heart());
    }

    requestAnimationFrame(animate);
}

initHearts();
animate();

window.addEventListener('resize', () => {
    resizeCanvas();
    initHearts();
});