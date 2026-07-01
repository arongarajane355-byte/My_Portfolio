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
  // create or reuse a message container shown after form submission
  let msgContainer = document.querySelector('.form-message');
  if (!msgContainer) {
    msgContainer = document.createElement('div');
    msgContainer.className = 'form-message';
    form.parentNode.insertBefore(msgContainer, form.nextSibling);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msgContainer.textContent = '';
    msgContainer.classList.remove('success', 'error');

    const formData = new FormData(form);
    const action = form.getAttribute('action') || window.location.href;

    try {
      const res = await fetch(action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (res.ok) {
        msgContainer.textContent = 'Your message is sent successfully! I will get back to you soon.';
        msgContainer.classList.add('success');
        form.reset();
      } else {
        // try to read JSON error message from Formspree
        let data;
        try { data = await res.json(); } catch (_) { data = null; }
        msgContainer.textContent = (data && data.error) ? data.error : 'Oops — there was a problem sending your message.';
        msgContainer.classList.add('error');
      }
    } catch (err) {
      msgContainer.textContent = 'Network error. Please try again later.';
      msgContainer.classList.add('error');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll(
    '#home-heading, h2#about-heading, .hero-image-container, .hero-actions, .info-item, .education-section, .education-list .education-item, .skills-acquired, .skill-category'
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
    const btn = row.querySelector('.view-more-btn');

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

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

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
  button.addEventListener('click', function (e) {
    e.stopPropagation();
    const imageRow = this.closest('.project-image-row');
    imageRow.classList.toggle('expanded');
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.project-image-row img').forEach(img => {
  img.addEventListener('click', function () {
    lightboxImg.src = this.src;
    lightboxImg.alt = this.alt;
    lightbox.classList.add('active');
  });
});

lightboxClose.addEventListener('click', function () {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
  }
});

document.querySelectorAll('.view-more-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    e.stopPropagation();
    const imageRow = this.closest('.project-image-row');
    imageRow.classList.toggle('expanded');
  });
});