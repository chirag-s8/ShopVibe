// ===========================
// LOADING SCREEN
// ===========================
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 1200);
});

// ===========================
// MODAL AND FORM LOGIC
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');

    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
        modalOverlay.classList.add('active');
    });

    signupBtn.addEventListener('click', () => {
        signupModal.classList.add('active');
        modalOverlay.classList.add('active');
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = document.getElementById(button.dataset.modal);
            modal.classList.remove('active');
            modalOverlay.classList.remove('active');
        });
    });

    modalOverlay.addEventListener('click', () => {
        loginModal.classList.remove('active');
        signupModal.classList.remove('active');
        modalOverlay.classList.remove('active');
    });

    // ============ FORM VALIDATION & STORAGE ============

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;

        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill all the fields.");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert("Invalid email format.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Save to localStorage
        const user = { username, email, password };
        localStorage.setItem("demoUser", JSON.stringify(user));

        alert("Signup successful! You can now log in.");
        signupForm.reset();
        signupModal.classList.remove('active');
        modalOverlay.classList.remove('active');
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        const storedUser = JSON.parse(localStorage.getItem("demoUser"));

        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }

        if (!storedUser) {
            alert("No user found. Please sign up first.");
            return;
        }

        if (storedUser.email === email && storedUser.password === password) {
            alert(`Welcome back, ${storedUser.username}!`);
            loginForm.reset();
            loginModal.classList.remove('active');
            modalOverlay.classList.remove('active');
        } else {
            alert("Invalid email or password.");
        }
    });

    document.getElementById('switch-to-signup').onclick = function (e) {
        e.preventDefault();
        loginModal.classList.remove('active');
        signupModal.classList.add('active');
    };
});

// ===========================
// CART SIDEBAR
// ===========================
const cartSidebar = document.getElementById('cart-sidebar');
document.getElementById('cart-toggle').onclick = () => {
    cartSidebar.classList.add('active');
    modalOverlay.classList.add('active');
};
document.getElementById('close-cart').onclick =
    document.getElementById('close-cart-btn').onclick = () => {
        cartSidebar.classList.remove('active');
        modalOverlay.classList.remove('active');
    };

// ===========================
// HERO SLIDER
// ===========================
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
document.getElementById('hero-prev').onclick = () => {
    showHeroSlide((currentHero - 1 + heroSlides.length) % heroSlides.length);
};
document.getElementById('hero-next').onclick = () => {
    showHeroSlide((currentHero + 1) % heroSlides.length);
};
indicators.forEach((ind, i) => {
    ind.onclick = () => showHeroSlide(i);
});

// ===========================
// FLASH DEALS COUNTDOWN
// ===========================
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

// ===========================
// NEWSLETTER FORM
// ===========================
document.getElementById('newsletter-form').onsubmit = function (e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    this.reset();
};

// ===========================
// SEARCH SUGGESTIONS
// ===========================
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');
const suggestions = ['iPhone 15', 'Nike Shoes', 'Smart TV', 'Headphones', 'Coffee Maker', 'Wrist Watch', 'Bluetooth Speaker'];

searchInput.oninput = function () {
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

document.body.onclick = function (e) {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.classList.remove('active');
    }
};


<<<<<<< HEAD
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

    // Track recently viewed product
    addProductToRecentlyViewed(productData);
=======
// Star rating logic
const starRating = document.getElementById('starRating');
let selectedRating = 0;

starRating.addEventListener('mouseover', function(e) {
  if (e.target.tagName === 'SPAN') {
    const val = +e.target.getAttribute('data-value');
    highlightStars(val);
  }
});

starRating.addEventListener('mouseout', function() {
  highlightStars(selectedRating);
});

starRating.addEventListener('click', function(e) {
  if (e.target.tagName === 'SPAN') {
    selectedRating = +e.target.getAttribute('data-value');
    highlightStars(selectedRating);
  }
});

