function openMediaModal(src, type, alt) {
  const modal = document.createElement('div');
  modal.className = 'image-modal';

  const closeBtnHtml = '<button class="close-btn" aria-label="Cerrar">&times;</button>';
  let mediaHtml = '';

  if (type === 'video') {
    mediaHtml = `
      <div class="video-wrap">
        <video src="${src}" controls playsinline></video>
        <div class="video-controls"><button class="play-btn" aria-label="Reproducir/Pausar">⏯</button></div>
      </div>
    `;
  } else {
    mediaHtml = `<img src="${src}" alt="${alt || ''}">`;
  }

  modal.innerHTML = `${closeBtnHtml}${mediaHtml}`;
  document.body.appendChild(modal);
  document.body.classList.add('modal-open');

  const mediaEl = modal.querySelector('video, img');
  const closeBtn = modal.querySelector('.close-btn');
  const playBtn = modal.querySelector('.play-btn');

  function closeModal() {
    if (!modal.parentNode) return;
    if (mediaEl && mediaEl.tagName === 'VIDEO') {
      try { mediaEl.pause(); } catch (err) {}
      try { mediaEl.removeAttribute('src'); } catch (err) {}
    }
    modal.parentNode.removeChild(modal);
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEsc);
    if (onSpace) document.removeEventListener('keydown', onSpace);
  }

  function onEsc(e) {
    if (e.key === 'Escape') closeModal();
  }

  let onSpace = null;
  function attachVideoControls() {
    if (!playBtn || !mediaEl || mediaEl.tagName !== 'VIDEO') return;
    const videoWrap = mediaEl.closest('.video-wrap') || mediaEl.parentElement;

    function updateButton() {
      const isPlaying = !mediaEl.paused && !mediaEl.ended;
      playBtn.textContent = mediaEl.paused ? '⏯' : '⏸';
      if (isPlaying) videoWrap.classList.add('playing'); 
      else videoWrap.classList.remove('playing');
    }

    playBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      if (mediaEl.paused) mediaEl.play(); 
      else mediaEl.pause();
      updateButton();
    });

    mediaEl.addEventListener('click', (ev) => {
      ev.stopPropagation();
      if (mediaEl.paused) mediaEl.play(); 
      else mediaEl.pause();
      updateButton();
    });

    mediaEl.addEventListener('play', updateButton);
    mediaEl.addEventListener('pause', updateButton);

    onSpace = function(e) {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (mediaEl.paused) mediaEl.play(); 
        else mediaEl.pause();
        updateButton();
      }
    };
    document.addEventListener('keydown', onSpace);
    setTimeout(updateButton, 50);
  }

  attachVideoControls();

  if (mediaEl && mediaEl.tagName === 'VIDEO') {
    try { mediaEl.removeAttribute('autoplay'); } catch (e) {}
    mediaEl.play().catch(() => {});
  }

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', onEsc);
}

document.querySelectorAll('.gallery .gallery-item img, .gallery .gallery-item video').forEach(media => {
  media.style.cursor = 'pointer';
  media.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVideo = media.tagName === 'VIDEO';
    const src = media.src || media.getAttribute('data-src');
    openMediaModal(src, isVideo ? 'video' : 'image', media.alt);
  });
});

document.querySelectorAll('.gallery-video').forEach(video => {
  video.volume = 0.5;
  
  video.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!video.hasAttribute('controls')) {
      video.setAttribute('controls', 'controls');
    }
    
    if (video.paused) {
      video.play().catch(err => console.log('Error reproduciendo video:', err));
    } else {
      video.pause();
    }
  });
});

