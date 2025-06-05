// script.js

// Loading screen
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 1200);
});

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');

    // Open login modal
    loginBtn.addEventListener('click', function() {
        loginModal.classList.add('active');
        modalOverlay.classList.add('active');
    });

    // Open signup modal
    signupBtn.addEventListener('click', function() {
        signupModal.classList.add('active');
        modalOverlay.classList.add('active');
    });

    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = document.getElementById(button.dataset.modal);
            modal.classList.remove('active');
            modalOverlay.classList.remove('active');
        });
    });

    // Close modal when clicking outside of it
    modalOverlay.addEventListener('click', function() {
        loginModal.classList.remove('active');
        signupModal.classList.remove('active');
        modalOverlay.classList.remove('active');
    });

    // Handle form submissions (example)
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Handle login logic here
        alert('Login form submitted');
    });

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Handle signup logic here
        alert('Signup form submitted');
    });
});

// Modal logic
const modalOverlay = document.getElementById('modal-overlay');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');

document.getElementById('login-btn').onclick = function() {
    modalOverlay.classList.add('active');
    loginModal.classList.add('active');
};
document.getElementById('signup-btn').onclick = function() {
    modalOverlay.classList.add('active');
    signupModal.classList.add('active');
};
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = function() {
        modalOverlay.classList.remove('active');
        loginModal.classList.remove('active');
        signupModal.classList.remove('active');
    };
});
modalOverlay.onclick = function() {
    modalOverlay.classList.remove('active');
    loginModal.classList.remove('active');
    signupModal.classList.remove('active');
};
document.getElementById('switch-to-signup').onclick = function(e) {
    e.preventDefault();
    loginModal.classList.remove('active');
    signupModal.classList.add('active');
};

// Cart sidebar logic
const cartSidebar = document.getElementById('cart-sidebar');
document.getElementById('cart-toggle').onclick = function() {
    cartSidebar.classList.add('active');
    modalOverlay.classList.add('active');
};
document.getElementById('close-cart').onclick = function() {
    cartSidebar.classList.remove('active');
    modalOverlay.classList.remove('active');
};
document.getElementById('close-cart-btn').onclick = function() {
    cartSidebar.classList.remove('active');
    modalOverlay.classList.remove('active');
};

// Hero slider (basic demo)
let currentHero = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
function showHeroSlide(idx) {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
        indicators[i].classList.toggle('active', i === idx);
    });
    currentHero = idx;
}
document.getElementById('hero-prev').onclick = function() {
    showHeroSlide((currentHero - 1 + heroSlides.length) % heroSlides.length);
};
document.getElementById('hero-next').onclick = function() {
    showHeroSlide((currentHero + 1) % heroSlides.length);
};
indicators.forEach((ind, i) => {
    ind.onclick = () => showHeroSlide(i);
});

// Flash deals countdown
function startCountdown(hours, minutes, seconds) {
    function update() {
        if (seconds === 0) {
            if (minutes === 0) {
                if (hours === 0) return;
                hours--; minutes = 59; seconds = 59;
            } else { minutes--; seconds = 59; }
        } else { seconds--; }
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        setTimeout(update, 1000);
    }
    update();
}
startCountdown(12, 34, 56);

// Newsletter form
document.getElementById('newsletter-form').onsubmit = function(e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    this.reset();
};

// Search suggestions (demo)
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');
const suggestions = ['iPhone 15', 'Nike Shoes', 'Smart TV', 'Headphones', 'Coffee Maker', 'Wrist Watch', 'Bluetooth Speaker'];
searchInput.oninput = function() {
    const val = this.value.trim().toLowerCase();
    if (!val) {
        searchSuggestions.classList.remove('active');
        searchSuggestions.innerHTML = '';
        return;
    }
    const filtered = suggestions.filter(s => s.toLowerCase().includes(val));
    if (filtered.length) {
        searchSuggestions.innerHTML = filtered.map(s => `<li>${s}</li>`).join('');
        searchSuggestions.classList.add('active');
        searchSuggestions.querySelectorAll('li').forEach(li => {
            li.onclick = () => {
                searchInput.value = li.textContent;
                searchSuggestions.classList.remove('active');
            };
        });
    } else {
        searchSuggestions.classList.remove('active');
        searchSuggestions.innerHTML = '';
    }
};
document.body.onclick = function(e) {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.classList.remove('active');
    }
};

// Demo: Add some categories and products dynamically
window.addEventListener('DOMContentLoaded', () => {
    // Categories
    const categories = [
        { icon: 'fa-laptop', name: 'Electronics', desc: 'Latest gadgets & devices' },
        { icon: 'fa-tshirt', name: 'Fashion', desc: 'Trendy clothes & accessories' },
        { icon: 'fa-couch', name: 'Home & Garden', desc: 'Furniture & decor' },
        { icon: 'fa-dumbbell', name: 'Sports', desc: 'Gear & equipment' },
        { icon: 'fa-magic', name: 'Beauty', desc: 'Cosmetics & skincare' },
        { icon: 'fa-book', name: 'Books', desc: 'Bestsellers & classics' },
        { icon: 'fa-car', name: 'Automotive', desc: 'Car accessories' }
    ];
    document.querySelector('.categories-grid').innerHTML = categories.map(c =>
        `<div class="category-card">
            <i class="fas ${c.icon}"></i>
            <h4>${c.name}</h4>
            <p>${c.desc}</p>
        </div>`
    ).join('');

    // Products
    const products = [
        { img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', title: 'Wireless Headphones', price: 59.99, old: 89.99, cat: 'electronics' },
        { img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', title: 'Men\'s Jacket', price: 39.99, old: 59.99, cat: 'fashion' },
        { img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', title: 'Modern Sofa', price: 299.99, old: 399.99, cat: 'home' },
        { img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', title: 'Yoga Mat', price: 19.99, old: 29.99, cat: 'sports' },
        { img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', title: 'Lipstick Set', price: 24.99, old: 34.99, cat: 'beauty' }
    ];
    const grid = document.getElementById('products-grid');
    function renderProducts(filter = 'all') {
        grid.innerHTML = products.filter(p => filter === 'all' || p.cat === filter)
            .map(p => `
                <div class="product-card">
                    <img src="${p.img}" alt="${p.title}">
                    <div class="product-title">${p.title}</div>
                    <div>
                        <span class="product-price">$${p.price.toFixed(2)}</span>
                        <span class="product-old-price">$${p.old.toFixed(2)}</span>
                    </div>
                    <div class="product-actions">
                        <button>Add to Cart</button>
                        <button><i class="fas fa-heart"></i></button>
                    </div>
                </div>
            `).join('');
    }
    renderProducts();
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.onclick = function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.dataset.filter);
        };
    });
});