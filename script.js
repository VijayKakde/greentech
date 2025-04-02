// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
const previewContainer = document.getElementById('previewContainer');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Mock Data (In a real application, this would come from a backend)
let userPoints = 0;
let totalTrash = 0;
let activeUsers = 0;
let totalPoints = 0;

// Initialize counters
function initializeCounters() {
    updateCounter('totalTrash', totalTrash);
    updateCounter('activeUsers', activeUsers);
    updateCounter('totalPoints', totalPoints);
    updateCounter('userPoints', userPoints);
}

// Add scroll progress bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// Enhanced counter animation with easing
function updateCounter(elementId, value) {
    const element = document.getElementById(elementId);
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    element.classList.add('loading');
    
    const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    
    const timer = setInterval(() => {
        current += increment;
        const progress = current / value;
        const easedProgress = easeOutExpo(progress);
        
        if (current >= value) {
            element.textContent = value;
            clearInterval(timer);
            element.classList.remove('loading');
        } else {
            element.textContent = Math.floor(value * easedProgress);
        }
    }, duration / steps);
}

// File Upload Handling
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(particle);
    }
}

// Enhanced file upload animation
function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                previewImage.style.animation = 'scaleIn 0.5s ease-out';
                
                // Add loading animation to upload area
                dropZone.classList.add('loading');
                
                // Create progress bar
                const progressBar = document.createElement('div');
                progressBar.className = 'upload-progress';
                dropZone.appendChild(progressBar);
                
                // Simulate upload progress
                let progress = 0;
                const progressInterval = setInterval(() => {
                    progress += 5;
                    progressBar.style.width = `${progress}%`;
                    
                    if (progress >= 100) {
                        clearInterval(progressInterval);
                        setTimeout(() => {
                            progressBar.remove();
                            dropZone.classList.remove('loading');
                            awardPoints();
                        }, 500);
                    }
                }, 100);
            };
            reader.readAsDataURL(file);
        } else {
            showNotification('Please upload an image file.', 'error');
        }
    }
}

// Points System
function awardPoints() {
    const points = Math.floor(Math.random() * 50) + 10; // Random points between 10-60
    userPoints += points;
    totalTrash++;
    totalPoints += points;
    
    // Update counters
    updateCounter('userPoints', userPoints);
    updateCounter('totalTrash', totalTrash);
    updateCounter('totalPoints', totalPoints);
    
    // Add to points history
    addToPointsHistory(points);
    
    // Show success message
    showNotification(`Congratulations! You earned ${points} points!`);
}

function addToPointsHistory(points) {
    const historyList = document.getElementById('pointsHistory');
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const li = document.createElement('li');
    li.textContent = `+${points} points - ${date} ${time}`;
    historyList.insertBefore(li, historyList.firstChild);
}

// Enhanced notification system with icons and animations
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    notification.appendChild(icon);
    
    const text = document.createElement('span');
    text.textContent = message;
    notification.appendChild(text);
    
    document.body.appendChild(notification);
    
    // Add show animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Add hide animation
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Mobile Navigation
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        setTimeout(() => {
            navLinks.classList.add('show');
        }, 10);
    } else {
        navLinks.classList.remove('show');
        setTimeout(() => {
            navLinks.style.display = 'none';
        }, 300);
    }
});

// Smooth Scrolling
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

// Leaderboard Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateLeaderboard(btn.dataset.period);
    });
});

function updateLeaderboard(period) {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';
    
    const mockData = [
        { name: 'Aditi Sant', points: 1200 },
        { name: 'Shrutika Bhapkar', points: 950 },
        { name: 'Arti Maher', points: 800 },
        { name: 'Amey Talpe', points: 750 },
        { name: 'Shruti Waghmaitar ', points: 700 }
    ];
    
    mockData.forEach((user, index) => {
        const li = document.createElement('div');
        li.className = 'leaderboard-item';
        li.style.animationDelay = `${index * 0.1}s`;
        li.innerHTML = `
            <span class="rank">#${index + 1}</span>
            <span class="name">${user.name}</span>
            <span class="points">${user.points} points</span>
        `;
        leaderboardList.appendChild(li);
    });
}

// Add scroll reveal animations
const scrollReveal = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, scrollReveal);

// Observe elements for scroll animations
document.querySelectorAll('.stat-item, .upload-area, .points-card, .rewards-grid, .leaderboard-item').forEach(el => {
    observer.observe(el);
});

// Enhanced reward card animations and functionality
function initializeRewards() {
    const rewardsGrid = document.getElementById('rewardsGrid');
    const rewards = [
        { name: 'Eco-Friendly Bag', points: 100, icon: 'fa-shopping-bag', description: 'Reusable shopping bag made from recycled materials' },
        { name: 'Plant Sapling', points: 200, icon: 'fa-seedling', description: 'Get a free plant sapling to grow at home' },
        { name: 'Reusable Water Bottle', points: 150, icon: 'fa-tint', description: 'Eco-friendly water bottle made from sustainable materials' },
        { name: 'Solar Charger', points: 300, icon: 'fa-solar-panel', description: 'Portable solar charger for your devices' },
        { name: 'Eco-Friendly Tote', points: 250, icon: 'fa-shopping-basket', description: 'Stylish tote bag made from recycled materials' }
    ];

    rewards.forEach((reward, index) => {
        const rewardCard = document.createElement('div');
        rewardCard.className = 'reward-card';
        rewardCard.style.animationDelay = `${index * 0.1}s`;
        rewardCard.innerHTML = `
            <i class="fas ${reward.icon}"></i>
            <h4>${reward.name}</h4>
            <p class="reward-description">${reward.description}</p>
            <div class="reward-points">
                <i class="fas fa-star"></i>
                <span>${reward.points} points</span>
            </div>
            <button class="redeem-btn" data-points="${reward.points}" data-name="${reward.name}">
                <span class="btn-text">Redeem</span>
                <span class="btn-loading">
                    <i class="fas fa-spinner fa-spin"></i>
                </span>
            </button>
        `;
        rewardsGrid.appendChild(rewardCard);
    });
}

