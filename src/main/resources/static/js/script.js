// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeParticles();
  initializeGradientOrb();
  initializeStatCounters();
  addArrowSVGsToLinks();
});

// ===== Particles Animation =====
function initializeParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  // Create 30 particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 6 + Math.random() * 4;

    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    container.appendChild(particle);
  }
}

// ===== Gradient Orb Mouse Tracking =====
function initializeGradientOrb() {
  const orb = document.getElementById('gradientOrb');
  if (!orb) return;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Gentle parallax effect (2% of mouse movement)
    const offsetX = x * 0.02;
    const offsetY = y * 0.02;

    orb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
}

// ===== Animated Stat Counters =====
function initializeStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        animateCounter(entry.target);
        entry.target.dataset.animated = 'true';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((el) => observer.observe(el));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  let current = 0;
  const increment = Math.ceil(target / 110);
  const isDecimal = target % 1 !== 0;

  const animate = () => {
    current += increment;
    if (current >= target) {
      element.textContent = isDecimal ? target.toFixed(1) : target;
    } else {
      element.textContent = isDecimal ? current.toFixed(1) : current;
      requestAnimationFrame(animate);
    }
  };

  animate();
}

// ===== Add Arrow SVGs to Footer Links =====
function addArrowSVGsToLinks() {
  const footerLinks = document.querySelectorAll('.footer-link');

  footerLinks.forEach((link) => {
    // Check if SVG already exists
    if (!link.querySelector('svg')) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'arrow-icon');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');

      const polyline1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      polyline1.setAttribute('points', '5 12 19 12');

      const polyline2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      polyline2.setAttribute('points', '12 5 19 12 12 19');

      svg.appendChild(polyline1);
      svg.appendChild(polyline2);
      link.appendChild(svg);
    }
  });

  const footerSocials = document.querySelectorAll('.footer-social');
  footerSocials.forEach((link) => {
    if (!link.querySelector('svg')) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'arrow-icon');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');

      const polyline1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      polyline1.setAttribute('points', '5 12 19 12');

      const polyline2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      polyline2.setAttribute('points', '12 5 19 12 12 19');

      svg.appendChild(polyline1);
      svg.appendChild(polyline2);
      link.appendChild(svg);
    }
  });
}

// ===== Smooth Scroll Behavior =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ===== Button Interactions =====
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // Add a subtle ripple effect
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    ripple.style.pointerEvents = 'none';

    if (btn.style.position !== 'absolute' && btn.style.position !== 'relative') {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
    }

    btn.appendChild(ripple);

    const animation = ripple.animate(
      [
        { width: '0px', height: '0px', opacity: 1 },
        { width: '500px', height: '500px', opacity: 0 },
      ],
      {
        duration: 600,
        easing: 'ease-out',
      }
    );

    animation.onfinish = () => {
      ripple.remove();
    };
  });
});

// ===== Nav Link Hover Effects =====
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('mouseenter', (e) => {
    if (link.tagName === 'A' || (link.tagName === 'BUTTON' && !link.classList.contains('btn'))) {
      e.target.style.opacity = '1';
    }
  });

  link.addEventListener('mouseleave', (e) => {
    if (link.tagName === 'A' || (link.tagName === 'BUTTON' && !link.classList.contains('btn'))) {
      e.target.style.opacity = '';
    }
  });
});

// ===== Feature Cards Animation on Scroll =====
function initializeFeatureCardsAnimation() {
  const featureCards = document.querySelectorAll('.feature-card, .step-card');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Card animation is already handled by CSS
        entry.target.style.opacity = '1';
      }
    });
  }, observerOptions);

  featureCards.forEach((card) => observer.observe(card));
}

// Initialize feature cards animation when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFeatureCardsAnimation);
} else {
  initializeFeatureCardsAnimation();
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
  // Tab key for keyboard navigation (already handled by browser)
  if (e.key === 'Escape') {
    // Close any open menus if needed
    console.log('[v0] Escape key pressed');
  }
});

// ===== Performance: Throttle scroll events =====
let ticking = false;

function updateOnScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      // Perform any scroll-based animations here
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', updateOnScroll, { passive: true });

// ===== Intersection Observer for lazy animations =====
const animateOnScrollElements = document.querySelectorAll('.animate-slide-up');

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  },
  {
    threshold: 0.1,
  }
);

animateOnScrollElements.forEach((el) => {
  scrollObserver.observe(el);
});

// ===== Prevent Flash of Unstyled Content =====
document.documentElement.style.visibility = 'visible';
document.body.style.opacity = '1';
