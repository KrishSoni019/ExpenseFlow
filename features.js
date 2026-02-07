// Features Page Initialization
document.addEventListener('DOMContentLoaded', () => {
  initializeFeaturesPage();
  addArrowSVGsToFeaturesLinks();
  observeFeatureCards();
});

// ===== Initialize Features Page =====
function initializeFeaturesPage() {
  const particlesHero = document.getElementById('particles-hero');
  const orbHero = document.getElementById('gradientOrb-hero');

  // Only initialize if elements exist
  if (particlesHero) {
    initializeParticles(particlesHero);
  }

  if (orbHero) {
    initializeGradientOrb(orbHero);
  }
}

// ===== Initialize Particles (reused from main script) =====
function initializeParticles(container) {
  // Create 25 particles
  for (let i = 0; i < 25; i++) {
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

// ===== Initialize Gradient Orb (reused from main script) =====
function initializeGradientOrb(orb) {
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Gentle parallax effect (2% of mouse movement)
    const offsetX = x * 0.02;
    const offsetY = y * 0.02;

    orb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
}

// ===== Observe Feature Cards for Animations =====
function observeFeatureCards() {
  const cards = document.querySelectorAll('.feature-detailed, .comparison-card');

  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('observed')) {
        // Add a slight delay for staggered effect
        setTimeout(() => {
          entry.target.classList.add('observed');
        }, 50);
      }
    });
  }, observerOptions);

  cards.forEach((card) => observer.observe(card));
}

// ===== Add Arrow SVGs to Feature Links =====
function addArrowSVGsToFeaturesLinks() {
  const links = document.querySelectorAll('.features-comparison .comparison-card a, .feature-right a');

  links.forEach((link) => {
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

// ===== Add Hover Effects to Feature Cards =====
document.addEventListener('DOMContentLoaded', () => {
  const featureCards = document.querySelectorAll('.feature-detailed');

  featureCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
});

// ===== Smooth Scroll Navigation =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
});

// ===== Active Nav Link =====
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-links .nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if ((currentPage.includes('features') && href === 'features.html') || (currentPage === '/' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
