// Market tabs functionality
function initializeMarketTabs() {
    const tabs = document.querySelectorAll('.tab');
    const marketGrids = document.querySelectorAll('.market-grid');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and grids
            tabs.forEach(t => t.classList.remove('active'));
            marketGrids.forEach(grid => grid.classList.remove('active'));

            // Add active class to clicked tab and corresponding grid
            tab.classList.add('active');
            const targetGrid = document.getElementById(tab.dataset.tab);
            if (targetGrid) {
                targetGrid.classList.add('active');
            }
        });
    });
}

// Search functionality
const searchBar = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchBar.value.trim();
    if (searchTerm) {
        performSearch(searchTerm);
    }
});

searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

function performSearch(searchTerm) {
    // Örnek arama sonuçları
    const results = [
        {
            type: 'account',
            title: 'Valorant Hesabı',
            description: 'Immortal 3 | Tüm Ajanlar | 50+ Skin',
            price: '₺2,499',
            image: 'images/valorant.jpg'
        },
        {
            type: 'item',
            title: 'CS2 Butterfly Knife',
            description: 'Factory New | Fade | Float: 0.001',
            price: '₺12,999',
            image: 'images/csgo-knife.jpg'
        },
        {
            type: 'wiki',
            title: 'GTA 6 Wiki',
            description: 'Karakterler, görevler ve daha fazlası',
            image: 'images/gta6.jpg'
        }
    ];

    showSearchResults(results);
}

function showSearchResults(results) {
    const resultsHTML = results.map(result => `
        <div class="search-result ${result.type}">
            <img src="${result.image}" alt="${result.title}">
            <div class="result-content">
                <div class="result-header">
                    <h3>${result.title}</h3>
                    ${result.price ? `<span class="result-price">${result.price}</span>` : ''}
                </div>
                <p>${result.description}</p>
                <span class="result-type">${result.type}</span>
            </div>
        </div>
    `).join('');

    showModal('Arama Sonuçları', resultsHTML);
}

// Modal functionality
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close button functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();

    // Close on outside click
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Purchase functionality
function initializePurchaseButtons() {
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product-card');
            const productName = product.querySelector('h3').textContent;
            const price = product.querySelector('.price').textContent;
            const features = Array.from(product.querySelectorAll('.features li'))
                .map(li => li.textContent)
                .join(', ');

            showPurchaseForm(productName, price, features);
        });
    });
}

function showPurchaseForm(productName, price, features) {
    const formHTML = `
        <div class="purchase-form">
            <div class="product-summary">
                <h3>${productName}</h3>
                <p class="price">${price}</p>
                <p class="features">${features}</p>
            </div>
            <form id="purchase-form">
                <div class="form-group">
                    <label>E-posta Adresiniz</label>
                    <input type="email" required placeholder="ornek@email.com">
                </div>
                <div class="form-group">
                    <label>Telefon Numaranız</label>
                    <input type="tel" required placeholder="5XX XXX XX XX">
                </div>
                <div class="payment-details">
                    <div class="form-group">
                        <label>Kart Numarası</label>
                        <input type="text" required placeholder="XXXX XXXX XXXX XXXX">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Son Kullanma Tarihi</label>
                            <input type="text" required placeholder="AA/YY">
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="text" required placeholder="XXX">
                        </div>
                    </div>
                </div>
                <button type="submit" class="purchase-button">Güvenli Ödeme</button>
            </form>
        </div>
    `;

    showModal('Satın Al', formHTML);

    // Form submission
    const form = document.getElementById('purchase-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showModal('Başarılı', `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Satın Alma İşlemi Başarılı!</h3>
                <p>Satın aldığınız ürünün bilgileri e-posta adresinize gönderilecektir.</p>
            </div>
        `);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');

    // Add dropdown functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
}

// Initialize all functionalities
document.addEventListener('DOMContentLoaded', () => {
    initializeMarketTabs();
    initializePurchaseButtons();
    initializeMobileMenu();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-links')?.classList.remove('mobile-open');
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Premium Üyelik İşlemleri
document.addEventListener('DOMContentLoaded', function() {
    const planButtons = document.querySelectorAll('.select-plan-button');
    const signupForm = document.getElementById('signupForm');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.querySelector('.credit-card-details');
    let selectedPlan = null;

    // Plan seçimi
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedPlan = this.dataset.plan;
            signupForm.style.display = 'block';
            signupForm.scrollIntoView({ behavior: 'smooth' });
            
            // Seçilen planı vurgula
            planButtons.forEach(btn => {
                btn.parentElement.classList.remove('selected');
            });
            this.parentElement.classList.add('selected');
        });
    });

    // Ödeme yöntemi değişimi
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });

    // Kredi kartı numarası formatı
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    // Son kullanma tarihi formatı
    const expiry = document.getElementById('expiry');
    if (expiry) {
        expiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV formatı
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            e.target.value = value.slice(0, 3);
        });
    }

    // Form gönderimi
    const form = document.querySelector('.signup-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(this);
            formData.append('plan', selectedPlan);

            // Yükleniyor göstergesi
            const submitButton = this.querySelector('.submit-button');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İşleniyor...';

            // API'ye gönder (örnek)
            setTimeout(() => {
                // Başarılı işlem simülasyonu
                showNotification('Üyeliğiniz başarıyla oluşturuldu!', 'success');
                submitButton.disabled = false;
                submitButton.innerHTML = 'Üyeliği Başlat';
                
                // Kullanıcıyı yönlendir
                setTimeout(() => {
                    window.location.href = '/dashboard.html';
                }, 2000);
            }, 2000);
        });
    }
});

// Bildirim gösterme fonksiyonu
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <p>${message}</p>
        </div>
    `;

    document.body.appendChild(notification);

    // Animasyon ekle
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Bildirimi kaldır
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Sayfa yüklendiğinde URL parametrelerini kontrol et
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    
    if (plan) {
        const planButton = document.querySelector(`[data-plan="${plan}"]`);
        if (planButton) {
            planButton.click();
        }
    }
});