// Redeemed Items Functionality
let redeemedItems = [];
let totalPointsSpent = 0;

function updateRedeemedList() {
    const redeemedList = document.getElementById('redeemedList');
    const totalRedeemed = document.getElementById('totalRedeemed');
    const totalPointsSpentElement = document.getElementById('totalPointsSpent');
    
    // Update counters
    updateCounter('totalRedeemed', redeemedItems.length);
    updateCounter('totalPointsSpent', totalPointsSpent);
    
    // Clear existing list
    redeemedList.innerHTML = '';
    
    // Add items to list
    redeemedItems.forEach(item => {
        const redeemedItem = document.createElement('div');
        redeemedItem.className = 'redeemed-item';
        redeemedItem.innerHTML = `
            <div class="redeemed-item-icon">
                <i class="${item.icon}"></i>
            </div>
            <div class="redeemed-item-info">
                <div class="redeemed-item-name">${item.name}</div>
                <div class="redeemed-item-date">Redeemed on ${item.date}</div>
            </div>
            <div class="redeemed-item-points">${item.points} points</div>
        `;
        redeemedList.appendChild(redeemedItem);
    });
    
    // Show empty state if no items
    if (redeemedItems.length === 0) {
        redeemedList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <p>No items redeemed yet</p>
            </div>
        `;
    }
}

// Update the reward redemption functionality to add items to redeemed list
document.addEventListener('click', async (e) => {
    if (e.target.closest('.redeem-btn')) {
        const button = e.target.closest('.redeem-btn');
        const points = parseInt(button.dataset.points);
        const rewardName = button.dataset.name;
        
        // Disable button and show loading state
        button.disabled = true;
        button.classList.add('loading');
        
        // Check if user has enough points
        if (userPoints >= points) {
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Deduct points
                userPoints -= points;
                totalPointsSpent += points;
                updateCounter('userPoints', userPoints);
                
                // Add to redeemed items
                redeemedItems.unshift({
                    name: rewardName,
                    points: points,
                    date: new Date().toLocaleDateString(),
                    icon: button.closest('.reward-card').querySelector('i').className
                });
                
                // Update redeemed list
                updateRedeemedList();
                
                // Add to points history
                addToPointsHistory(-points, `Redeemed ${rewardName}`);
                
                // Show success animation
                button.classList.add('success');
                button.innerHTML = `
                    <span class="btn-text">Redeemed!</span>
                    <i class="fas fa-check"></i>
                `;
                
                // Show success notification
                showNotification(`Successfully redeemed ${rewardName} for ${points} points!`, 'success');
                
                // Reset button after delay
                setTimeout(() => {
                    button.disabled = false;
                    button.classList.remove('loading', 'success');
                    button.innerHTML = `
                        <span class="btn-text">Redeem</span>
                        <span class="btn-loading">
                            <i class="fas fa-spinner fa-spin"></i>
                        </span>
                    `;
                }, 2000);
                
            } catch (error) {
                // Handle error
                button.disabled = false;
                button.classList.remove('loading');
                showNotification('Failed to redeem reward. Please try again.', 'error');
            }
        } else {
            // Not enough points
            button.disabled = false;
            button.classList.remove('loading');
            showNotification(`You need ${points} points to redeem this reward!`, 'error');
            
            // Add shake animation
            button.classList.add('shake');
            setTimeout(() => button.classList.remove('shake'), 500);
        }
    }
});

// Initialize redeemed items list
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initializeCounters();
    updateLeaderboard('weekly');
    initializeRewards();
    updateRedeemedList();
    
    // Add initial animation to logo
    const logo = document.querySelector('.logo');
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        logo.style.transition = 'all 0.8s ease-out';
        logo.style.opacity = '1';
        logo.style.transform = 'translateY(0)';
    }, 100);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Add animation to the form
    contactForm.classList.add('form-submitted');
    
    // Reset the form
    contactForm.reset();
    
    // Remove animation class after animation completes
    setTimeout(() => {
        contactForm.classList.remove('form-submitted');
    }, 300);
});

// Refer a Friend Functionality
const referBtn = document.getElementById('referBtn');
const friendEmail = document.getElementById('friendEmail');

referBtn.addEventListener('click', function() {
    const email = friendEmail.value.trim();
    
    if (!email) {
        showNotification('Please enter your friend\'s email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Add loading state to button
    referBtn.disabled = true;
    referBtn.innerHTML = `
        <span>Sending...</span>
        <i class="fas fa-spinner fa-spin"></i>
    `;
    
    // Simulate sending invitation (replace with actual API call)
    setTimeout(() => {
        // Award points
        userPoints += 50;
        updateCounter('userPoints', userPoints);
        
        // Add to points history
        addToPointsHistory(50, 'Referral bonus');
        
        // Show success message
        showNotification('Invitation sent successfully! You earned 50 points!');
        
        // Reset form
        friendEmail.value = '';
        
        // Reset button
        referBtn.disabled = false;
        referBtn.innerHTML = `
            <span>Send Invitation</span>
            <i class="fas fa-paper-plane"></i>
        `;
    }, 1500);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 

document.getElementById("startEarning").addEventListener("click", function () {
    window.location.href = "#upload";
  });