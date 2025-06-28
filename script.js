document.addEventListener('DOMContentLoaded', function() {
    // Music player functionality with Boulevard of Broken Dreams theme
    const playButton = document.getElementById('play-music');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;

    // Set volume to a reasonable level
    backgroundMusic.volume = 0.7;

    // Attempt to autoplay the music when page loads
    async function attemptAutoplay() {
        try {
            // First check if the audio can load
            await new Promise((resolve, reject) => {
                backgroundMusic.addEventListener('canplaythrough', resolve, { once: true });
                backgroundMusic.addEventListener('error', reject, { once: true });
                backgroundMusic.load(); // Force reload of audio sources
            });

            await backgroundMusic.play();
            isPlaying = true;
            updatePlayButtonState(true);
            startMusicEffects();
            console.log('Autoplay successful - Boulevard of Broken Dreams is now playing!');
        } catch (error) {
            console.log('Autoplay blocked or audio error:', error.message);
            isPlaying = false;
            updatePlayButtonState(false);
            // Add a subtle pulse to the button to indicate it's ready to play
            playButton.style.animation = 'buttonPulse 2s ease-in-out infinite';
            
            // Show user-friendly message
            if (error.name === 'NotAllowedError') {
                playButton.innerHTML = '🎵 Click to Play Boulevard of Broken Dreams';
            } else {
                playButton.innerHTML = '🎵 Ready to Rock - Click to Play';
            }
        }
    }

    // Update play button appearance and text
    function updatePlayButtonState(playing) {
        if (playing) {
            playButton.innerHTML = '⏸️ Now Playing: Boulevard of Broken Dreams';
            playButton.style.background = 'linear-gradient(45deg, #32cd32, #228b22)';
            playButton.style.boxShadow = '0 8px 25px rgba(50, 205, 50, 0.6)';
            playButton.style.animation = 'none';
        } else {
            playButton.innerHTML = '▶️ Play Boulevard of Broken Dreams';
            playButton.style.background = 'linear-gradient(45deg, #ff4500, #ff6347)';
            playButton.style.boxShadow = '0 6px 20px rgba(255, 69, 0, 0.4)';
        }
    }

    // Start all music-related visual effects
    function startMusicEffects() {
        document.body.classList.add('music-playing');
        
        const heroTitle = document.querySelector('.hero-title');
        heroTitle.style.animation = 'glow 1s ease-in-out infinite alternate, boulevardPulse 3s ease-in-out infinite';
        
        createMusicalNotes();
        startBrokenDreamsEffect();
    }

    // Stop all music-related visual effects
    function stopMusicEffects() {
        document.body.classList.remove('music-playing');
        
        const heroTitle = document.querySelector('.hero-title');
        heroTitle.style.animation = 'glow 3s ease-in-out infinite alternate';
        
        stopBrokenDreamsEffect();
    }

    // Handle play button clicks
    playButton.addEventListener('click', async function() {
        try {
            if (!isPlaying) {
                // Try to load the audio first
                if (backgroundMusic.readyState < 2) {
                    playButton.innerHTML = '⏳ Loading...';
                    await new Promise((resolve, reject) => {
                        backgroundMusic.addEventListener('canplaythrough', resolve, { once: true });
                        backgroundMusic.addEventListener('error', reject, { once: true });
                        backgroundMusic.load();
                    });
                }
                
                await backgroundMusic.play();
                isPlaying = true;
                updatePlayButtonState(true);
                startMusicEffects();
            } else {
                backgroundMusic.pause();
                isPlaying = false;
                updatePlayButtonState(false);
                stopMusicEffects();
            }
        } catch (error) {
            console.error('Error controlling audio playback:', error);
            // Fallback for any audio errors
            playButton.innerHTML = '❌ Audio Error - Check Console';
            playButton.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
            
            // Try alternative approach
            setTimeout(() => {
                playButton.innerHTML = '🔄 Try Again';
                playButton.style.background = 'linear-gradient(45deg, #ff4500, #ff6347)';
            }, 2000);
        }
    });

    // Listen for audio events to sync button state
    backgroundMusic.addEventListener('loadstart', function() {
        console.log('Audio loading started...');
    });

    backgroundMusic.addEventListener('canplay', function() {
        console.log('Audio can start playing');
    });

    backgroundMusic.addEventListener('play', function() {
        isPlaying = true;
        updatePlayButtonState(true);
        startMusicEffects();
    });

    backgroundMusic.addEventListener('pause', function() {
        isPlaying = false;
        updatePlayButtonState(false);
        stopMusicEffects();
    });

    backgroundMusic.addEventListener('ended', function() {
        isPlaying = false;
        updatePlayButtonState(false);
        stopMusicEffects();
    });

    backgroundMusic.addEventListener('error', function(e) {
        console.error('Audio error:', e);
        playButton.innerHTML = '❌ Audio File Error';
        playButton.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
    });

    // Attempt autoplay after a short delay to ensure DOM is ready
    setTimeout(attemptAutoplay, 1000);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Create musical notes animation
    function createMusicalNotes() {
        const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];
        
        const noteInterval = setInterval(() => {
            if (isPlaying) {
                const note = document.createElement('div');
                note.textContent = notes[Math.floor(Math.random() * notes.length)];
                note.className = 'musical-note';
                note.style.cssText = `
                    position: fixed;
                    font-size: ${Math.random() * 20 + 20}px;
                    color: rgba(255, 215, 0, 0.8);
                    pointer-events: none;
                    z-index: 100;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    animation: floatNote 4s linear forwards;
                `;
                
                document.body.appendChild(note);
                
                setTimeout(() => {
                    note.remove();
                }, 4000);
            } else {
                clearInterval(noteInterval);
            }
        }, 800);
    }

    // Broken Dreams visual effect
    function startBrokenDreamsEffect() {
        const brokenDreamsInterval = setInterval(() => {
            if (isPlaying) {
                createBrokenDreamFragment();
            } else {
                clearInterval(brokenDreamsInterval);
            }
        }, 1500);
    }

    function createBrokenDreamFragment() {
        const fragment = document.createElement('div');
        fragment.className = 'broken-dream';
        fragment.style.cssText = `
            position: fixed;
            width: ${Math.random() * 30 + 10}px;
            height: ${Math.random() * 30 + 10}px;
            background: linear-gradient(45deg, rgba(255, 69, 0, 0.6), rgba(255, 215, 0, 0.4));
            border-radius: 50%;
            pointer-events: none;
            z-index: 50;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: shatter 3s ease-out forwards;
        `;
        
        document.body.appendChild(fragment);
        
        setTimeout(() => {
            fragment.remove();
        }, 3000);
    }

    function stopBrokenDreamsEffect() {
        // Remove any existing broken dream fragments
        const fragments = document.querySelectorAll('.broken-dream');
        fragments.forEach(fragment => fragment.remove());
    }

    // Add scroll animations with punk rock flair
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotate(0deg)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.band-member, .album-card, .timeline-item, .legacy-stat');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = `translateY(50px) rotate(${Math.random() * 4 - 2}deg)`;
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add punk rock hover effects
    const interactiveElements = document.querySelectorAll('.album-card, .band-member, .timeline-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) saturate(1.3)';
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic punk rock background effects
    function createPunkRockElements() {
        const container = document.body;
        const element = document.createElement('div');
        element.className = 'punk-element';
        
        const shapes = ['●', '▲', '■', '♦', '★'];
        const colors = ['rgba(255, 69, 0, 0.6)', 'rgba(255, 215, 0, 0.6)', 'rgba(50, 205, 50, 0.6)'];
        
        element.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        element.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 10}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: punkFloat 12s linear infinite;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        container.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 12000);
    }

    // Add punk elements periodically
    setInterval(createPunkRockElements, 3000);

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatNote {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes shatter {
            0% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.5) rotate(180deg);
                opacity: 0.7;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes punkFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes boulevardPulse {
            0%, 100% { 
                transform: scale(1);
                filter: hue-rotate(0deg);
            }
            50% { 
                transform: scale(1.05);
                filter: hue-rotate(30deg);
            }
        }
        
        @keyframes buttonPulse {
            0%, 100% { 
                transform: scale(1);
                box-shadow: 0 6px 20px rgba(255, 69, 0, 0.4);
            }
            50% { 
                transform: scale(1.05);
                box-shadow: 0 8px 25px rgba(255, 69, 0, 0.8);
            }
        }
        
        .music-playing .background-overlay::before {
            animation: pulse 1s ease-in-out infinite alternate, musicPulse 2s ease-in-out infinite;
        }
        
        @keyframes musicPulse {
            0%, 100% { 
                background-size: 100% 100%; 
                filter: hue-rotate(0deg);
            }
            50% { 
                background-size: 110% 110%; 
                filter: hue-rotate(60deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Add click effects to buttons with punk rock flair
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: punkRipple 0.8s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 800);
        });
    });

    // Add punk ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes punkRipple {
            to {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Add typing effect to quotes
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Trigger typing effect when quotes come into view
    const quotes = document.querySelectorAll('.hero-quote blockquote, .member-quote');
    const quoteObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                const originalText = entry.target.textContent;
                typeWriter(entry.target, originalText, 30);
                entry.target.classList.add('typed');
            }
        });
    }, { threshold: 0.5 });

    quotes.forEach(quote => {
        quoteObserver.observe(quote);
    });
});