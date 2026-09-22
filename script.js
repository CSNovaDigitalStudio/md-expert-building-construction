const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const year = document.getElementById('year');
const quoteForm = document.getElementById('quoteForm');

if (year) year.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
});

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const details = document.getElementById('details').value.trim();

  const message = [
    'Hi M.D Expert Building Construction, I would like a quotation.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Project details: ${details || 'Not provided'}`
  ].join('\n');

  const url = `https://wa.me/27835930888?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
});
