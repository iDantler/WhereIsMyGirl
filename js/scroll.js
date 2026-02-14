document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => observer.observe(card));

window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  let scroll = window.pageYOffset;
  hero.style.backgroundPositionY = `${scroll * 0.3}px`;
});

const toTop = document.getElementById('to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    toTop.classList.add('visible');
  } else {
    toTop.classList.remove('visible');
  }
});
