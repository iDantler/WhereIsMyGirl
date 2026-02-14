document.querySelectorAll('.accordion-header').forEach((header, index) => {
  const content = header.nextElementSibling;
  const card = header.parentElement;

  if (!content.id) content.id = `accordion-content-${index}`;
  if (!header.id) header.id = `accordion-header-${index}`;

  header.setAttribute('aria-controls', content.id);
  header.setAttribute('id', header.id);

  function toggleAccordion() {
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    header.setAttribute('aria-expanded', !isExpanded);
    card.classList.toggle('active');
  }

  header.addEventListener('click', toggleAccordion);

  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAccordion();
    }

    const allHeaders = document.querySelectorAll('.accordion-header');
    const currentIndex = Array.from(allHeaders).indexOf(header);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = allHeaders[currentIndex + 1] || allHeaders[0];
      next.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = allHeaders[currentIndex - 1] || allHeaders[allHeaders.length - 1];
      prev.focus();
    }
  });
});