function highlightStars(val) {
  Array.from(starRating.children).forEach(star => {
    const starVal = +star.getAttribute('data-value');
    star.classList.toggle('selected', starVal <= val);
    star.classList.toggle('hovered', starVal <= val && val !== selectedRating);
  });
>>>>>>> 6218b88b2065df2582a3544557fbdfd0e8c09c35
}
<!-- User Profile Dashboard -->
<div id="user-profile-dashboard" class="dashboard-container">

  <div class="profile-header">
    <img id="profile-pic" src="https://i.pravatar.cc/150?img=3" alt="Profile Picture" />
    <h2 id="profile-username">John Doe</h2>
    <p id="profile-email">johndoe@example.com</p>
  </div>

  <button id="edit-profile-btn" class="btn-primary">Edit Profile</button>

  <div id="edit-profile-form" class="edit-profile-form hidden">
    <h3>Edit Profile</h3>
    <form id="profileForm">
      <label for="username">Username:</label>
      <input type="text" id="username" required />
      
      <label for="email">Email:</label>
      <input type="email" id="email" required />
      
      <button type="submit" class="btn-primary">Save Changes</button>
      <button type="button" id="cancel-edit" class="btn-secondary">Cancel</button>
    </form>
  </div>

  <div class="password-section">
    <h3>Change Password</h3>
    <form id="passwordForm">
      <label for="current-password">Current Password:</label>
      <input type="password" id="current-password" required />
      
      <label for="new-password">New Password:</label>
      <input type="password" id="new-password" required />
      
      <label for="confirm-password">Confirm New Password:</label>
      <input type="password" id="confirm-password" required />
      
      <button type="submit" class="btn-primary">Change Password</button>
    </form>
  </div>

  <button id="logout-btn" class="btn-logout">Logout</button>
</div>

<style>
  .dashboard-container {
    max-width: 400px;
    margin: 40px auto;
    background: #fefefe;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    font-family: Arial, sans-serif;
  }

  .profile-header {
    text-align: center;
    margin-bottom: 20px;
  }

  #profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
  }

  #profile-username {
    margin: 0;
    font-size: 24px;
  }

  #profile-email {
    margin: 4px 0 0;
    color: #555;
  }

  .btn-primary {
    display: inline-block;
    background-color: #2c7aed;
    color: white;
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 16px;
  }

  .btn-secondary {
    background-color: #999;
    margin-left: 10px;
  }

  .btn-logout {
    width: 100%;
    margin-top: 30px;
    padding: 12px 0;
    background-color: #e55353;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }

  .edit-profile-form {
    margin-top: 20px;
  }

  .hidden {
    display: none;
  }

  label {
    display: block;
    margin-top: 12px;
    font-weight: 600;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px 10px;
    margin-top: 6px;
    border: 1.5px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .password-section {
    margin-top: 30px;
  }
</style>

<script>
  const editBtn = document.getElementById('edit-profile-btn');
  const editForm = document.getElementById('edit-profile-form');
  const cancelEditBtn = document.getElementById('cancel-edit');
  const profileForm = document.getElementById('profileForm');

  const profileUsername = document.getElementById('profile-username');
  const profileEmail = document.getElementById('profile-email');

  editBtn.addEventListener('click', () => {
    editForm.classList.remove('hidden');
    editBtn.style.display = 'none';

    // Prefill form with current data
    document.getElementById('username').value = profileUsername.textContent;
    document.getElementById('email').value = profileEmail.textContent;
  });

  cancelEditBtn.addEventListener('click', () => {
    editForm.classList.add('hidden');
    editBtn.style.display = 'inline-block';
  });

  profileForm.addEventListener('submit', e => {
    e.preventDefault();

    const newUsername = document.getElementById('username').value.trim();
    const newEmail = document.getElementById('email').value.trim();

    if (!newUsername || !newEmail) {
      alert('Please fill in both username and email.');
      return;
    }

    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    profileUsername.textContent = newUsername;
    profileEmail.textContent = newEmail;

    alert('Profile updated successfully!');

    editForm.classList.add('hidden');
    editBtn.style.display = 'inline-block';
  });

  // Password change logic
  const passwordForm = document.getElementById('passwordForm');
  passwordForm.addEventListener('submit', e => {
    e.preventDefault();

    const currentPass = document.getElementById('current-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (!currentPass || !newPass || !confirmPass) {
      alert('Please fill all password fields.');
      return;
    }

    if (newPass !== confirmPass) {
      alert('New passwords do not match.');
      return;
    }

    // NOTE: For demo, just alert success (no real password management here)
    alert('Password changed successfully!');

    passwordForm.reset();
  });

  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn.addEventListener('click', () => {
    alert('You have been logged out.');
    // You can add your logout logic here (e.g., clearing tokens, redirecting)
  });
</script>

// Handle review form submission
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');

reviewForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const reviewer = document.getElementById('reviewer').value.trim();
  const reviewText = document.getElementById('reviewText').value.trim();

  if (!reviewer || !reviewText || selectedRating === 0) {
    alert('Please fill in your name, review, and select a rating.');
    return;
  }

  addReview(reviewer, selectedRating, reviewText);

  // Reset form
  reviewForm.reset();
  selectedRating = 0;
  highlightStars(0);
});

