// Page functionality and interactions
class App {
    constructor() {
        this.galleryManager = galleryManager;
        this.init();
    }

    // Initialize the application
    init() {
        this.setupDarkMode();
        this.setupSearch();
        this.setupNavigation();
        this.galleryManager.generateAllSections();
    }

    // Dark Mode Functionality
    setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-switch');
        const body = document.body;
        
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        // Toggle dark mode
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    body.classList.add('dark-mode');
                    darkModeToggle.checked = true;
                } else {
                    body.classList.remove('dark-mode');
                    darkModeToggle.checked = false;
                }
            }
        });
    }

    // Search functionality
    setupSearch() {
        const searchInput = document.querySelector('.search-bar input');
        const debouncedSearch = this.debounce((searchTerm) => {
            this.galleryManager.filterGallery(searchTerm);
        }, 300);
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            debouncedSearch(searchTerm);
        });

        // Clear search on escape key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                this.galleryManager.filterGallery('');
            }
        });
    }

    // Navigation functionality
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Handle different navigation actions
                this.handleNavigation(link.textContent.trim());
            });
        });
    }

    // Handle navigation actions
    handleNavigation(destination) {
        const searchInput = document.querySelector('.search-bar input');
        
        switch(destination) {
            case 'Home':
                // Scroll to top and show all gallery items
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.galleryManager.filterGallery('');
                searchInput.value = '';
                break;
            case 'Library':
                // Scroll to Twitter uploads section
                document.getElementById('twitter-uploads').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                break;
            case 'Settings':
                // Example: Show settings modal or page
                alert('Settings page would open here');
                break;
        }
    }

    // Utility function to debounce search input
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App, galleryManager };
}