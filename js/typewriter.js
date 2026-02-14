const heroPhrase = document.querySelector('.hero-phrase');
if (heroPhrase && !sessionStorage.getItem('typed')) {
  const text = heroPhrase.textContent.trim();
  heroPhrase.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      heroPhrase.textContent += text.charAt(i);
      i++;
      setTimeout(type, 60);
    } else {
      sessionStorage.setItem('typed', 'true');
    }
  }

  setTimeout(type, 1800);
}
