// DOM Elements
const loginForm = document.getElementById('loginForm');
const showSignupBtn = document.getElementById('showSignup');

// Form Submission Handler
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const city = document.getElementById('city').value;
    const municipal = document.getElementById('municipal').value;
    const complaintType = document.getElementById('complaintType').value;
    const description = document.getElementById('description').value;

    // Here you would typically validate the form and send the data to your backend
    // For now, we'll just simulate a successful login and redirect to the main page
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        // Store user data in localStorage (in a real app, you'd use a proper authentication system)
        const userData = {
            name,
            email,
            city,
            municipal,
            complaintType,
            description,
            isLoggedIn: true
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Redirect to main page
        window.location.href = 'index.html';
    }, 1500);
});

// Show signup form (you can implement this later)
showSignupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Add signup form implementation here
    alert('Sign up functionality coming soon!');
});

// Add form validation and visual feedback
const formInputs = loginForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.add('valid');
        } else {
            this.classList.remove('valid');
        }
    });
});

// Add city-municipal corporation relationship
const citySelect = document.getElementById('city');
const municipalSelect = document.getElementById('municipal');

citySelect.addEventListener('change', function() {
    const selectedCity = this.value;
    municipalSelect.innerHTML = '<option value="">Select Municipal Corporation</option>';
    
    // Update municipal corporations based on selected city
    const municipalOptions = {
        mumbai: ['Brihanmumbai Municipal Corporation'],
        pune: ['Pune Municipal Council', 'Pimpri-chinchwad Municipal Corporation'],
        bangalore: ['Bruhat Bengaluru Mahanagara Palike'],
        chennai: ['Greater Chennai Corporation'],
        kolkata: ['Kolkata Municipal Corporation']
    };

    if (selectedCity && municipalOptions[selectedCity]) {
        municipalOptions[selectedCity].forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.toLowerCase().replace(/\s+/g, '-');
            opt.textContent = option;
            municipalSelect.appendChild(opt);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Wait for initial animations to complete
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        const mainContent = document.querySelector('.main-content');

        // Fade out loading screen
        loadingScreen.classList.add('fade-out');

        // Show main content
        mainContent.classList.remove('hidden');
        
        // Add small delay before fading in main content
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 100);

        // Remove loading screen after fade out
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2500); // Total time for leaf animations

    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }   
}); 

document.getElementById("index").addEventListener("click", function () {
    window.location.href = "index.html";
  });