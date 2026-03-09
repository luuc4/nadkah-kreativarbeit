// Mobile menu toggle + scroll lock
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

// Active nav link on scroll – picks exactly ONE section (the one whose top
// is closest to, but above, 40 % of the viewport height)
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-links a');
const navbar = document.getElementById('navbar');

if (sections.length && navItems.length) {
  function updateActiveNav() {
    const vh = window.innerHeight;
    let current = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= vh * 0.4 && rect.bottom > 60) {
        current = section;
      }
    });

    if (current) {
      const id = current.getAttribute('id');
      navItems.forEach(a => a.classList.remove('active'));
      const match =
        document.querySelector(`.nav-links a[href="#${id}"]`) ||
        document.querySelector(`.nav-links a[href="/#${id}"]`);
      if (match) match.classList.add('active');
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateActiveNav();
}

// Navbar shadow on scroll
if (navbar) {
  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });
}

// Hide scroll-indicator after scrolling
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  let indicatorTicking = false;
  window.addEventListener('scroll', () => {
    if (!indicatorTicking) {
      requestAnimationFrame(() => {
        scrollIndicator.classList.toggle('hidden', window.scrollY > 80);
        indicatorTicking = false;
      });
      indicatorTicking = true;
    }
  }, { passive: true });
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');

if (fadeEls.length) {
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => fadeObserver.observe(el));
}

// Hero entrance animation
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) hero.classList.add('visible');
});