// Hero Section Animations
document.addEventListener('DOMContentLoaded', () => {
    // Particle.js initialization
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + 'K+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + 'K+';
            }
        };

        updateCounter();
    });

    // Smooth Scroll for Navigation Links
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

    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade, .animate-title, .animate-stats, .animate-buttons');
    animatedElements.forEach(el => observer.observe(el));
});

// Login ve Register butonları için event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Giriş Yap butonu
    const loginButton = document.querySelector('a[href="pages/login.html"]');
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'pages/login.html';
        });
    }

    // Kayıt Ol butonu
    const registerButton = document.querySelector('a[href="pages/register.html"]');
    if (registerButton) {
        registerButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'pages/register.html';
        });
    }
});

// Auth section güncelleme fonksiyonu
function updateAuthSection() {
    const authSection = document.querySelector('.auth-section');
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const username = localStorage.getItem('username');

    if (isLoggedIn && username) {
        // Premium üye kontrolü
        const premiumUsers = JSON.parse(localStorage.getItem('premiumUsers') || '[]');
        const isPremium = premiumUsers.some(user => user.username === username);

        const userIcon = isPremium ? 'fa-crown' : 'fa-user';
        const userType = isPremium ? 'Premium' : 'Üye';
        const bgColor = isPremium ? '#FFD700' : '#7B68EE';
        const bgColorEnd = isPremium ? '#FFA500' : '#6A5ACD';
        const shadowColor = isPremium ? '255, 215, 0' : '123, 104, 238';

        authSection.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; background: linear-gradient(135deg, rgba(123, 104, 238, 0.15) 0%, rgba(87, 73, 169, 0.15) 100%); padding: 8px 16px; border-radius: 20px; border: 1px solid rgba(123, 104, 238, 0.3); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; margin-left: -150px; backdrop-filter: blur(5px);">
                <div style="width: 35px; height: 35px; background: linear-gradient(135deg, ${bgColor} 0%, ${bgColorEnd} 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(${shadowColor}, 0.3);">
                    <i class="fas ${userIcon}" style="color: white; font-size: 16px;"></i>
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    <span style="color: white; font-weight: 600; font-size: 14px; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);">${username}</span>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <span style="color: ${bgColor}; font-size: 11px; font-weight: 500; background: rgba(${shadowColor}, 0.1); padding: 2px 8px; border-radius: 10px;">
                            ${userType}
                        </span>
                    </div>
                </div>
                <button onclick="logout()" style="background: rgba(123, 104, 238, 0.1); border: none; color: #7B68EE; cursor: pointer; padding: 8px; border-radius: 12px; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; margin-left: 8px;">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-left: -170px;">
                <a href="pages/login.html" class="auth-button login" style="background: #6c5ce7; color: white; padding: 10px 30px; border-radius: 5px; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 5px; font-size: 16px;">
                    <i class="fas fa-sign-in-alt"></i>Giriş</a>
                <a href="pages/register.html" class="auth-button register" style="background: #6c5ce7; color: white; padding: 10px 30px; border-radius: 5px; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 5px; font-size: 16px;">
                    <i class="fas fa-user-plus"></i>Kayıt</a>
            </div>
        `;
    }
}

// Çıkış yapma fonksiyonu
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Sayfa yüklendiğinde auth section'ı güncelle
document.addEventListener('DOMContentLoaded', updateAuthSection);

// Market functionality
const marketProducts = [
    {
        id: 1,
        category: 'game-accounts',
        name: 'Valorant Immortal Hesabı',
        badge: 'Premium',
        image: '../EGS_VALORANT_RiotGames_S1_2560x1440-6608fb6c4c56c07b9a7caa34c6e6ee37.jpeg',
        features: [
            { icon: 'trophy', text: 'Rank: Immortal 3' },
            { icon: 'user-check', text: 'Tüm Ajanlar Açık' },
            { icon: 'palette', text: '50+ Skin' },
            { icon: 'star', text: 'Beta Oyuncusu' }
        ],
        originalPrice: 2999,
        price: 2499
    },
    {
        id: 2,
        category: 'game-accounts',
        name: 'Valorant Radiant Hesabı',
        badge: 'VIP',
        image: '../EGS_VALORANT_RiotGames_S1_2560x1440-6608fb6c4c56c07b9a7caa34c6e6ee37.jpeg',
        features: [
            { icon: 'trophy', text: 'Rank: Radiant' },
            { icon: 'user-check', text: 'Tüm Ajanlar' },
            { icon: 'palette', text: '100+ Skin' },
            { icon: 'crown', text: 'Nadir Koleksiyon' }
        ],
        originalPrice: 3999,
        price: 3499
    },
    {
        id: 3,
        category: 'game-accounts',
        name: 'Valorant Diamond Hesabı',
        badge: 'Doğrulanmış',
        image: '../EGS_VALORANT_RiotGames_S1_2560x1440-6608fb6c4c56c07b9a7caa34c6e6ee37.jpeg',
        features: [
            { icon: 'trophy', text: 'Rank: Diamond 2' },
            { icon: 'user-check', text: '15+ Ajan' },
            { icon: 'palette', text: '25+ Skin' },
            { icon: 'star', text: 'Battlepass Skinleri' }
        ],
        originalPrice: 1499,
        price: 1199
    },
    {
        id: 4,
        category: 'game-accounts',
        name: 'Epic Games Premium Hesap',
        badge: 'Premium',
        image: '../epic-games-store-my-achievements-update-april-2022-1920x1080-9bac47fb382b.jpg',
        features: [
            { icon: 'gamepad', text: '200+ Oyun' },
            { icon: 'gift', text: 'GTA V + RDR2' },
            { icon: 'clock', text: '5 Yıllık Hesap' },
            { icon: 'box', text: 'Özel İçerikler' }
        ],
        originalPrice: 1999,
        price: 1499
    },
    {
        id: 5,
        category: 'gaming-equipment',
        name: 'ASUS ROG Strix G15',
        badge: 'Premium',
        image: '71QCqjg5j8L.jpg',
        features: [
            { icon: 'microchip', text: 'RTX 4070' },
            { icon: 'memory', text: '16GB RAM' },
            { icon: 'hdd', text: '1TB NVMe SSD' },
            { icon: 'laptop', text: '240Hz Ekran' }
        ],
        originalPrice: 54999,
        price: 49999
    },
    {
        id: 6,
        category: 'gaming-equipment',
        name: 'Razer DeathAdder V3',
        badge: 'Yeni',
        image: '61P+sPNpFFL.jpg',
        features: [
            { icon: 'mouse', text: '30K DPI Sensör' },
            { icon: 'weight', text: '63g Ultra Hafif' },
            { icon: 'bolt', text: '8000Hz Polling' },
            { icon: 'clock', text: '2 Yıl Garanti' }
        ],
        originalPrice: 1999,
        price: 1699
    },
    {
        id: 7,
        category: 'game-accounts',
        name: 'Epic Games Deluxe Hesap',
        badge: 'Özel',
        image: '../epic-games-store-my-achievements-update-april-2022-1920x1080-9bac47fb382b.jpg',
        features: [
            { icon: 'gamepad', text: '150+ Oyun' },
            { icon: 'gift', text: 'Fortnite Özel' },
            { icon: 'clock', text: '3 Yıllık Hesap' },
            { icon: 'box', text: 'Nadir Skinler' }
        ],
        originalPrice: 1699,
        price: 1299
    },
    {
        id: 8,
        category: 'game-accounts',
        name: 'Epic Games Plus Hesap',
        badge: 'Yeni',
        image: 'epic-games-store-my-achievements-update-april-2022-1920x1080-9bac47fb382b.jpg',
        features: [
            { icon: 'gamepad', text: '100+ Oyun' },
            { icon: 'gift', text: 'FIFA 23 + NBA 2K23' },
            { icon: 'clock', text: '4 Yıllık Hesap' },
            { icon: 'box', text: 'Premium İçerikler' }
        ],
        originalPrice: 1499,
        price: 1199
    },
    {
        id: 9,
        category: 'game-accounts',
        name: 'Epic Games Basic Hesap',
        badge: 'Doğrulanmış',
        image: 'epic-games-store-my-achievements-update-april-2022-1920x1080-9bac47fb382b.jpg',
        features: [
            { icon: 'gamepad', text: '25+ Oyun' },
            { icon: 'gift', text: 'Ücretsiz Oyunlar' },
            { icon: 'clock', text: '1 Yıllık Hesap' },
            { icon: 'box', text: 'Temel Paket' }
        ],
        originalPrice: 599,
        price: 399
    },
    {
        id: 10,
        category: 'game-accounts',
        name: 'Epic Games Ultra Hesap',
        badge: 'VIP',
        image: 'epic-games-store-my-achievements-update-april-2022-1920x1080-9bac47fb382b.jpg',
        features: [
            { icon: 'gamepad', text: '300+ Oyun' },
            { icon: 'gift', text: 'Tüm AAA Oyunlar' },
            { icon: 'clock', text: '6 Yıllık Hesap' },
            { icon: 'crown', text: 'VIP Koleksiyon' }
        ],
        originalPrice: 4999,
        price: 3999
    },
    {
        id: 11,
        category: 'game-accounts',
        name: 'Epic Games Starter Hesap',
        badge: 'Yeni Başlangıç',
        image: 'epic-games-store-my-achievements-update-april-2022-1920x1080-9bac47fb382b.jpg',
        features: [
            { icon: 'gamepad', text: '10+ Oyun' },
            { icon: 'gift', text: 'Başlangıç Paketi' },
            { icon: 'clock', text: '6 Aylık Hesap' },
            { icon: 'star', text: 'Temel Oyunlar' }
        ],
        originalPrice: 299,
        price: 199
    }
];

function loadMarketProducts() {
    const marketGrid = document.querySelector('.market-grid');
    if (!marketGrid) return;

    marketGrid.innerHTML = marketProducts.map(product => `
        <article class="product-card" data-category="${product.category}" data-price="${product.price}">
            <div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <h3>${product.name}</h3>
                <ul class="features">
                    ${product.features.map(feature => `
                        <li><i class="fas fa-${feature.icon}"></i> ${feature.text}</li>
                    `).join('')}
                </ul>
                <div class="product-footer">
                    <div class="price-info">
                        <span class="original-price">₺${product.originalPrice}</span>
                        <p class="price">₺${product.price}</p>
                    </div>
                    <button class="buy-button">Satın Al</button>
                </div>
            </div>
        </article>
    `).join('');

    initializePurchaseButtons();
}

function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const priceSort = document.getElementById('price-filter').value;
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productCategory = product.dataset.category;
        if (category === 'all' || category === productCategory) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });

    const visibleProducts = Array.from(products).filter(p => p.style.display !== 'none');
    if (priceSort === 'low-to-high') {
        visibleProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    } else if (priceSort === 'high-to-low') {
        visibleProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    }
    
    const container = document.querySelector('.market-grid');
    visibleProducts.forEach(product => container.appendChild(product));
}

// Initialize market functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadMarketProducts();
    
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (priceFilter) priceFilter.addEventListener('change', filterProducts);
});

// Oyun detaylarını gösterme fonksiyonu
function showGameDetails(gameId) {
    // Tüm detay bölümlerini gizle
    const allDetails = document.querySelectorAll('.game-detail-section');
    allDetails.forEach(detail => detail.style.display = 'none');

    // Seçilen oyunun detaylarını göster
    const selectedGame = document.getElementById(`${gameId}-details`);
    if (selectedGame) {
        selectedGame.style.display = 'block';
    }
}

// Oyun kartları için stil ve animasyon
document.addEventListener('DOMContentLoaded', function() {
    // Oyun kartlarını seç
    const gameCards = document.querySelectorAll('.game-card');
    
    // Her karta hover efektleri ekle
    gameCards.forEach(card => {
        // Kart üzerine gelindiğinde
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
            
            // Resmi bul ve efekt uygula
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
                img.style.filter = 'brightness(0.7)';
            }

            // Kategori etiketini bul ve efekt uygula
            const category = this.querySelector('.game-category');
            if (category) {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }
        });

        // Karttan çıkıldığında
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            
            // Resmi bul ve efektleri kaldır
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(0.8)';
            }

            // Kategori etiketini bul ve efektleri kaldır
            const category = this.querySelector('.game-category');
            if (category) {
                category.style.opacity = '0.8';
                category.style.transform = 'translateY(5px)';
            }
        });
    });

    // Filtreleme işlevselliği
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktif buton stilini güncelle
            filterButtons.forEach(btn => {
                btn.style.background = '#2d3436';
                btn.style.borderColor = 'transparent';
            });
            this.style.background = '#1a1d21';
            this.style.borderColor = '#6c5ce7';
            
            // Seçilen kategoriyi al
            const category = this.textContent.trim().toLowerCase();
            
            // Kartları filtrele
            gameCards.forEach(card => {
                const cardCategory = card.querySelector('.game-category').textContent.trim().toLowerCase();
                
                if (category === 'tümü' || cardCategory.includes(category)) {
                    // Görünür yap
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    // Gizle
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                }
            });
        });
    });

    // Oyun kartlarına animasyonlu giriş efekti
    function animateCards() {
        gameCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Sayfa yüklendiğinde animasyonu başlat
    animateCards();
});

// Stil değişikliklerini uygula
const style = document.createElement('style');
style.textContent = `
    .game-card {
        position: relative;
        background: #1a1d21;
        border-radius: 12px;
        overflow: hidden;
        text-decoration: none;
        transition: all 0.3s ease;
        aspect-ratio: 4/3;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        opacity: 0;
        transform: translateY(20px);
    }

    .game-image {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .game-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.8);
        transition: all 0.3s ease;
    }

    .game-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8));
    }

    .game-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.2rem;
        z-index: 1;
    }

    .game-content h3 {
        color: white;
        font-size: 1.5rem;
        margin: 0 0 0.5rem 0;
        font-weight: 600;
    }

    .game-category {
        display: inline-block;
        color: rgba(255,255,255,0.8);
        font-size: 0.9rem;
        padding: 0.3rem 0.8rem;
        border-radius: 4px;
        transition: all 0.3s ease;
        opacity: 0.8;
        transform: translateY(5px);
    }

    .filter-btn {
        padding: 0.8rem 1.5rem;
        background: #2d3436;
        color: white;
        border: 2px solid transparent;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .filter-btn:hover {
        background: #1a1d21;
        border-color: #6c5ce7;
    }

    .filter-btn.active {
        background: #1a1d21;
        border-color: #6c5ce7;
    }

    /* Kategori renkleri */
    .game-category[data-category="fps"] { background: rgba(231, 76, 60, 0.3); }
    .game-category[data-category="moba"] { background: rgba(108, 92, 231, 0.3); }
    .game-category[data-category="rpg"] { background: rgba(46, 204, 113, 0.3); }
    .game-category[data-category="battle-royale"] { background: rgba(241, 196, 15, 0.3); }
    .game-category[data-category="sandbox"] { background: rgba(52, 152, 219, 0.3); }
`;

document.head.appendChild(style);

// Menü hizalama
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    const authSection = document.querySelector('.auth-section');
    
    if (navLinks && logo && authSection) {
        navLinks.style.marginLeft = '2rem';
        logo.style.marginRight = '2rem';
        logo.style.marginLeft = '0';
        authSection.style.marginLeft = 'auto';
        authSection.style.marginRight = '1rem';
    }
});

// Resim yükleme fonksiyonu
function preloadImages() {
    const valorantImage = new Image();
    valorantImage.src = 'EGS_VALORANT_RiotGames_S1_2560x1440-6608fb6c4c56c07b9a7caa34c6e6ee37.jpeg';
    
    const images = document.querySelectorAll('img[src*="VALORANT"]');
    images.forEach(img => {
        img.style.opacity = '0';
        img.onload = function() {
            this.style.transition = 'opacity 0.3s ease-in';
            this.style.opacity = '1';
        }
        img.onerror = function() {
            this.onerror = null;
            this.src = 'valorant-keyart.jpg';
        }
    });
}

// Sayfa yüklendiğinde resimleri yükle
document.addEventListener('DOMContentLoaded', preloadImages);

// Görünürlük API'sini kullanarak resimleri kontrol et
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        }
    });
}, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
});

// Tüm resimleri gözlemle
document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));

const epicGamesImage = "../epic-games-store-my-achievements-update-april-2022-1920x1080-9bac47fb382b.jpg";
const epicGamesPlusImage = "../71QCqjg5j8L.jpg";

// Epic Games hesap kartlarını oluşturma
function createEpicGamesCards() {
    const epicAccounts = [
        {
            title: 'Epic Games Ultra Hesap',
            games: '500+ Oyun',
            age: '7 Yıllık Hesap',
            description: 'Premium içerikler ve özel koleksiyonlar'
        },
        {
            title: 'Epic Games Plus Hesap',
            games: '300+ Oyun',
            age: '4 Yıllık Hesap',
            description: 'Zengin oyun kütüphanesi'
        },
        {
            title: 'Epic Games Starter Hesap',
            games: '100+ Oyun',
            age: '2 Yıllık Hesap',
            description: 'Başlangıç seviyesi hesap'
        },
        {
            title: 'Epic Games Basic Hesap',
            games: '50+ Oyun',
            age: '1 Yıllık Hesap',
            description: 'Temel oyun paketi'
        }
    ];

    epicAccounts.forEach(account => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <div class="game-image">
                <img src="../71QCqjg5j8L.jpg" alt="${account.title}">
            </div>
            <div class="game-content">
                <span class="game-category">
                    <i class="fas fa-gamepad"></i>
                    ${account.title}
                </span>
                <h3 class="game-title">${account.title}</h3>
                <div class="game-stats">
                    <span class="stat">
                        <i class="fas fa-users"></i>
                        ${account.games}
                    </span>
                    <span class="stat">
                        <i class="fas fa-star"></i>
                        ${account.age}
                    </span>
                </div>
                <p class="game-description">
                    ${account.description}
                </p>
                <div class="game-actions">
                    <button class="play-button">
                        <i class="fas fa-play"></i>
                        Satın Al
                    </button>
                </div>
            </div>
        `;
        document.querySelector('.market-grid').appendChild(card);
    });
}

