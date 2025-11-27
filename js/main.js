// ===================================
// HavenJourney - Main JavaScript
// ===================================

let articlesData = [];

// Initialize AOS (Animate On Scroll) and load articles
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    hydrateHomepageArticles();
});

function hydrateHomepageArticles() {
    const heroMain = document.getElementById('heroMain');
    const heroSidebar = document.getElementById('heroSidebar');
    const articlesGrid = document.getElementById('articlesGrid');

    const rawArticles = Array.isArray(window.__HAVENJOURNEY_ARTICLES__) ? window.__HAVENJOURNEY_ARTICLES__ : [];

    articlesData = rawArticles
        .filter(article => article && article.title && article.url)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (!articlesData.length) {
        if (heroMain) {
            heroMain.innerHTML = `
                <div class="hero-content">
                    <h2 class="hero-title">No stories available yet</h2>
                    <p class="hero-excerpt">Please check back soon for freshly curated features.</p>
                </div>
            `;
        }
        if (articlesGrid) {
            articlesGrid.innerHTML = `
                <div class="article-card" style="flex-direction: column; align-items: flex-start;">
                    <p style="margin: 0;">We&apos;re preparing new stories for you. Refresh later to discover them.</p>
                </div>
            `;
        }
        return;
    }

    renderHeroSection(heroMain, heroSidebar, articlesData);
    renderArticlesGrid(articlesGrid, articlesData);
    attachCardHoverEffects();
    AOS.refresh();
}

function renderHeroSection(heroMain, heroSidebar, articles) {
    if (!heroMain || !heroSidebar || !articles.length) return;

    const [featured, ...rest] = articles;

    heroMain.innerHTML = `
        <div class="hero-image">
            <img src="${featured.heroImage}" alt="${featured.title}">
            <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
            <span class="category-badge ${featured.categorySlug}">${featured.category}</span>
            <h2 class="hero-title">${featured.title}</h2>
            <p class="hero-excerpt">${featured.summary}</p>
            <div class="meta">
                <span class="date"><i class="far fa-calendar"></i> ${featured.displayDate}</span>
                <span class="read-time"><i class="far fa-clock"></i> ${featured.readTime}</span>
            </div>
            <a href="${featured.url}" class="btn-primary">Read More</a>
        </div>
    `;

    heroSidebar.innerHTML = rest.slice(0, 2).map((article, index) => `
        <div class="hero-small" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
            <div class="hero-image-small">
                <img src="${article.heroImage}" alt="${article.title}">
            </div>
            <div class="hero-small-content">
                <span class="category-badge ${article.categorySlug}">${article.category}</span>
                <h3>${article.title}</h3>
                <span class="date-small">${article.displayDate}</span>
            </div>
        </div>
    `).join('');
}

function renderArticlesGrid(grid, articles) {
    if (!grid) return;

    if (!articles.length) {
        grid.innerHTML = '<p>No articles available yet. Check back soon!</p>';
        return;
    }

    grid.innerHTML = articles.map((article, index) => `
        <article class="article-card ${article.categorySlug}" data-aos="fade-up" data-aos-delay="${(index % 5) * 100}">
            <div class="article-image">
                <img src="${article.cardImage}" alt="${article.title}">
                <div class="article-overlay"></div>
            </div>
            <div class="article-content">
                <span class="category-badge ${article.categorySlug}">${article.category}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="meta">
                    <span class="date"><i class="far fa-calendar"></i> ${article.displayDate}</span>
                    <span class="read-time"><i class="far fa-clock"></i> ${article.readTime}</span>
                </div>
                <a href="${article.url}" class="read-more">Read Article <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>
    `).join('');

    AOS.refreshHard();
}

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

initializeSearch();

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

function initializeSearch() {
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        if (!articlesData.length) {
            searchResults.innerHTML = `
                <div style="text-align: center; padding: 2rem; background: white; color: var(--color-gray);">
                    <p>Loading articles, please try again in a moment.</p>
                </div>
            `;
            return;
        }

        const results = articlesData.filter(article => {
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
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return text.replace(regex, '<strong style="background: rgba(212, 135, 75, 0.2); color: var(--color-primary);">$1</strong>');
}

// ===================================
// Category Filter
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        const articleCards = document.querySelectorAll('.article-card');

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
        
        const articleCards = document.querySelectorAll('.article-card');

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

function attachCardHoverEffects(scope = document) {
    scope.querySelectorAll('.article-card, .product-card, .related-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

attachCardHoverEffects();

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

