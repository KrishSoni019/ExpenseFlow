// Profile Settings Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeParticles();
    initializeGradientOrb();
    initializeForm();
    initializeAvatarInitials();
});

// Initialize Floating Particles
function initializeParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;

    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 6 + Math.random() * 4;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: 2px;
            height: 2px;
            background: rgba(245, 158, 11, 0.4);
            border-radius: 50%;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        container.appendChild(particle);
    }
}

// Initialize Mouse-tracking Gradient Orb
function initializeGradientOrb() {
    const orb = document.getElementById('gradientOrb');
    if (!orb) return;

    document.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        orb.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
    });
}

// Initialize Avatar with User Initial
function initializeAvatarInitials() {
    const fullnameInput = document.getElementById('fullname');
    const userAvatar = document.getElementById('userAvatar');
    const largeAvatar = document.getElementById('largeAvatar');

    if (!fullnameInput) return;

    function updateAvatars() {
        const name = fullnameInput.value.trim();
        if (!name) return; // ⛔ don’t override backend value

        const initial = name.charAt(0).toUpperCase();

        if (userAvatar) userAvatar.textContent = initial;
        if (largeAvatar) largeAvatar.textContent = initial;
    }

    // Update only when user types
    fullnameInput.addEventListener('input', updateAvatars);
}


// Form Validation and Submission
function initializeForm() {
    const form = document.getElementById('profileForm');
    const fullnameInput = document.getElementById('fullname');
    const passwordInput = document.getElementById('password');
    const saveBtn = document.getElementById('saveBtn');
    const nameError = document.getElementById('nameError');
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');
    const errorMessage = document.getElementById('errorMessage');
    const loadingOverlay = document.getElementById('loadingOverlay');


    // Real-time validation for name
    fullnameInput.addEventListener('blur', function() {
        validateName();
        updateSaveButtonState();
    });

    fullnameInput.addEventListener('input', function() {
        nameError.textContent = '';
        nameError.classList.remove('show');
        updateSaveButtonState();
    });

    // Update save button state
    function updateSaveButtonState() {
        const isValid = fullnameInput.value.trim().length > 0 && 
                        !fullnameInput.value.trim().match(/^\s+$/);
        saveBtn.disabled = !isValid;
    }

    // Validate name field
    function validateName() {
        const value = fullnameInput.value.trim();
        
        if (!value) {
            nameError.textContent = 'Name cannot be empty';
            nameError.classList.add('show');
            return false;
        }
        
        if (/^\s+$/.test(fullnameInput.value)) {
            nameError.textContent = 'Name cannot contain only spaces';
            nameError.classList.add('show');
            return false;
        }
        
        nameError.textContent = '';
        nameError.classList.remove('show');
        return true;
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        // Only frontend validation
        if (!validateName()) {
            e.preventDefault();
            return;
        }

        // Let Spring handle submit
        loadingOverlay.style.display = 'flex';
    });

    function showSuccess(message) {
        document.getElementById('successMessage').textContent = message;
        successAlert.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 5000);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorAlert.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorAlert.style.display = 'none';
        }, 5000);
    }

    // Initialize button state
    updateSaveButtonState();
}

// Add float animation if not already in CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
    }
`;
document.head.appendChild(style);
