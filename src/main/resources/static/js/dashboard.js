// Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

function initializeDashboard() {
    // Month Navigation
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const monthDisplay = document.getElementById('monthDisplay');

    let currentDate = new Date(2026, 1); // February 2026

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    function updateMonthDisplay() {
        const month = months[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        monthDisplay.textContent = `${month} ${year}`;
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateMonthDisplay();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateMonthDisplay();
    });

    // Animate Amount Counter
    animateCounter('totalAmount', 18400);

    // Profile Menu Toggle
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');

    profileBtn.addEventListener('click', () => {
        profileMenu.classList.toggle('active');
    });

    // Close profile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
            profileMenu.classList.remove('active');
        }
    });

    // Add Expense Modal
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const addExpenseModal = document.getElementById('addExpenseModal');
    const expenseForm = document.getElementById('expenseForm');

    // Set today's date as default
    const today = new Date();
    document.getElementById('expenseDate').valueAsDate = today;

    addExpenseBtn.addEventListener('click', () => {
        openModal();
    });

    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    modalOverlay.addEventListener('click', () => {
        closeModal();
    });

    function openModal() {
        addExpenseModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        addExpenseModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        expenseForm.reset();
        document.getElementById('expenseDate').valueAsDate = new Date();
        // Reset active states
        document.querySelectorAll('.category-option').forEach((btn) => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.payment-pill').forEach((btn) => {
            btn.classList.remove('active');
        });
    }

    // Category Selection
    const categoryOptions = document.querySelectorAll('.category-option');
    let selectedCategory = null;

    categoryOptions.forEach((option) => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            categoryOptions.forEach((btn) => btn.classList.remove('active'));
            option.classList.add('active');
            selectedCategory = option.dataset.category;
        });
    });

    // Payment Type Selection
    const paymentPills = document.querySelectorAll('.payment-pill');
    let selectedPaymentType = null;

    paymentPills.forEach((pill) => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            paymentPills.forEach((btn) => btn.classList.remove('active'));
            pill.classList.add('active');
            selectedPaymentType = pill.dataset.type;
        });
    });

    // Form Submission
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const amount = document.getElementById('expenseAmount').value;
        const date = document.getElementById('expenseDate').value;
        const note = document.getElementById('expenseNote').value;

        if (!amount || !selectedCategory || !selectedPaymentType || !date) {
            alert('Please fill in all required fields');
            return;
        }

        // Log the expense data
        console.log({
            amount,
            category: selectedCategory,
            paymentType: selectedPaymentType,
            date,
            note,
        });

        // Close modal and reset form
        closeModal();

        // Show success message
        showNotification('Expense added successfully!');
    });

    // Keyboard navigation - Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && addExpenseModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Notification System
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      background: linear-gradient(135deg, #f59e0b, #fbbf24);
      color: #000;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      font-weight: 600;
      z-index: 400;
      animation: slideUp 0.3s ease-out;
    `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideDown 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Animate Counter
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const element2 = element.closest('.metric-amount') ? element : null;

    if (!element) return;

    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60fps

    const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(interval);
        }
        element.textContent = currentValue.toLocaleString('en-IN', {
            maximumFractionDigits: 0,
        });
    }, 16);
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animations for expense items on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slide-up 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.expense-item').forEach((item) => {
    observer.observe(item);
});
