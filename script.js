const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

const navLinkElements = document.querySelectorAll('.nav-links a');
if (navLinkElements.length) {
  navLinkElements.forEach(link => {
    link.addEventListener('click', () => navLinks?.classList.remove('active'));
  });
}

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

  /* AUTO-HIDE "VIEW MORE" BUTTON IF NO EXTRA IMAGES  */
  document.querySelectorAll('.project-image-row').forEach(row => {
    const extras = row.querySelector('.extra-images');
    const btn    = row.querySelector('.view-more-btn');

    if (!extras || extras.children.length === 0) {
      if (btn) btn.style.display = 'none';
    }
  });

  document.querySelectorAll('.view-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const row = btn.closest('.project-image-row');
      row.classList.toggle('expanded');

      if (row.classList.contains('expanded')) {
        setTimeout(() => {
          row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });

  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn    = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.project-image-row img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  };

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});

document.querySelectorAll('.view-more-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    const imageRow = this.closest('.project-image-row');
    imageRow.classList.toggle('expanded');
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.project-image-row img').forEach(img => {
  img.addEventListener('click', function() {
    lightboxImg.src = this.src;
    lightboxImg.alt = this.alt;
    lightbox.classList.add('active');
  });
});

lightboxClose.addEventListener('click', function() {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
  }
});

document.querySelectorAll('.view-more-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    const imageRow = this.closest('.project-image-row');
    imageRow.classList.toggle('expanded');
  });
});
