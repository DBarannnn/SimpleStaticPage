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

    // Minimal interactive effects
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Schedule page functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const actionButtons = document.querySelectorAll('.action-btn');

    // Filter button interactions
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Basic click feedback
            this.style.backgroundColor = '#d0d0d0';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 100);
            
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
                item.style.borderLeft = '3px solid #000';
                item.style.background = '#efefef';
            }
        });
    }

    // Highlight current class every minute
    highlightCurrentClass();
    setInterval(highlightCurrentClass, 60000);

    // Services page functionality
    const serviceLinks = document.querySelectorAll('.service-link');

    // Service link click tracking
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Service link clicked:', this.href);
        });
    });



    // Links page functionality
    const resourceLinks = document.querySelectorAll('.resource-link');

    // Resource link interactions
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Resource link clicked:', this.href);
        });
    });

    // Add simple search functionality for links
    function addLinksSearch() {
        const linksPage = document.getElementById('page-links');
        const title = linksPage.querySelector('.page-title');
        
        // Create search input
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            margin-bottom: 10px;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Пошук...';
        searchInput.style.cssText = `
            width: 200px;
            padding: 5px 8px;
            border: 1px solid #ccc;
            font-size: 12px;
        `;
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const sections = document.querySelectorAll('.links-section');
            
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(query) || query === '') {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
        
        searchContainer.appendChild(searchInput);
        title.after(searchContainer);
    }

    // Add search when page loads
    setTimeout(addLinksSearch, 100);
});