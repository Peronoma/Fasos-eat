// Navigation toggle (mobile)
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('primary-navigation');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });

  // Close menu when a link clicked (mobile)
  navList.addEventListener('click', e => {
    if (e.target.matches('a') && window.matchMedia('(max-width:820px)').matches) {
      navToggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('open');
    }
  });
}

// Smooth scroll + active link highlight
const links = document.querySelectorAll('#primary-navigation a');
links.forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id && id.startsWith('#')) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', id);
      }
    }
  });
});

// Highlight active section on scroll
const sections = [...document.querySelectorAll('main section')];
const setActive = () => {
  const scrollY = window.scrollY + window.innerHeight / 3;
  let currentId = '';
  for (const sec of sections) {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      currentId = '#' + sec.id;
      break;
    }
  }
  links.forEach(a => a.setAttribute('aria-current',
    a.getAttribute('href') === currentId ? 'page' : 'false'));
};
window.addEventListener('scroll', setActive);
setActive();

// Intersection fade-in
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('visible');
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.2 });
revealEls.forEach(el => io.observe(el));

// Basic form validation + fake submit
const form = document.getElementById('order-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Please fill all fields correctly.';
      status.style.color = 'var(--clr-accent, #d86b1f)';
      return;
    }
    status.textContent = 'Submitting...';
    status.style.color = 'var(--clr-text-muted, #888)';
    // Simulated async
    setTimeout(() => {
      status.textContent = 'Order received! We will contact you shortly.';
      status.style.color = 'var(--clr-accent-alt, #f6b04c)';
      form.reset();
    }, 900);
  });
}

// Optional: Reduce motion preference respect
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
}