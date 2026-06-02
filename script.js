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