function addReview(name, rating, text) {
  const reviewDiv = document.createElement('div');
  reviewDiv.className = 'review';

  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  reviewDiv.innerHTML = `
    <div>
      <span class="reviewer">${name}</span>
      <span class="stars">${stars}</span>
    </div>
    <div class="text">${text}</div>
  `;

  reviewsList.prepend(reviewDiv);
}

const problemForm = document.getElementById('problemForm');
const problemsList = document.getElementById('problemsList');

problemForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('problemName').value.trim();
  const email = document.getElementById('problemEmail').value.trim();
  const type = document.getElementById('problemType').value;
  const desc = document.getElementById('problemDescription').value.trim();

  if (!name || !type || !desc) {
    alert('Please fill in your name, problem type, and description.');
    return;
  }

  addProblemReport(name, email, type, desc);

  // Reset form
  problemForm.reset();
});

function addProblemReport(name, email, type, desc) {
  const reportDiv = document.createElement('div');
  reportDiv.className = 'problem-report';

  const emailStr = email ? ` | Email: ${email}` : '';

  reportDiv.innerHTML = `
    <div class="problem-header">${type}</div>
    <div class="problem-meta">Reported by: ${name}${emailStr}</div>
    <div class="problem-desc">${desc}</div>
  `;

  problemsList.prepend(reportDiv);
}

// Demo: Add some categories and products dynamically

// ===========================
// DYNAMIC CATEGORIES & PRODUCTS
// ===========================

