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

  document.querySelectorAll('.project-image-row').forEach(row => {
    row.addEventListener('click', () => {
      // Gamit ang 'add' para dili na siya mag-collapse (mawala) inig click balik
      row.classList.add('expanded');
    });
  });

  document.querySelectorAll('.project-image-row').forEach(row => {
    constimages = row.querySelectorAll('img');
    let currentIndex = 0;

    row.addEventListener('click', () => {
      // Remove active from current
      images[currentIndex].classList.remove('active');
      
      // Move to next image (loop back to start)
      currentIndex = (currentIndex + 1) % images.length;
      
      // Add active to next image
      images[currentIndex].classList.add('active');
    });
  });
  
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== VIEW MORE / SHOW LESS =====
  document.querySelectorAll('.view-more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const row = this.closest('.project-image-row');
      row.classList.toggle('expanded');
    });
  });

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  // Open lightbox when clicking any image
  document.querySelectorAll('.project-image-row img').forEach(img => {
    img.addEventListener('click', function() {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close when clicking background
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Close with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});
