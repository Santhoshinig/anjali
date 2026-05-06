document.addEventListener('DOMContentLoaded', () => {
    const giftBox = document.getElementById('giftBox');
    const surpriseContent = document.getElementById('surpriseContent');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isMusicPlaying = false;

    // Gift Box Click Event
    giftBox.addEventListener('click', () => {
        // Hide gift box
        giftBox.classList.add('hidden');

        // Show surprise content
        surpriseContent.classList.remove('hidden');

        // Play music
        bgMusic.play().catch(e => console.log("Audio play failed:", e));

        // Show music toggle button
        musicToggle.classList.remove('hidden');

        // Confetti explosion
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ffb6c1', '#ffd700', '#ffffff', '#e6e6fa']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ffb6c1', '#ffd700', '#ffffff', '#e6e6fa']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Show surprise content
        setTimeout(() => {
            giftBox.style.display = 'none';
            surpriseContent.classList.remove('hidden');
            // Reveal sections below only after gift is opened
            document.getElementById('screen2').classList.remove('hidden');
            document.getElementById('screen3').classList.remove('hidden');
        }, 1500);
    });

    // Toggle Music
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.innerHTML = '<span class="icon">🎵</span>';
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = '<span class="icon">🔇</span>';
        }
    });

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});

// Letter Toggle Function
window.toggleLetter = function () {
    const screen2 = document.getElementById('screen2');
    if (screen2.classList.contains('is-open')) {
        screen2.classList.remove('is-open');
        screen2.classList.add('is-closed');
    } else {
        screen2.classList.remove('is-closed');
        screen2.classList.add('is-open');
    }
};
