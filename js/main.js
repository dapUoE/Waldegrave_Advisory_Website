document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu with overlay
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (mobileMenuBtn && navOverlay) {
        // Toggle menu when button is clicked
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            nav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when overlay is clicked
        navOverlay.addEventListener('click', function() {
            closeMenu();
        });
        
        // Don't close when clicking inside the menu
        nav.addEventListener('click', function(e) {
            e.stopPropagation(); // Keep the menu open when clicking inside it
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu when nav links are clicked
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Allow the link to work
                setTimeout(closeMenu, 100);
            });
        });
        
        // Helper function to close menu
        function closeMenu() {
            nav.classList.remove('active');
            navOverlay.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.classList.remove('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Handle header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '0.8rem 0';
            header.style.backgroundColor = 'rgba(10, 37, 64, 0.98)';
        } else {
            header.style.padding = '1.2rem 0';
            header.style.backgroundColor = 'rgba(10, 37, 64, 0.95)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Initialize Market Chart in Hero Section
    const marketChartEl = document.getElementById('marketChart');
    if (marketChartEl) {
        const marketChart = new Chart(marketChartEl, {
            type: 'line',
            data: {
                labels: generateDateLabels(30),
                datasets: [
                    {
                        label: 'EUR/USD',
                        data: generateRandomData(30, 1.05, 1.15),
                        borderColor: '#0052cc',
                        backgroundColor: 'rgba(0, 82, 204, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    },
                    {
                        label: 'GBP/USD',
                        data: generateRandomData(30, 1.20, 1.30),
                        borderColor: '#00c2ff',
                        backgroundColor: 'rgba(0, 194, 255, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    },
                    {
                        label: 'Bitcoin',
                        data: generateRandomData(30, 35000, 60000),
                        borderColor: '#daa520',
                        backgroundColor: 'rgba(218, 165, 32, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        hidden: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                                size: 12
                            },
                            boxWidth: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#0a2540',
                        bodyColor: '#333',
                        borderColor: 'rgba(0, 82, 204, 0.1)',
                        borderWidth: 1,
                        titleFont: {
                            family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                            size: 13,
                            weight: 'bold'
                        },
                        bodyFont: {
                            family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                            size: 12
                        },
                        padding: 10,
                        cornerRadius: 4
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            maxRotation: 0,
                            font: {
                                size: 10
                            },
                            maxTicksLimit: 6
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Initialize Insights Chart
    const insightsChartEl = document.getElementById('insightsChart');
    let insightsChart = null;
    
    if (insightsChartEl) {
        // Default chart data (FX)
        insightsChart = createInsightsChart(insightsChartEl, 'fx');
        
        // Chart type buttons
        const chartButtons = document.querySelectorAll('.btn-chart');
        if (chartButtons.length) {
            chartButtons[0].classList.add('active');
            
            chartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const chartType = this.dataset.chart;
                    
                    // Update active button
                    chartButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Update chart
                    insightsChart.destroy();
                    insightsChart = createInsightsChart(insightsChartEl, chartType);
                });
            });
        }
    }
    
    // Create insights chart based on type
    function createInsightsChart(element, type) {
        let data = {};
        let options = {};
        
        switch(type) {
            case 'fx':
                data = {
                    labels: ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD'],
                    datasets: [
                        {
                            label: 'Volatility Index',
                            data: [0.68, 0.72, 0.85, 0.62, 0.58, 0.77, 0.92, 0.88],
                            backgroundColor: 'rgba(0, 82, 204, 0.7)',
                            borderColor: 'rgba(0, 82, 204, 1)',
                            borderWidth: 2
                        },
                        {
                            label: 'Correlation to USD',
                            data: [1, 0.75, 0.68, 0.45, 0.72, 0.88, 0.65, 0.61],
                            backgroundColor: 'rgba(0, 194, 255, 0.7)',
                            borderColor: 'rgba(0, 194, 255, 1)',
                            borderWidth: 2
                        }
                    ]
                };
                options = {
                    type: 'bar'
                };
                break;
                
            case 'commodities':
                data = {
                    labels: generateMonthLabels(12),
                    datasets: [
                        {
                            label: 'Oil (Brent)',
                            data: generateRandomData(12, 70, 95),
                            borderColor: '#d46b08',
                            backgroundColor: 'rgba(212, 107, 8, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Gold',
                            data: generateRandomData(12, 1700, 1950),
                            borderColor: '#daa520',
                            backgroundColor: 'rgba(218, 165, 32, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Copper',
                            data: generateRandomData(12, 3.5, 4.5),
                            borderColor: '#b87333',
                            backgroundColor: 'rgba(184, 115, 51, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        }
                    ]
                };
                options = {
                    type: 'line'
                };
                break;
                
            case 'crypto':
                data = {
                    labels: ['BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOT', 'DOGE'],
                    datasets: [
                        {
                            label: 'Risk Score',
                            data: [8.5, 7.8, 8.2, 7.1, 6.9, 8.0, 7.5, 9.2],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.8)',
                                'rgba(54, 162, 235, 0.8)',
                                'rgba(255, 206, 86, 0.8)',
                                'rgba(75, 192, 192, 0.8)',
                                'rgba(153, 102, 255, 0.8)',
                                'rgba(255, 159, 64, 0.8)',
                                'rgba(199, 199, 199, 0.8)',
                                'rgba(83, 102, 255, 0.8)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(199, 199, 199, 1)',
                                'rgba(83, 102, 255, 1)'
                            ],
                            borderWidth: 2
                        }
                    ]
                };
                options = {
                    type: 'radar'
                };
                break;
        }
        
        return new Chart(element, {
            type: options.type,
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                                size: 12
                            },
                            boxWidth: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#0a2540',
                        bodyColor: '#333',
                        borderColor: 'rgba(0, 82, 204, 0.1)',
                        borderWidth: 1,
                        titleFont: {
                            family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                            size: 13,
                            weight: 'bold'
                        },
                        bodyFont: {
                            family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                            size: 12
                        },
                        padding: 10,
                        cornerRadius: 4
                    }
                },
                scales: options.type !== 'radar' ? {
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    }
                } : {}
            }
        });
    }
    
    // Initialize contact form submission with Google Forms
    const contactForm = document.getElementById('contactForm');
    const hiddenIframe = document.getElementById('hidden_iframe');
    
    if (contactForm && hiddenIframe) {
        // Handle form submission success
        hiddenIframe.onload = function() {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success fade-in';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will be in touch soon.';
            
            // Get the submit button and reset it
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton && submitButton.innerHTML.includes('fa-spinner')) {
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                contactForm.style.display = 'none';
                
                // Reset the form
                contactForm.reset();
                
                // Reset the form after 5 seconds
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    successMessage.remove();
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message';
                }, 5000);
            }
        };
        
        // Submit event
        contactForm.addEventListener('submit', function() {
            // Update button to show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        });
    }
    
    // Add glowing accent elements
    addGlowingAccents();
    
    // Add animation on scroll
    animateOnScroll();
    
    // Add dark mode toggle
    addDarkModeToggle();
    
    // Initialize back to top button
    initBackToTopButton();
    
    // Helper Functions
    function generateRandomData(count, min, max) {
        const data = [];
        let lastValue = Math.random() * (max - min) + min;
        
        for (let i = 0; i < count; i++) {
            // Generate value with trend continuation (smoother data)
            const change = Math.random() * (max - min) * 0.05;
            const upOrDown = Math.random() > 0.5 ? 1 : -1;
            
            lastValue = lastValue + (change * upOrDown);
            
            // Ensure value stays within range
            if (lastValue > max) lastValue = max - Math.random() * (max - min) * 0.1;
            if (lastValue < min) lastValue = min + Math.random() * (max - min) * 0.1;
            
            data.push(lastValue);
        }
        
        return data;
    }
    
    function generateDateLabels(days) {
        const labels = [];
        const today = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            
            // Format: Jun 12, Jul 15, etc.
            const month = date.toLocaleString('en-US', { month: 'short' });
            const day = date.getDate();
            
            labels.push(`${month} ${day}`);
        }
        
        return labels;
    }
    
    function generateMonthLabels(months) {
        const labels = [];
        const today = new Date();
        
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date();
            date.setMonth(today.getMonth() - i);
            
            // Format: Jun 2023, Jul 2023, etc.
            const month = date.toLocaleString('en-US', { month: 'short' });
            const year = date.getFullYear();
            
            labels.push(`${month} ${year}`);
        }
        
        return labels;
    }
    
    function addGlowingAccents() {
        const sections = ['hero', 'about', 'services', 'insights', 'contact'];
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            
            if (element) {
                const accent = document.createElement('div');
                accent.className = 'glow-accent';
                
                // Randomize position
                const top = Math.random() * 100;
                const left = Math.random() * 80;
                
                accent.style.top = `${top}%`;
                accent.style.left = `${left}%`;
                
                element.appendChild(accent);
            }
        });
    }
    
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.section-header, .about-text, .about-visual, .services-intro, .service-card, .insights-text, .insights-visual, .contact-info, .contact-form');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    if (entry.target.classList.contains('section-header')) {
                        entry.target.classList.add('slide-up');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
    
    function addDarkModeToggle() {
        // Create toggle button
        const toggle = document.createElement('div');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        
        document.body.appendChild(toggle);
        
        // Check for saved preference
        const isDarkMode = localStorage.getItem('waldegrave-dark-mode') === 'true';
        
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Toggle event
        toggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Save preference
            localStorage.setItem('waldegrave-dark-mode', isDark);
            
            // Update chart colors if necessary
            if (insightsChart) {
                insightsChart.options.scales.x.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
                insightsChart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
                insightsChart.update();
            }
        });
    }
    
    function initBackToTopButton() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (!backToTopButton) return;
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
});