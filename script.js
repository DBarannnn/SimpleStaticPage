// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    // Handle navigation
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            // Show target page
            document.getElementById(`page-${targetPage}`).classList.add('active');
        });
    });

    // Real-time clock functionality
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('uk-UA', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const timeDisplay = document.querySelector('.current-time');
        if (timeDisplay) {
            timeDisplay.textContent = timeString;
        }
        
        // Calculate time until end of current class period
        updateTimeUntilEndOfClass(now);
    }

    function updateTimeUntilEndOfClass(now) {
        const classPeriods = [
            { start: '08:30', end: '09:50' },
            { start: '10:05', end: '11:25' },
            { start: '11:40', end: '13:00' },
            { start: '13:15', end: '14:35' },
            { start: '14:50', end: '16:10' },
            { start: '16:25', end: '17:45' },
            { start: '18:00', end: '19:20' },
            { start: '19:30', end: '20:50' }
        ];

        const currentTime = now.getHours() * 60 + now.getMinutes();
        const subtitle = document.querySelector('.time-subtitle');
        
        let found = false;
        for (let period of classPeriods) {
            const [startHour, startMin] = period.start.split(':').map(Number);
            const [endHour, endMin] = period.end.split(':').map(Number);
            const startTime = startHour * 60 + startMin;
            const endTime = endHour * 60 + endMin;
            
            if (currentTime >= startTime && currentTime <= endTime) {
                const minutesLeft = endTime - currentTime;
                if (subtitle) {
                    subtitle.textContent = `До кінця пари ${minutesLeft} хв`;
                }
                found = true;
                break;
            }
        }
        
        if (!found && subtitle) {
            subtitle.textContent = 'Зараз немає пар';
        }
    }

    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);

    // Add some interactive effects
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(107, 115, 255, 0.1)';
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });

    // Schedule page functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const actionButtons = document.querySelectorAll('.action-btn');

    // Filter button interactions
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add pulse effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Here you could add actual filtering logic
            console.log('Filter clicked:', this.textContent);
        });
    });

    // Action button functionality for week switching
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all action buttons
            actionButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Switch between numerator and denominator schedules
            const weekType = this.getAttribute('data-week');
            const numeratorSchedule = document.getElementById('numerator-schedule');
            const denominatorSchedule = document.getElementById('denominator-schedule');
            
            if (weekType === 'numerator') {
                numeratorSchedule.style.display = 'flex';
                denominatorSchedule.style.display = 'none';
                console.log('Switched to numerator schedule');
            } else if (weekType === 'denominator') {
                numeratorSchedule.style.display = 'none';
                denominatorSchedule.style.display = 'flex';
                console.log('Switched to denominator schedule');
            }
        });
    });

    // Add highlighting for current class period
    function highlightCurrentClass() {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const classItems = document.querySelectorAll('.class-item');
        
        classItems.forEach(item => {
            const timeStart = item.querySelector('.time-start').textContent;
            const timeEnd = item.querySelector('.time-end').textContent;
            
            const [startHour, startMin] = timeStart.split(':').map(Number);
            const [endHour, endMin] = timeEnd.split(':').map(Number);
            const startTime = startHour * 60 + startMin;
            const endTime = endHour * 60 + endMin;
            
            if (currentTime >= startTime && currentTime <= endTime) {
                item.style.borderLeft = '4px solid #00ff88';
                item.style.background = 'linear-gradient(90deg, rgba(0, 255, 136, 0.1) 0%, rgba(255, 255, 255, 1) 100%)';
            }
        });
    }

    // Highlight current class every minute
    highlightCurrentClass();
    setInterval(highlightCurrentClass, 60000);

    // Services page functionality
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceLinks = document.querySelectorAll('.service-link');

    // Service card interactions
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation to other cards
            serviceCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            // Reset all cards
            serviceCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });

    // Service link click tracking
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Log click for analytics (optional)
            console.log('Service link clicked:', this.href);
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(107, 115, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS animation for ripple effect
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add staggered entrance animation for service cards
    function animateServiceCards() {
        const cards = document.querySelectorAll('#page-services .service-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Trigger animation when services page is shown
    const servicesNavBtn = document.querySelector('[data-page="services"]');
    if (servicesNavBtn) {
        servicesNavBtn.addEventListener('click', function() {
            setTimeout(animateServiceCards, 100);
        });
    }

    // Links page functionality
    const linkSections = document.querySelectorAll('.links-section');
    const resourceLinks = document.querySelectorAll('.resource-link');
    const quickLinks = document.querySelectorAll('.quick-link');

    // Links section animations
    linkSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 8px 25px rgba(107, 115, 255, 0.15)';
        });

        section.addEventListener('mouseleave', function() {
            // Reset glow effect
            this.style.boxShadow = '';
        });
    });

    // Resource link interactions
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click feedback
            this.style.transform = 'translateX(2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Log click for analytics
            console.log('Resource link clicked:', this.href);
        });

        // Add loading state on click
        link.addEventListener('mousedown', function() {
            const icon = this.querySelector('.link-icon');
            const originalIcon = icon.textContent;
            icon.textContent = '⏳';
            
            setTimeout(() => {
                icon.textContent = originalIcon;
            }, 1000);
        });
    });

    // Quick link interactions
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add bounce effect
            this.style.transform = 'translateY(-1px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            // Add success indicator
            const icon = this.querySelector('.quick-icon');
            const originalIcon = icon.textContent;
            icon.textContent = '✓';
            icon.style.color = '#00ff88';
            
            setTimeout(() => {
                icon.textContent = originalIcon;
                icon.style.color = '';
            }, 1500);

            console.log('Quick link clicked:', this.href);
        });
    });

    // Staggered entrance animation for links sections
    function animateLinksPage() {
        const sections = document.querySelectorAll('#page-links .links-section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.6s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // Trigger animation when links page is shown
    const linksNavBtn = document.querySelector('[data-page="links"]');
    if (linksNavBtn) {
        linksNavBtn.addEventListener('click', function() {
            setTimeout(animateLinksPage, 100);
        });
    }

    // Add search functionality for links
    function addLinksSearch() {
        const linksPage = document.getElementById('page-links');
        const title = linksPage.querySelector('.page-title');
        
        // Create search input
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            margin-bottom: 25px;
            text-align: center;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Пошук посилань...';
        searchInput.style.cssText = `
            width: 100%;
            max-width: 400px;
            padding: 12px 20px;
            border: 2px solid rgba(107, 115, 255, 0.2);
            border-radius: 25px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease;
        `;
        
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#6b73ff';
            this.style.boxShadow = '0 0 10px rgba(107, 115, 255, 0.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(107, 115, 255, 0.2)';
            this.style.boxShadow = 'none';
        });
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const sections = document.querySelectorAll('.links-section');
            
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(query)) {
                    section.style.display = 'block';
                    section.style.opacity = '1';
                } else {
                    section.style.opacity = '0.3';
                }
            });
            
            if (query === '') {
                sections.forEach(section => {
                    section.style.opacity = '1';
                });
            }
        });
        
        searchContainer.appendChild(searchInput);
        title.after(searchContainer);
    }

    // Add search when page loads
    setTimeout(addLinksSearch, 500);
});