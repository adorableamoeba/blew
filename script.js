/* ============================================
   INCEPTRA AI — Script (Editorial Redesign)
   Handles:
   - Navbar scroll glass effect
   - Full-screen mobile overlay menu
   - Scroll reveal animations
   - FAQ accordion
   - Contact form submit
   - Active nav link highlight
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. NAVBAR — frosted glass on scroll
  ────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ──────────────────────────────────────────
     2. FULL-SCREEN MOBILE OVERLAY
  ────────────────────────────────────────── */
  const hamburger     = document.getElementById('hamburger');
  const overlay       = document.getElementById('mobile-overlay');
  const closeBtn      = document.getElementById('mobile-close');
  const mobileLinks   = document.querySelectorAll('.mobile-nav-link');

  const openMenu = () => {
    hamburger.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    overlay.classList.contains('open') ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ──────────────────────────────────────────
     3. SCROLL REVEAL — fade in on scroll
  ────────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObs.observe(el));


  /* ──────────────────────────────────────────
     4. FAQ ACCORDION
  ────────────────────────────────────────── */
  const faqQuestions = document.querySelectorAll('.faq-q');

  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const id   = q.getAttribute('data-faq');
      const item = document.getElementById(id);
      const open = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!open) item.classList.add('open');
    });
  });


  /* ──────────────────────────────────────────
     5. CONTACT FORM
  ────────────────────────────────────────── */
  const form       = document.getElementById('contact-form');
  const success    = document.getElementById('form-success');
  const submitBtn  = document.getElementById('contact-submit');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name  = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();

      if (!name || !email) {
        [document.getElementById('contact-name'), document.getElementById('contact-email')].forEach(input => {
          if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            input.addEventListener('input', () => { input.style.borderColor = ''; }, { once: true });
          }
        });
        return;
      }

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.display    = 'none';
        success.style.display = 'block';
      }, 1200);
    });
  }


  /* ──────────────────────────────────────────
     6. ACTIVE NAV HIGHLIGHT on scroll
  ────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}` ? '#10B981' : '';
    });
  }, { passive: true });


  /* ──────────────────────────────────────────
     7. SERVICE ROW — hover ripple cursor
     (adds a subtle text change on hover)
  ────────────────────────────────────────── */
  const serviceRows = document.querySelectorAll('.service-row');
  serviceRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.querySelector('.service-row-name').style.letterSpacing = '-0.01em';
    });
    row.addEventListener('mouseleave', () => {
      row.querySelector('.service-row-name').style.letterSpacing = '';
    });
  });

});
