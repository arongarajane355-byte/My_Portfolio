// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Close menu kapag nag-click sa link
const navLinkElements = document.querySelectorAll('.nav-links a');
if (navLinkElements.length) {
  navLinkElements.forEach(link => {
    link.addEventListener('click', () => navLinks?.classList.remove('active'));
  });
}

// Smooth Scroll (optional kung naka-CSS `scroll-behavior: smooth` ka na)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact Form Handler (Frontend only)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (email && message) {
      alert('Salamat! Na-receive ko ang message mo. (Demo lang ito)');
      form.reset();
    }
  });
}

// Reveal on scroll animations
window.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll(
    'section, #home-heading, .hero-image-container, .hero-actions, .info-grid, .education-list, .card, .skill-item, .contact-layout'
  );

  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealTargets.forEach((el) => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 1. AUTO-HIDE "VIEW MORE" BUTTON IF NO EXTRA IMAGES ===== */
  document.querySelectorAll('.project-image-row').forEach(row => {
    const extras = row.querySelector('.extra-images');
    const btn    = row.querySelector('.view-more-btn');

    if (!extras || extras.children.length === 0) {
      if (btn) btn.style.display = 'none';
    }
  });

  /* ===== 2. VIEW MORE / SHOW LESS TOGGLE ===== */
  document.querySelectorAll('.view-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent lightbox from opening
      const row = btn.closest('.project-image-row');
      row.classList.toggle('expanded');

      // Smooth scroll para makita ang gallery
      if (row.classList.contains('expanded')) {
        setTimeout(() => {
          row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });

  /* ===== 3. LIGHTBOX FUNCTIONALITY ===== */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn    = lightbox.querySelector('.lightbox-close');

  // Open lightbox when ANY image inside .project-image-row is clicked
  document.querySelectorAll('.project-image-row img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // lock scroll
    });
  });

  // Close lightbox function
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = ''; // clear image
  };

  // Close button click
  closeBtn.addEventListener('click', closeLightbox);

  // Click on backdrop (outside image) to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Press ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});