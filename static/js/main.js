// Main JavaScript file for mental health app

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lottie animations if present
    if (typeof lottie !== 'undefined') {
        const animationContainers = document.querySelectorAll('.lottie-container');
        animationContainers.forEach(container => {
            const animationPath = container.dataset.animation;
            if (animationPath) {
                lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: animationPath
                });
            }
        });
    }

    // Initialize particles.js if present
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#667eea' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#667eea', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out' }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    // Theme switching functionality
    const themeSelector = document.getElementById('theme-selector');
    if (themeSelector) {
        themeSelector.addEventListener('change', function() {
            const selectedTheme = this.value;
            document.body.className = document.body.className.replace(/theme-\w+/g, '');
            if (selectedTheme !== 'default') {
                document.body.classList.add(`theme-${selectedTheme}`);
            }
            localStorage.setItem('selectedTheme', selectedTheme);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            themeSelector.value = savedTheme;
            if (savedTheme !== 'default') {
                document.body.classList.add(`theme-${savedTheme}`);
            }
        }
    }

    // Draggable cards functionality
    const draggableCards = document.querySelectorAll('.draggable-card');
    draggableCards.forEach(card => {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        card.addEventListener('mousedown', startDrag);
        card.addEventListener('touchstart', startDrag, { passive: false });

        function startDrag(e) {
            isDragging = true;
            card.classList.add('dragging');

            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            } else {
                startX = e.clientX;
                startY = e.clientY;
            }

            initialX = card.offsetLeft;
            initialY = card.offsetTop;

            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        }

        function drag(e) {
            if (!isDragging) return;

            e.preventDefault();
            let currentX, currentY;

            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            } else {
                currentX = e.clientX;
                currentY = e.clientY;
            }

            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            card.style.left = initialX + deltaX + 'px';
            card.style.top = initialY + deltaY + 'px';
            card.style.position = 'absolute';
        }

        function stopDrag() {
            isDragging = false;
            card.classList.remove('dragging');
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
        }
    });

    // FAB (Floating Action Button) functionality
    const fab = document.querySelector('.fab');
    if (fab) {
        fab.addEventListener('click', function() {
            this.classList.toggle('active');
        });

        // Close FAB menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!fab.contains(e.target)) {
                fab.classList.remove('active');
            }
        });
    }

    // Voice guide functionality
    const voiceGuideBtn = document.getElementById('voice-guide-btn');
    if (voiceGuideBtn && 'speechSynthesis' in window) {
        voiceGuideBtn.addEventListener('click', function() {
            const mascotMessage = document.querySelector('.mascot-message');
            if (mascotMessage) {
                const utterance = new SpeechSynthesisUtterance(mascotMessage.textContent);
                speechSynthesis.speak(utterance);
            }
        });
    }

    // Radial charts (doughnut charts) for dashboard
    if (typeof Chart !== 'undefined') {
        // PHQ-9 Radial Chart
        const phq9ChartCanvas = document.getElementById('phq9-radial-chart');
        if (phq9ChartCanvas) {
            const phq9Score = parseInt(phq9ChartCanvas.dataset.score) || 0;
            new Chart(phq9ChartCanvas, {
                type: 'doughnut',
                data: {
                    labels: ['Score', 'Remaining'],
                    datasets: [{
                        data: [phq9Score, 27 - phq9Score],
                        backgroundColor: ['#3B82F6', '#E5E7EB'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });
        }

        // GAD-7 Radial Chart
        const gad7ChartCanvas = document.getElementById('gad7-radial-chart');
        if (gad7ChartCanvas) {
            const gad7Score = parseInt(gad7ChartCanvas.dataset.score) || 0;
            new Chart(gad7ChartCanvas, {
                type: 'doughnut',
                data: {
                    labels: ['Score', 'Remaining'],
                    datasets: [{
                        data: [gad7Score, 21 - gad7Score],
                        backgroundColor: ['#10B981', '#E5E7EB'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });
        }
    }

    // Parallax effects
    let parallaxElements = document.querySelectorAll('.parallax-element');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(element => {
                const rate = element.dataset.parallax || 0.5;
                element.style.transform = `translateY(${scrolled * rate}px)`;
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation enhancements
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Add loading states to buttons
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
            this.disabled = true;
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.glassmorphism, .advanced-glassmorphism');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Chatbot functionality
    initializeChatbot();

    // Floating chatbot icon functionality
    const chatbotIcon = document.getElementById('chatbot-icon');
    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', function() {
            const chatbotContainer = document.getElementById('chatbot-container');
            if (chatbotContainer) {
                chatbotContainer.scrollIntoView({ behavior: 'smooth' });
                // Add a highlight effect
                chatbotContainer.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
                setTimeout(() => {
                    chatbotContainer.style.boxShadow = '';
                }, 2000);
            }
        });
    }
});

function initializeChatbot() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatWindow = document.getElementById('chat-window');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const quickTopics = document.querySelectorAll('.quick-topic');

    if (!chatInput || !sendButton || !chatWindow) return;

    let conversationState = 'greeting';
    let userName = '';

    // Chatbot responses database
    const responses = {
        greeting: {
            messages: [
                "Hello! I'm here to support you on your mental health journey. How are you feeling today?",
                "Hi there! I'm your mental health support assistant. What's on your mind today?"
            ],
            followUp: ['good', 'bad', 'anxious', 'depressed', 'stressed', 'okay']
        },
        good: {
            messages: [
                "That's great to hear! It's wonderful that you're taking time to check in with yourself. What would you like to talk about?",
                "Excellent! Maintaining good mental health is so important. Is there anything specific you'd like to discuss?"
            ],
            followUp: ['assessment', 'resources', 'coping', 'general']
        },
        bad: {
            messages: [
                "I'm sorry to hear you're not feeling well. Remember, it's okay to have difficult days. Would you like to talk about what's bothering you?",
                "I understand that things can be tough sometimes. You're not alone in this. What would help you feel better right now?"
            ],
            followUp: ['talk', 'assessment', 'resources', 'emergency']
        },
        anxious: {
            messages: [
                "Anxiety can be really challenging. Try taking slow, deep breaths - inhale for 4 counts, hold for 4, exhale for 4. Would you like some coping strategies?",
                "I hear you. Anxiety often feels overwhelming, but there are techniques that can help. Let's explore some options together."
            ],
            followUp: ['coping', 'breathing', 'assessment', 'resources']
        },
        depressed: {
            messages: [
                "Depression can make everything feel heavy. Remember that your feelings are valid, and it's brave of you to reach out. Small steps can make a difference.",
                "I'm here for you. Depression doesn't define you, and there are many paths to feeling better. What has been most difficult lately?"
            ],
            followUp: ['talk', 'assessment', 'resources', 'support']
        },
        stressed: {
            messages: [
                "Stress can build up quickly. Let's work on some immediate relief techniques. Have you tried progressive muscle relaxation?",
                "I understand stress can feel overwhelming. Let's break this down - what seems most stressful right now?"
            ],
            followUp: ['relaxation', 'time_management', 'assessment', 'resources']
        },
        okay: {
            messages: [
                "Sometimes 'okay' is a good place to be! It's great that you're checking in. Would you like to explore some wellness tips?",
                "'Okay' is valid too. How can I support you today?"
            ],
            followUp: ['wellness', 'assessment', 'resources', 'general']
        },
        coping: {
            messages: [
                "Here are some coping strategies:\n\n1. Deep breathing: 4-7-8 technique\n2. Grounding: 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste\n3. Progressive muscle relaxation\n4. Journaling your thoughts\n5. Physical activity\n\nWhich one would you like to learn more about?",
                "Coping skills are like tools in your toolbox. Let's build yours:\n\n• Breathing exercises for immediate calm\n• Mindfulness meditation\n• Cognitive reframing\n• Social support\n• Healthy routines\n\nWhat interests you most?"
            ],
            followUp: ['breathing', 'mindfulness', 'reframing', 'routines']
        },
        resources: {
            messages: [
                "There are many helpful resources available:\n\n• National Alliance on Mental Illness (NAMI)\n• Mental Health America\n• Crisis Text Line: Text HOME to 741741\n• Substance Abuse and Mental Health Services Administration (SAMHSA)\n• Local mental health clinics\n\nWould you like information on any of these?",
                "You're taking a positive step by seeking resources. Here are some trusted options:\n\n• Hotlines: 988 Suicide & Crisis Lifeline\n• Apps: Headspace, Calm, Insight Timer\n• Books: 'The Body Keeps the Score', 'Feeling Good'\n• Online communities (with caution)\n\nWhat type of resource are you looking for?"
            ],
            followUp: ['hotlines', 'apps', 'books', 'professional']
        },
        emergency: {
            messages: [
                "If you're in immediate danger or having thoughts of self-harm, please call emergency services (911) or go to your nearest emergency room. You're not alone, and help is available 24/7.",
                "For immediate crisis support:\n\n• Call 988 (Suicide & Crisis Lifeline)\n• Text HOME to 741741 (Crisis Text Line)\n• Go to emergency room if in immediate danger\n\nPlease reach out for help right now. You matter."
            ],
            followUp: ['support', 'resources']
        },
        assessment: {
            messages: [
                "Taking assessments can provide valuable insights. We have PHQ-9 for depression and GAD-7 for anxiety. These are standardized tools used by mental health professionals.",
                "Self-assessments can help you understand your symptoms better. They're not diagnostic but can guide conversations with healthcare providers. Would you like to take one?"
            ],
            followUp: ['phq9', 'gad7', 'professional']
        },
        breathing: {
            messages: [
                "Let's try the 4-7-8 breathing technique:\n\n1. Inhale quietly through your nose for 4 seconds\n2. Hold your breath for 7 seconds\n3. Exhale completely through your mouth for 8 seconds\n\nRepeat 4 times. This activates your parasympathetic nervous system for calm.",
                "Box breathing is another great technique:\n\n1. Inhale for 4 counts\n2. Hold for 4 counts\n3. Exhale for 4 counts\n4. Hold for 4 counts\n\nThis creates a 'box' pattern. Very effective for anxiety."
            ],
            followUp: ['practice', 'more_techniques', 'coping']
        },
        mindfulness: {
            messages: [
                "Mindfulness is about being present in the moment without judgment. Try this simple exercise:\n\n1. Sit comfortably\n2. Focus on your breath\n3. When your mind wanders, gently bring it back\n4. Start with 5 minutes daily\n\nIt gets easier with practice!",
                "A quick mindfulness exercise: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. This grounds you in the present moment."
            ],
            followUp: ['practice', 'apps', 'coping']
        },
        support: {
            messages: [
                "Seeking support is a sign of strength, not weakness. You don't have to face challenges alone. Consider talking to trusted friends, family, or mental health professionals.",
                "Support can come in many forms:\n\n• Trusted friends and family\n• Mental health professionals\n• Support groups\n• Online communities\n• Helplines\n\nWhat kind of support are you looking for?"
            ],
            followUp: ['professional', 'friends', 'groups', 'resources']
        },
        default: {
            messages: [
                "I'm here to listen and support you. Could you tell me more about what's on your mind?",
                "Thank you for sharing that with me. How can I best support you right now?"
            ],
            followUp: ['talk', 'resources', 'coping', 'assessment']
        }
    };

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';

        if (message.includes('\n')) {
            const lines = message.split('\n');
            lines.forEach(line => {
                if (line.trim()) {
                    const p = document.createElement('p');
                    p.textContent = line;
                    bubbleDiv.appendChild(p);
                } else {
                    bubbleDiv.appendChild(document.createElement('br'));
                }
            });
        } else {
            bubbleDiv.textContent = message;
        }

        messageDiv.appendChild(bubbleDiv);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function showTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'chat-message bot-message';
        indicatorDiv.id = 'typing-indicator';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';

        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        bubbleDiv.appendChild(typingDiv);

        indicatorDiv.appendChild(bubbleDiv);
        chatWindow.appendChild(indicatorDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function getBotResponse(userInput) {
        const input = userInput.toLowerCase().trim();

        // Check for specific keywords
        if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
            return 'greeting';
        }
        if (input.includes('good') || input.includes('great') || input.includes('fine') || input.includes('well')) {
            return 'good';
        }
        if (input.includes('bad') || input.includes('terrible') || input.includes('awful') || input.includes('horrible')) {
            return 'bad';
        }
        if (input.includes('anxious') || input.includes('anxiety') || input.includes('nervous') || input.includes('worried')) {
            return 'anxious';
        }
        if (input.includes('depressed') || input.includes('depression') || input.includes('sad') || input.includes('down')) {
            return 'depressed';
        }
        if (input.includes('stress') || input.includes('stressed') || input.includes('overwhelmed')) {
            return 'stressed';
        }
        if (input.includes('okay') || input.includes('alright') || input.includes('so-so')) {
            return 'okay';
        }
        if (input.includes('coping') || input.includes('cope') || input.includes('strategy') || input.includes('techniques')) {
            return 'coping';
        }
        if (input.includes('resource') || input.includes('help') || input.includes('support')) {
            return 'resources';
        }
        if (input.includes('emergency') || input.includes('crisis') || input.includes('urgent')) {
            return 'emergency';
        }
        if (input.includes('assessment') || input.includes('test') || input.includes('quiz')) {
            return 'assessment';
        }
        if (input.includes('breathe') || input.includes('breathing')) {
            return 'breathing';
        }
        if (input.includes('mindful') || input.includes('meditation') || input.includes('present')) {
            return 'mindfulness';
        }

        // Default response
        return 'default';
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, true);
        chatInput.value = '';

        showTypingIndicator();

        setTimeout(() => {
            hideTypingIndicator();
            const responseKey = getBotResponse(message);
            const responseData = responses[responseKey] || responses.default;
            const randomMessage = responseData.messages[Math.floor(Math.random() * responseData.messages.length)];
            addMessage(randomMessage);

            conversationState = responseKey;
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Chatbot toggle
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('chatbot-minimized');
            const icon = this.querySelector('i');
            if (chatbotContainer.classList.contains('chatbot-minimized')) {
                icon.className = 'fas fa-plus';
            } else {
                icon.className = 'fas fa-minus';
            }
        });
    }

    // Quick topic clicks
    quickTopics.forEach(topic => {
        topic.addEventListener('click', function() {
            const topicType = this.dataset.topic;
            let message = '';

            switch (topicType) {
                case 'coping':
                    message = 'I need coping strategies';
                    break;
                case 'resources':
                    message = 'What resources are available?';
                    break;
                case 'emergency':
                    message = 'I need emergency help';
                    break;
            }

            if (message) {
                chatInput.value = message;
                sendMessage();
            }
        });
    });
}
