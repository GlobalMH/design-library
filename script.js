// Iframe for Design System Landing Page //

  function sendHeightToParent() {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage({ type: 'resize-iframe', height }, '*');
  }

  window.addEventListener('load', sendHeightToParent);
  window.addEventListener('resize', sendHeightToParent);

  const observer = new MutationObserver(sendHeightToParent);
  observer.observe(document.body, { childList: true, subtree: true });


// Design System Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navButtons = document.querySelectorAll('.nav-button');
    const viewButtons = document.querySelectorAll('.view-button');
    
    // Handle navigation button clicks
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the selected device type
            const deviceType = this.dataset.device;
            
            // Log the device selection (in a real app, this would change the viewport)
            console.log(`Selected device: ${deviceType}`);
            
            // You could add viewport changes here for actual responsiveness testing
            updateViewport(deviceType);
        });
    });
    
    // Handle view button clicks
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const cardTitle = card.querySelector('h3').textContent;
            
            // Add a simple animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // In a real application, this would navigate to the specific section
            console.log(`Viewing ${cardTitle} section`);
            
            // Show a simple notification
            showNotification(`Loading ${cardTitle}...`);
        });
    });
    
    // Function to simulate viewport changes
    function updateViewport(deviceType) {
        const container = document.querySelector('.container');
        
        // Remove existing device classes
        container.classList.remove('desktop-view', 'tablet-view', 'mobile-view');
        
        // Add new device class
        container.classList.add(`${deviceType}-view`);
        
        // Simulate different max-widths for different devices
        switch(deviceType) {
            case 'desktop':
                container.style.maxWidth = '1200px';
                break;
            case 'tablet':
                container.style.maxWidth = '768px';
                break;
            case 'mobile':
                container.style.maxWidth = '480px';
                break;
        }
    }
    
    // Function to show notifications
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Add loading state to view buttons
    function addLoadingState(button) {
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);
    }
    
    // Enhanced view button functionality
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            addLoadingState(this);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Add CSS for keyboard navigation
    const keyboardNavStyles = document.createElement('style');
    keyboardNavStyles.textContent = `
        .keyboard-nav *:focus {
            outline: 2px solid #ffffff !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(keyboardNavStyles);
    
    // Initialize with desktop view
    updateViewport('desktop');
    
    console.log('Design System Landing Page initialized successfully!');
});

// Utility function to handle theme switching (optional enhancement)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// Performance optimization: Lazy load images if needed
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images are present
if (document.querySelector('img[data-src]')) {
    lazyLoadImages();
}