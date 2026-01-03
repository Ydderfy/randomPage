// ================================
// Navigation Mobile Toggle
// ================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ================================
// Navbar Scroll Effect
// ================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ================================
// Counter Animation
// ================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for counter animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// ================================
// Forum Functionality
// ================================

// Category Filter
const categoryBtns = document.querySelectorAll('.category-btn');
const topicCards = document.querySelectorAll('.topic-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        // Filter topics
        topicCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Forum Search
const forumSearch = document.getElementById('forumSearch');
if (forumSearch) {
    forumSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        topicCards.forEach(card => {
            const title = card.querySelector('.topic-title').textContent.toLowerCase();
            const preview = card.querySelector('.topic-preview').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || preview.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// New Topic Modal
const newTopicBtn = document.getElementById('newTopicBtn');
const newTopicModal = document.getElementById('newTopicModal');
const closeModalBtn = document.querySelector('.close-modal');

if (newTopicBtn && newTopicModal) {
    newTopicBtn.addEventListener('click', () => {
        newTopicModal.classList.add('active');
    });
    
    closeModalBtn.addEventListener('click', () => {
        newTopicModal.classList.remove('active');
    });
    
    newTopicModal.addEventListener('click', (e) => {
        if (e.target === newTopicModal) {
            newTopicModal.classList.remove('active');
        }
    });
}

// New Topic Form
const newTopicForm = document.getElementById('newTopicForm');
if (newTopicForm) {
    newTopicForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('topicTitle').value;
        const category = document.getElementById('topicCategory').value;
        const content = document.getElementById('topicContent').value;
        
        // Create new topic card (demo)
        const topicsContainer = document.querySelector('.forum-topics');
        const newCard = document.createElement('div');
        newCard.className = 'topic-card';
        newCard.setAttribute('data-category', category);
        newCard.innerHTML = `
            <div class="topic-avatar">
                <img src="https://i.pravatar.cc/50?img=${Math.floor(Math.random() * 70)}" alt="Avatar">
            </div>
            <div class="topic-content">
                <h3 class="topic-title">${title}</h3>
                <p class="topic-preview">${content.substring(0, 100)}...</p>
                <div class="topic-meta">
                    <span><i class="fas fa-user"></i> Vous</span>
                    <span><i class="fas fa-clock"></i> À l'instant</span>
                    <span><i class="fas fa-comments"></i> 0 réponses</span>
                    <span class="topic-tag tag-${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </div>
            </div>
            <div class="topic-stats">
                <span class="views"><i class="fas fa-eye"></i> 0</span>
                <span class="likes"><i class="fas fa-heart"></i> 0</span>
            </div>
        `;
        
        topicsContainer.insertBefore(newCard, topicsContainer.firstChild);
        
        // Close modal and reset form
        newTopicModal.classList.remove('active');
        newTopicForm.reset();
        
        // Show success notification
        showNotification('Sujet créé avec succès !', 'success');
    });
}

// ================================
// Contact Form
// ================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
            submitBtn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
            
            showNotification('Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}

// ================================
// FAQ Accordion
// ================================
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ================================
// Notification System
// ================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#00b894' : '#6c5ce7'};
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ================================
// Scroll Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .topic-card, .info-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    scrollObserver.observe(el);
});

// ================================
// Add CSS Animation Keyframes
// ================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
    }
`;
document.head.appendChild(style);

// ================================
// Console Welcome Message
// ================================
console.log('%c🎉 Bienvenue sur RandomPage!', 'font-size: 24px; color: #6c5ce7; font-weight: bold;');
console.log('%c💻 Développé avec HTML5, CSS3 et JavaScript', 'font-size: 14px; color: #636e72;');
