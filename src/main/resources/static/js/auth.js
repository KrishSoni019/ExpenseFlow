// Authentication Form Handling

// Initialize auth page
document.addEventListener('DOMContentLoaded', () => {
  initializeParticles();
  setupFormHandlers();
  setupPasswordToggles();
});

// Initialize particles for auth pages
function initializeParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 6 + Math.random() * 4;

    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(245, 158, 11, 0.4);
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      animation: float ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
    `;

    particlesContainer.appendChild(particle);
  }
}

// Setup password visibility toggle
function setupPasswordToggles() {
  const toggles = document.querySelectorAll('.password-toggle');
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const input = toggle.previousElementSibling;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      toggle.classList.toggle('visible');
    });
  });
}

// Setup form handlers
function setupFormHandlers() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  if (signupForm) {
    signupForm.addEventListener('submit', handleSignupSubmit);
  }

  // Add real-time validation
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach((input) => {
    input.addEventListener('blur', validateField);
    input.addEventListener('focus', clearFieldError);
  });

  const checkboxes = document.querySelectorAll('.checkbox-input');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', clearFieldError);
  });
}

// Handle login form submission
function handleLoginSubmit(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Clear previous errors
  clearAllErrors();

  // Validation
  let isValid = true;

  if (!email) {
    showFieldError('email', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError('email', 'Please enter a valid email');
    isValid = false;
  }

  if (!password) {
    showFieldError('password', 'Password is required');
    isValid = false;
  } else if (password.length < 6) {
    showFieldError('password', 'Password must be at least 6 characters');
    isValid = false;
  }

  if (isValid) {
    // Simulate successful login
    console.log('[v0] Login attempt:', { email, password });
    submitForm(e.target, 'Signing in...');
  }
}

// Handle signup form submission
function handleSignupSubmit(e) {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsCheckbox = document.getElementById('terms').checked;

  // Clear previous errors
  clearAllErrors();

  // Validation
  let isValid = true;

  if (!fullname) {
    showFieldError('fullname', 'Full name is required');
    isValid = false;
  } else if (fullname.length < 2) {
    showFieldError('fullname', 'Full name must be at least 2 characters');
    isValid = false;
  }

  if (!email) {
    showFieldError('email', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError('email', 'Please enter a valid email');
    isValid = false;
  }

  if (!password) {
    showFieldError('password', 'Password is required');
    isValid = false;
  } else if (password.length < 8) {
    showFieldError('password', 'Password must be at least 8 characters');
    isValid = false;
  }

  if (!confirmPassword) {
    showFieldError('confirmPassword', 'Confirm password is required');
    isValid = false;
  } else if (password !== confirmPassword) {
    showFieldError('confirmPassword', 'Passwords do not match');
    isValid = false;
  }

  if (!termsCheckbox) {
    showFieldError('terms', 'You must agree to the terms');
    isValid = false;
  }

  if (isValid) {
    // Simulate successful signup
    console.log('[v0] Signup attempt:', { fullname, email, password });
    submitForm(e.target, 'Creating account...');
  }
}

// Show field error
function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId}Error`);

  if (input && errorElement) {
    input.classList.add('error');
    errorElement.textContent = message;
  }
}

// Clear field error
function clearFieldError(e) {
  const input = e.target;
  const errorElement = document.getElementById(`${input.id}Error`);

  if (errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
  }
}

// Clear all errors
function clearAllErrors() {
  document.querySelectorAll('.form-error').forEach((error) => {
    error.textContent = '';
  });
  document.querySelectorAll('.form-input').forEach((input) => {
    input.classList.remove('error');
  });
}

// Validate single field
function validateField(e) {
  const input = e.target;
  const value = input.value.trim();

  if (input.id === 'email' && value) {
    if (!isValidEmail(value)) {
      showFieldError('email', 'Invalid email format');
    } else {
      clearFieldError(e);
    }
  }

  if (input.id === 'password' && value) {
    if (value.length < 6) {
      showFieldError('password', 'Password too short');
    } else {
      clearFieldError(e);
    }
  }

  if (input.id === 'confirmPassword') {
    const password = document.getElementById('password').value;
    if (value && password && value !== password) {
      showFieldError('confirmPassword', 'Passwords do not match');
    } else {
      clearFieldError(e);
    }
  }

  if (input.id === 'fullname' && value) {
    if (value.length < 2) {
      showFieldError('fullname', 'Name too short');
    } else {
      clearFieldError(e);
    }
  }
}

// Submit form with loading state
function submitForm(form, loadingText) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  submitBtn.textContent = loadingText;

  // Simulate API call
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    submitBtn.textContent = originalText;
    console.log('[v0] Form submission completed');
  }, 2000);
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
