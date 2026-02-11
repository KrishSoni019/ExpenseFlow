// ================= DOM READY =================
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    loadDashboardData();
});

// ================= LOAD DASHBOARD DATA =================
function loadDashboardData() {
    const now = new Date();
    const month = now.getMonth() + 1; // JS months start from 0
    const year = now.getFullYear();

    fetch(`/api/dashboard?month=${month}&year=${year}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load dashboard');
            }
            return response.json();
        })
        .then(data => {
            // Total amount
            animateCounter('totalAmount', Number(data.totalSpent || 0));

            // Recent expenses
            const list = document.querySelector('.expenses-list');
            list.innerHTML = '';

            if (!data.recentExpenses || data.recentExpenses.length === 0) {
                list.innerHTML = `<p style="opacity:0.6;">No expenses yet</p>`;
                return;
            }

            data.recentExpenses.forEach(exp => {
                const item = document.createElement('div');
                item.className = 'expense-item';
                item.innerHTML = `
                    <div class="expense-details">
                        <div class="expense-name">${exp.description || 'Expense'}</div>
                        <div class="expense-meta">
                            <span class="payment-type">${exp.paymentTypeId}</span>
                            <span class="expense-date">${exp.expenseDate}</span>
                        </div>
                    </div>
                    <div class="expense-amount">₹${exp.amount}</div>
                `;
                list.appendChild(item);
            });
        })
        .catch(err => {
            console.error(err);
        });
}

// ================= DASHBOARD UI =================
function initializeDashboard() {

    // ---------- Month Navigation ----------
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const monthDisplay = document.getElementById('monthDisplay');

    let currentDate = new Date();

    const months = [
        'January','February','March','April','May','June',
        'July','August','September','October','November','December'
    ];

    function updateMonthDisplay() {
        monthDisplay.textContent =
            `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }

    updateMonthDisplay();

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateMonthDisplay();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateMonthDisplay();
    });

    // ---------- Profile Menu ----------
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');

    profileBtn.addEventListener('click', () => {
        profileMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
            profileMenu.classList.remove('active');
        }
    });

    // ---------- Add Expense Modal ----------
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const addExpenseModal = document.getElementById('addExpenseModal');
    const expenseForm = document.getElementById('expenseForm');

    document.getElementById('expenseDate').valueAsDate = new Date();

    addExpenseBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

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

        document.querySelectorAll('.category-option,.payment-pill')
            .forEach(btn => btn.classList.remove('active'));
    }

    // ---------- Category Selection ----------
    let selectedCategory = null;
    document.querySelectorAll('.category-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-option')
                .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedCategory = btn.dataset.category;
        });
    });

    // ---------- Payment Selection ----------
    let selectedPaymentType = null;
    document.querySelectorAll('.payment-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.payment-pill')
                .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedPaymentType = btn.dataset.type;
        });
    });

    // ---------- Submit Expense ----------
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const amount = document.getElementById('expenseAmount').value;
        const date = document.getElementById('expenseDate').value;
        const note = document.getElementById('expenseNote').value;

        if (!amount || !selectedCategory || !selectedPaymentType || !date) {
            alert('Please fill all required fields');
            return;
        }

        fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount,
                category: selectedCategory,
                paymentType: selectedPaymentType,
                date,
                note
            })
        })
            .then(res => {
                if (!res.ok) throw new Error('Save failed');
                return res.json();
            })
            .then(() => {
                closeModal();
                showNotification('Expense added successfully!');
                loadDashboardData();
            })
            .catch(err => {
                alert('Error saving expense');
                console.error(err);
            });

    });

    // ---------- Escape Key ----------
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && addExpenseModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ---------- Notification ----------
    function showNotification(message) {
        const n = document.createElement('div');
        n.textContent = message;
        n.style.cssText = `
            position:fixed;bottom:2rem;left:2rem;
            background:#fbbf24;color:#000;
            padding:1rem 1.5rem;border-radius:.75rem;
            font-weight:600;z-index:999;
        `;
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 3000);
    }
}

// ================= COUNTER =================
function animateCounter(elementId, targetValue) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let value = 0;
    const step = targetValue / 120;

    const interval = setInterval(() => {
        value += step;
        if (value >= targetValue) {
            value = targetValue;
            clearInterval(interval);
        }
        el.textContent = Math.floor(value).toLocaleString('en-IN');
    }, 16);
}
