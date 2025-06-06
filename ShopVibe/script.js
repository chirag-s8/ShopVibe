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

// NEW FEATURE: Product Quick View Modal
const quickViewModal = document.getElementById('quick-view-modal');
const quickViewOverlay = document.getElementById('quick-view-overlay');

function openQuickView(productData) {
    // Populate modal with product data
    document.getElementById('qv-image').src = productData.img;
    document.getElementById('qv-title').textContent = productData.title;
    document.getElementById('qv-price').textContent = `$${productData.price.toFixed(2)}`;
    document.getElementById('qv-old-price').textContent = `$${productData.old.toFixed(2)}`;
    document.getElementById('qv-description').textContent = productData.description;
    document.getElementById('qv-rating').innerHTML = '★'.repeat(productData.rating) + '☆'.repeat(5 - productData.rating);
    document.getElementById('qv-stock').textContent = productData.stock > 0 ? `${productData.stock} in stock` : 'Out of stock';
    
    // Update quantity selector max value
    const qtySelect = document.getElementById('qv-quantity');
    qtySelect.innerHTML = '';
    for (let i = 1; i <= Math.min(productData.stock, 10); i++) {
        qtySelect.innerHTML += `<option value="${i}">${i}</option>`;
    }
    
    // Show modal
    quickViewModal.classList.add('active');
    quickViewOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    quickViewModal.classList.remove('active');
    quickViewOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close quick view modal
document.getElementById('close-quick-view').onclick = closeQuickView;
quickViewOverlay.onclick = closeQuickView;

// Handle quick view add to cart
document.getElementById('qv-add-to-cart').onclick = function() {
    const quantity = document.getElementById('qv-quantity').value;
    const productTitle = document.getElementById('qv-title').textContent;
    alert(`Added ${quantity} x ${productTitle} to cart!`);
    closeQuickView();
};

// Product comparison feature
let comparisonList = [];

function toggleComparison(productData) {
    const index = comparisonList.findIndex(p => p.title === productData.title);
    if (index > -1) {
        comparisonList.splice(index, 1);
    } else {
        if (comparisonList.length < 3) {
            comparisonList.push(productData);
        } else {
            alert('You can only compare up to 3 products at once.');
            return;
        }
    }
    updateComparisonBar();
}

function updateComparisonBar() {
    const compBar = document.getElementById('comparison-bar');
    if (comparisonList.length === 0) {
        compBar.style.display = 'none';
        return;
    }
    
    compBar.style.display = 'block';
    document.getElementById('comparison-count').textContent = comparisonList.length;
    document.getElementById('comparison-items').innerHTML = comparisonList.map(p => 
        `<span>${p.title} <button onclick="removeFromComparison('${p.title}')">×</button></span>`
    ).join('');
}

function removeFromComparison(title) {
    comparisonList = comparisonList.filter(p => p.title !== title);
    updateComparisonBar();
}

function showComparison() {
    if (comparisonList.length < 2) {
        alert('Please select at least 2 products to compare.');
        return;
    }
    // Here you would show a comparison table/modal
    alert(`Comparing: ${comparisonList.map(p => p.title).join(', ')}`);
}

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

    // Enhanced products with more details for quick view
    const products = [
        { 
            img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', 
            title: 'Wireless Headphones', 
            price: 59.99, 
            old: 89.99, 
            cat: 'electronics',
            description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
            rating: 4,
            stock: 15
        },
        { 
            img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', 
            title: 'Men\'s Jacket', 
            price: 39.99, 
            old: 59.99, 
            cat: 'fashion',
            description: 'Stylish and comfortable men\'s jacket made from high-quality materials. Available in multiple sizes and colors.',
            rating: 5,
            stock: 8
        },
        { 
            img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 
            title: 'Modern Sofa', 
            price: 299.99, 
            old: 399.99, 
            cat: 'home',
            description: 'Comfortable 3-seater modern sofa with premium fabric upholstery. Perfect for any living room setup.',
            rating: 4,
            stock: 3
        },
        { 
            img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', 
            title: 'Yoga Mat', 
            price: 19.99, 
            old: 29.99, 
            cat: 'sports',
            description: 'Non-slip yoga mat with excellent grip and cushioning. Eco-friendly and durable for all your workout needs.',
            rating: 4,
            stock: 25
        },
        { 
            img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', 
            title: 'Lipstick Set', 
            price: 24.99, 
            old: 34.99, 
            cat: 'beauty',
            description: 'Premium lipstick collection with 6 vibrant shades. Long-lasting formula that keeps your lips moisturized.',
            rating: 5,
            stock: 12
        }
    ];
    
    const grid = document.getElementById('products-grid');
    function renderProducts(filter = 'all') {
        grid.innerHTML = products.filter(p => filter === 'all' || p.cat === filter)
            .map((p, index) => `
                <div class="product-card">
                    <img src="${p.img}" alt="${p.title}">
                    <div class="product-title">${p.title}</div>
                    <div class="product-rating">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}</div>
                    <div>
                        <span class="product-price">$${p.price.toFixed(2)}</span>
                        <span class="product-old-price">$${p.old.toFixed(2)}</span>
                    </div>
                    <div class="product-actions">
                        <button onclick="openQuickView(${JSON.stringify(p).replace(/"/g, '&quot;')})">
                            <i class="fas fa-eye"></i> Quick View
                        </button>
                        <button><i class="fas fa-heart"></i></button>
                        <button onclick="toggleComparison(${JSON.stringify(p).replace(/"/g, '&quot;')})">
                            <i class="fas fa-balance-scale"></i>
                        </button>
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