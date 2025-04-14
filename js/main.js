document.addEventListener('DOMContentLoaded', function() {
    // Initialize Risk Calculator
    initRiskCalculator();
    // Initialize mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
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
    
    // Initialize contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For this demo, we'll just show a success message
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success fade-in';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will be in touch soon.';
                
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                contactForm.style.display = 'none';
                
                // For demo purposes, reset the form after 5 seconds
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    successMessage.remove();
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Send Message';
                }, 5000);
            }, 2000);
        });
    }
    
    // Add glowing accent elements
    addGlowingAccents();
    
    // Add animation on scroll
    animateOnScroll();
    
    // Add dark mode toggle
    addDarkModeToggle();
    
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
    
    // Risk Calculator Functionality
    function initRiskCalculator() {
        // Get elements
        const calculateBtn = document.getElementById('calculateRisk');
        if (!calculateBtn) return;
        
        // Range input value display updates
        const rangeInputs = document.querySelectorAll('.range-input');
        rangeInputs.forEach(input => {
            const valueDisplay = document.getElementById(`${input.id}Value`);
            if (valueDisplay) {
                // Set initial value
                valueDisplay.textContent = input.value;
                
                // Update on change
                input.addEventListener('input', function() {
                    valueDisplay.textContent = this.value;
                });
            }
        });
        
        // Calculate button click event
        calculateBtn.addEventListener('click', function() {
            // Get input values
            const industry = document.getElementById('industry').value;
            const fxExposure = parseInt(document.getElementById('fxExposure').value);
            const commodityExposure = parseInt(document.getElementById('commodityExposure').value);
            const cryptoExposure = parseInt(document.getElementById('cryptoExposure').value);
            const hedgingMaturity = parseInt(document.getElementById('hedgingMaturity').value);
            
            // Calculate risk scores
            const fxRisk = calculateRiskScore(fxExposure, industry, 'fx');
            const commodityRisk = calculateRiskScore(commodityExposure, industry, 'commodity');
            const cryptoRisk = calculateRiskScore(cryptoExposure, industry, 'crypto');
            const hedgingGap = calculateHedgingGap(hedgingMaturity, fxExposure, commodityExposure, cryptoExposure);
            
            // Calculate overall risk
            const overallRisk = calculateOverallRisk(fxRisk, commodityRisk, cryptoRisk, hedgingGap);
            
            // Update UI
            updateRiskUI(fxRisk, commodityRisk, cryptoRisk, hedgingGap, overallRisk, industry);
        });
    }
    
    function calculateRiskScore(exposure, industry, type) {
        // Base risk is the exposure level
        let riskScore = exposure;
        
        // Industry risk factors (simplified for demo)
        const industryFactors = {
            'manufacturing': { fx: 1.3, commodity: 1.5, crypto: 0.7 },
            'retail': { fx: 1.2, commodity: 1.2, crypto: 0.8 },
            'financial': { fx: 1.4, commodity: 1.0, crypto: 1.5 },
            'tech': { fx: 1.1, commodity: 0.8, crypto: 1.7 },
            'energy': { fx: 1.0, commodity: 1.8, crypto: 0.6 },
            'healthcare': { fx: 0.9, commodity: 0.7, crypto: 0.5 },
            'other': { fx: 1.0, commodity: 1.0, crypto: 1.0 }
        };
        
        // Apply industry factor if available
        if (industry && industryFactors[industry]) {
            const factor = industryFactors[industry][type] || 1;
            riskScore = riskScore * factor;
        }
        
        // Cap at 10
        return Math.min(Math.round(riskScore * 10) / 10, 10);
    }
    
    function calculateHedgingGap(maturity, fxExposure, commodityExposure, cryptoExposure) {
        // Calculate average exposure
        const totalExposure = fxExposure + commodityExposure + cryptoExposure;
        const avgExposure = totalExposure / 3;
        
        // Higher exposure with lower maturity = larger gap
        const hedgingGap = avgExposure * (1 - maturity / 10);
        
        return Math.min(Math.round(hedgingGap * 10) / 10, 10);
    }
    
    function calculateOverallRisk(fxRisk, commodityRisk, cryptoRisk, hedgingGap) {
        // Weighted formula
        const weightedRisk = (fxRisk * 0.35) + (commodityRisk * 0.25) + (cryptoRisk * 0.15) + (hedgingGap * 0.25);
        return Math.min(Math.round(weightedRisk * 10) / 10, 10);
    }
    
    function updateRiskUI(fxRisk, commodityRisk, cryptoRisk, hedgingGap, overallRisk, industry) {
        // Update risk meter
        const riskMeterFill = document.getElementById('riskMeterFill');
        const fillPercentage = (overallRisk / 10) * 100;
        riskMeterFill.style.width = `${fillPercentage}%`;
        
        // Update risk level text
        const riskLevel = document.getElementById('riskLevel');
        let riskText = 'Moderate Risk';
        
        if (overallRisk < 3) {
            riskText = 'Low Risk';
        } else if (overallRisk < 5) {
            riskText = 'Moderate-Low Risk';
        } else if (overallRisk < 7) {
            riskText = 'Moderate Risk';
        } else if (overallRisk < 8.5) {
            riskText = 'Elevated Risk';
        } else {
            riskText = 'High Risk';
        }
        
        riskLevel.textContent = riskText;
        
        // Update risk breakdown bars
        document.getElementById('fxRiskBar').style.width = `${(fxRisk / 10) * 100}%`;
        document.getElementById('commodityRiskBar').style.width = `${(commodityRisk / 10) * 100}%`;
        document.getElementById('cryptoRiskBar').style.width = `${(cryptoRisk / 10) * 100}%`;
        document.getElementById('hedgingGapBar').style.width = `${(hedgingGap / 10) * 100}%`;
        
        // Generate recommendation
        const recommendation = document.getElementById('riskRecommendation');
        let recommendationText = '';
        
        // Highest risk factor
        const riskFactors = [
            { name: 'FX', value: fxRisk },
            { name: 'commodity', value: commodityRisk },
            { name: 'cryptocurrency', value: cryptoRisk },
            { name: 'hedging strategy', value: hedgingGap }
        ];
        
        riskFactors.sort((a, b) => b.value - a.value);
        const highestRisk = riskFactors[0];
        
        if (highestRisk.value > 7) {
            recommendationText = `<h4>Recommendation</h4>
            <p>Based on your inputs, we recommend scheduling a priority consultation with our ${highestRisk.name} risk specialists. Your exposure in this area requires immediate attention and a comprehensive risk management strategy.</p>`;
        } else if (highestRisk.value > 5) {
            recommendationText = `<h4>Recommendation</h4>
            <p>Based on your inputs, your ${highestRisk.name} risk exposure indicates an opportunity to strengthen your risk management approach. We recommend a consultation with our specialists to review and enhance your current strategy.</p>`;
        } else {
            recommendationText = `<h4>Recommendation</h4>
            <p>Based on your profile, your risk management strategy appears to be effective. We recommend a periodic review to ensure continued alignment with market conditions and your business objectives.</p>`;
        }
        
        recommendation.innerHTML = recommendationText;
        
        // Animate in results
        document.getElementById('riskResults').classList.add('fade-in');
        
        // Scroll to results if on mobile
        if (window.innerWidth < 992) {
            document.getElementById('riskResults').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
});