// Epic Games Deluxe hesap kartını oluşturma
function createEpicGamesDeluxeCard() {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <div class="game-image">
            <img src="../71QCqjg5j8L.jpg" alt="Epic Games Deluxe Hesap">
        </div>
        <div class="game-content">
            <span class="game-category">
                <i class="fas fa-gamepad"></i>
                Epic Games Deluxe Hesap
            </span>
            <h3 class="game-title">Epic Games Deluxe Hesap</h3>
            <div class="game-stats">
                <span class="stat">
                    <i class="fas fa-users"></i>
                    150+ Oyun
                </span>
                <span class="stat">
                    <i class="fas fa-star"></i>
                    3 Yıllık Hesap
                </span>
            </div>
            <p class="game-description">
                Nadir Skinler
            </p>
            <div class="game-actions">
                <button class="play-button">
                    <i class="fas fa-play"></i>
                    Satın Al
                </button>
            </div>
        </div>
    `;
    document.querySelector('.market-grid').appendChild(card);
}

// Epic Games Plus hesap kartını oluşturma
function createEpicGamesPlusCard() {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <div class="game-image">
            <img src="${epicGamesPlusImage}" alt="Epic Games Plus Hesap" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="game-content">
            <span class="game-category">
                <i class="fas fa-gamepad"></i>
                Epic Games Plus Hesap
            </span>
            <h3 class="game-title">Epic Games Plus Hesap</h3>
            <div class="game-stats">
                <span class="stat">
                    <i class="fas fa-users"></i>
                    300+ Oyun
                </span>
                <span class="stat">
                    <i class="fas fa-star"></i>
                    4 Yıllık Hesap
                </span>
            </div>
            <p class="game-description">
                Zengin oyun kütüphanesi
            </p>
            <div class="game-actions">
                <button class="play-button">
                    <i class="fas fa-play"></i>
                    Satın Al
                </button>
            </div>
        </div>
    `;
    document.querySelector('.market-grid').appendChild(card);
}

// Sayfa yüklendiğinde kartları ekle
window.onload = function() {
    createEpicGamesCards();
    createEpicGamesDeluxeCard();
    createEpicGamesPlusCard();
};