window.addEventListener('DOMContentLoaded', () => {
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

    const products = [
<<<<<<< HEAD
        { 
            id: 'prod-001', // Added unique ID
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
            id: 'prod-002', // Added unique ID
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
            id: 'prod-003', // Added unique ID
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
            id: 'prod-004', // Added unique ID
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
            id: 'prod-005', // Added unique ID
            img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', 
            title: 'Lipstick Set', 
            price: 24.99, 
            old: 34.99, 
            cat: 'beauty',
            description: 'Premium lipstick collection with 6 vibrant shades. Long-lasting formula that keeps your lips moisturized.',
            rating: 5,
            stock: 12
        },
        // Corrected and added unique IDs for the next set of products
        { 
            id: 'prod-006', 
            img: 'https://media.croma.com/image/upload/v1721992677/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/308673_jxaozj.png', 
            title: 'Gaming Headset', 
            price: 59.99, 
            old: 89.99, 
            cat: 'electronics',
            description: 'High-fidelity gaming headset with clear microphone. Immerse yourself in your favorite games.',
            rating: 4,
            stock: 10
        },
        { 
            id: 'prod-007', 
            img: 'https://m.media-amazon.com/images/I/71zwwEe2nLL._AC_UY1100_.jpg', 
            title: 'Denim Jacket', 
            price: 39.99, 
            old: 59.99, 
            cat: 'fashion',
            description: 'Classic denim jacket, a timeless addition to any wardrobe. Durable and stylish for all seasons.',
            rating: 5,
            stock: 15
        },
        { 
            id: 'prod-008', 
            img: 'https://m.media-amazon.com/images/I/71dp23WRANL._AC_UF894,1000_QL80_.jpg', 
            title: 'Dining Chairs', 
            price: 129.99, 
            old: 159.99, 
            cat: 'home',
            description: 'Set of two ergonomically designed dining chairs for comfort and style. Perfect for modern interiors.',
            rating: 4,
            stock: 6
        },
        { 
            id: 'prod-009', 
            img: 'https://images-cdn.ubuy.co.in/648a83eaae99a17744598e5c-yoga-mat-thick-pilates-mat-for-women.jpg', 
            title: 'Resistance Bands', 
            price: 19.99, 
            old: 29.99, 
            cat: 'sports',
            description: 'Set of resistance bands for full-body workouts. Ideal for home fitness and physical therapy.',
            rating: 4,
            stock: 30
        },
        { 
            id: 'prod-010', 
            img: 'https://5.imimg.com/data5/WQ/JK/PC/IOS-93978710/product-jpeg-500x500.png', 
            title: 'Moisturizing Cream', 
            price: 24.99, 
            old: 34.99, 
            cat: 'beauty',
            description: 'Rich moisturizing cream with natural extracts for healthy, glowing skin. Suitable for daily use.',
            rating: 5,
            stock: 20
        }
=======
        { img: 'https://media.croma.com/image/upload/v1721992677/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/308673_jxaozj.png', title: 'Wireless Headphones', price: 59.99, old: 89.99, cat: 'electronics' },
        { img: 'https://m.media-amazon.com/images/I/71zwwEe2nLL._AC_UY1100_.jpg', title: 'Men\'s Jacket', price: 39.99, old: 59.99, cat: 'fashion' },
        { img: 'https://m.media-amazon.com/images/I/71dp23WRANL._AC_UF894,1000_QL80_.jpg', title: 'Modern Sofa', price: 299.99, old: 399.99, cat: 'home' },
        { img: 'https://images-cdn.ubuy.co.in/648a83eaae99a17744598e5c-yoga-mat-thick-pilates-mat-for-women.jpg', title: 'Yoga Mat', price: 19.99, old: 29.99, cat: 'sports' },
        { img: 'https://5.imimg.com/data5/WQ/JK/PC/IOS-93978710/product-jpeg-500x500.png', title: 'Lipstick Set', price: 24.99, old: 34.99, cat: 'beauty' }
>>>>>>> 6218b88b2065df2582a3544557fbdfd0e8c09c35
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
            if (this.dataset.filter === 'electronics') {
                window.location.href = 'electronics.html';
            } else {
                renderProducts(this.dataset.filter);
            }
        };
    });

    // Recently Viewed Products Feature
    const RECENT_VIEW_KEY = 'recentlyViewedProducts';
    const MAX_RECENT_VIEWS = 5; // Limit to 5 recently viewed products

    function getRecentlyViewedProducts() {
        const data = localStorage.getItem(RECENT_VIEW_KEY);
        return data ? JSON.parse(data) : [];
    }

    function addProductToRecentlyViewed(productData) {
        let viewed = getRecentlyViewedProducts();

        // Remove if already exists to move it to the front (most recent)
        viewed = viewed.filter(p => p.id !== productData.id);

        // Add new product to the beginning
        viewed.unshift(productData);

        // Limit the array size
        if (viewed.length > MAX_RECENT_VIEWS) {
            viewed = viewed.slice(0, MAX_RECENT_VIEWS);
        }

        localStorage.setItem(RECENT_VIEW_KEY, JSON.stringify(viewed));
        renderRecentlyViewedProducts(); // Re-render the section
    }

    function renderRecentlyViewedProducts() {
        const recentlyViewedGrid = document.getElementById('recently-viewed-grid');
        const noRecentViewsMsg = document.getElementById('no-recent-views'); // Get the empty message element
        const viewedProducts = getRecentlyViewedProducts();

        if (viewedProducts.length === 0) {
            recentlyViewedGrid.innerHTML = '<p class="empty-message" id="no-recent-views">No recently viewed products yet.</p>'; // Ensure ID is present if re-added
            return;
        }

        // If products exist, ensure the empty message is removed
        if (noRecentViewsMsg) {
            noRecentViewsMsg.remove();
        }

        // Generate product cards for recently viewed items
        recentlyViewedGrid.innerHTML = viewedProducts.map(p => `
            <div class="product-card">
                <img src="${p.img}" alt="${p.title}">
                <div class="product-title">${p.title}</div>
                <div class="product-rating">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}</div>
                <div>
                    <span class="product-price">$${p.price.toFixed(2)}</span>
                    ${p.old ? `<span class="product-old-price">$${p.old.toFixed(2)}</span>` : ''}
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

    // Call render on page load to display any previously viewed products
    renderRecentlyViewedProducts();
});


<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);
=======

    document.addEventListener('DOMContentLoaded', () => {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollToTopBtn);
>>>>>>> 6218b88b2065df2582a3544557fbdfd0e8c09c35

    const toggleScrollButton = () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleScrollButton);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });
<<<<<<< HEAD
});
=======

>>>>>>> 6218b88b2065df2582a3544557fbdfd0e8c09c35
