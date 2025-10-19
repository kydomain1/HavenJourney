// ===================================
// HavenJourney - Main JavaScript
// ===================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// ===================================
// Mobile Navigation Toggle
// ===================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// Mobile Dropdown Toggle
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
        }
    });
});

// ===================================
// Search Overlay
// ===================================

const searchIcon = document.getElementById('searchIcon');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Sample articles data for search
const articles = [
    {
        title: 'The Ultimate Guide to Sustainable Fashion in 2025',
        url: 'article-1.html',
        category: 'Fashion & Accessories',
        excerpt: 'Discover how eco-conscious brands are revolutionizing the fashion industry...',
        date: 'March 15, 2025'
    },
    {
        title: 'Building Your Perfect Skincare Routine: A Science-Based Approach',
        url: 'article-2.html',
        category: 'Health & Beauty',
        excerpt: 'Unlock radiant skin with our comprehensive guide to creating a personalized skincare routine...',
        date: 'February 8, 2025'
    },
    {
        title: 'Transform Your Living Space with Biophilic Design Principles',
        url: 'article-3.html',
        category: 'Home & Garden',
        excerpt: 'Bring nature indoors and create a harmonious living environment...',
        date: 'April 10, 2025'
    },
    {
        title: 'Hidden Gems: 10 Underrated Destinations for Summer 2025',
        url: 'article-4.html',
        category: 'Travel & Accommodation',
        excerpt: 'Escape the tourist crowds and discover breathtaking destinations...',
        date: 'June 22, 2025'
    },
    {
        title: 'Smart Investment Strategies for Young Professionals in 2025',
        url: 'article-5.html',
        category: 'Finance & Insurance',
        excerpt: 'Navigate the evolving financial landscape with expert advice...',
        date: 'January 18, 2025'
    }
];

// Open search overlay
if (searchIcon) {
    searchIcon.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });
}

// Close search overlay
if (searchClose) {
    searchClose.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
}

// Close on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

// Search functionality
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = articles.filter(article => {
            return article.title.toLowerCase().includes(query) ||
                   article.excerpt.toLowerCase().includes(query) ||
                   article.category.toLowerCase().includes(query);
        });
        
        displaySearchResults(results, query);
    });
}

function displaySearchResults(results, query) {
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: white; color: var(--color-gray);">
                <p>No results found for "${query}"</p>
            </div>
        `;
        return;
    }
    
    const resultsHTML = results.map(article => `
        <a href="${article.url}" style="display: block; padding: 1.5rem; background: white; margin-bottom: 1rem; transition: all 0.3s ease; text-decoration: none; color: inherit;">
            <h4 style="color: var(--color-primary); margin-bottom: 0.5rem; font-family: var(--font-display);">${highlightText(article.title, query)}</h4>
            <p style="color: var(--color-gray); font-size: 0.95rem; margin-bottom: 0.5rem;">${highlightText(article.excerpt, query)}</p>
            <span style="font-size: 0.85rem; color: var(--color-light-gray);">${article.category} • ${article.date}</span>
        </a>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
    
    // Add hover effect
    const resultLinks = searchResults.querySelectorAll('a');
    resultLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong style="background: rgba(212, 135, 75, 0.2); color: var(--color-primary);">$1</strong>');
}

// ===================================
// Category Filter
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const articleCards = document.querySelectorAll('.article-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter articles
        articleCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Reinitialize AOS
        AOS.refresh();
    });
});

// Category filter from footer/nav
document.querySelectorAll('[data-category]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Find and click the corresponding filter button
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === category) {
                    btn.click();
                    
                    // Scroll to articles section
                    const articlesSection = document.querySelector('.articles-section');
                    if (articlesSection) {
                        articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        }
    });
});

// ===================================
// Pagination
// ===================================

const pageButtons = document.querySelectorAll('.page-btn');

pageButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        pageButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        if (!this.innerHTML.includes('fa-arrow')) {
            this.classList.add('active');
        }
        
        // Scroll to top of articles
        const articlesSection = document.querySelector('.articles-section');
        if (articlesSection) {
            articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // In a real application, this would load new articles
        // For now, we'll just show a smooth transition
        articleCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
        
        setTimeout(() => {
            articleCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 300);
    });
});

// ===================================
// Newsletter Form
// ===================================

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('input[type="email"]');
        const button = this.querySelector('button');
        const email = input.value;
        
        // Simple email validation
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate API call
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for subscribing! Check your inbox for confirmation.', 'success');
            input.value = '';
            button.textContent = 'Subscribe';
            button.disabled = false;
        }, 1500);
    });
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===================================
// Contact Form
// ===================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate API call
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Show success message
            formSuccess.classList.add('show');
            
            // Hide form
            contactForm.style.opacity = '0';
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
                formSuccess.classList.remove('show');
                contactForm.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}

// ===================================
// Notification System
// ===================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--color-primary)' : type === 'error' ? '#c0392b' : 'var(--color-secondary)'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-family: var(--font-body);
    `;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===================================
// Navbar Scroll Effect
// ===================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Image Lazy Loading (for browsers that don't support native lazy loading)
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Social Share Buttons
// ===================================

const shareButtons = document.querySelectorAll('.share-btn');

shareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const url = window.location.href;
        const title = document.title;
        
        if (this.classList.contains('facebook')) {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
        } else if (this.classList.contains('twitter')) {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400');
        } else if (this.classList.contains('pinterest')) {
            window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400');
        } else if (this.classList.contains('linkedin')) {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
        } else if (this.classList.contains('email')) {
            window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        }
    });
});

// ===================================
// Article Card Hover Effects
// ===================================

const cards = document.querySelectorAll('.article-card, .product-card, .related-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Back to Top Button (Optional)
// ===================================

// Create back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.setAttribute('id', 'backToTop');
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    z-index: 1000;
    transition: all 0.3s ease;
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Scroll to top on click
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
});

// ===================================
// Performance: Debounce Function
// ===================================

function debounce(func, wait) {
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

// Apply debounce to resize events
const debouncedResize = debounce(() => {
    AOS.refresh();
}, 250);

window.addEventListener('resize', debouncedResize);

// ===================================
// Console Welcome Message
// ===================================

console.log('%cWelcome to HavenJourney!', 'color: #D4874B; font-size: 24px; font-weight: bold; font-family: "Playfair Display", serif;');
console.log('%cExplore our curated stories for modern living.', 'color: #6B5D4F; font-size: 14px;');

