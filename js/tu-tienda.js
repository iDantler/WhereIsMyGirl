document.querySelectorAll('.tu-tienda-card').forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('active')) {
      card.classList.remove('active');
      return;
    }

    card.classList.add('shaking');

    setTimeout(() => {
      card.classList.remove('shaking');
      card.classList.add('active');
    }, 1000);
  });
});

const tiendaCards = document.querySelectorAll('.tu-tienda-card');

tiendaCards.forEach(card => {
  card.addEventListener('pointermove', (e) => {
    const bounds = card.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--x', '50%');
    card.style.setProperty('--y', '50%');
  });
});

document.querySelectorAll('.tu-tienda-card .card-image, .tu-tienda-card .card-video').forEach(media => {
  media.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = media.closest('.tu-tienda-card');
    if (!card) return;

    const isVideo = media.matches('.card-video') || media.tagName === 'VIDEO';
    const src = media.src || media.getAttribute('data-src');

    if (card.classList.contains('active')) {
      openMediaModal(src, isVideo ? 'video' : 'image', media.alt);
      return;
    }

    media.style.visibility = 'hidden';
    media.style.opacity = '0';

    card.classList.add('shaking');
    setTimeout(() => {
      card.classList.remove('shaking');
      card.classList.add('active');
    }, 1000);

    setTimeout(() => {
      openMediaModal(src, isVideo ? 'video' : 'image', media.alt);
    }, 1100);
  });
});
