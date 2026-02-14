const splash = document.getElementById('splash');
const mainContent = document.getElementById('main-content');
const leftPart = document.querySelector('.heart-part.left');
const rightPart = document.querySelector('.heart-part.right');

mainContent.style.opacity = '0';
mainContent.style.transition = 'opacity 0.4s ease-in-out';

[leftPart, rightPart].forEach(part => {
  part.addEventListener('click', () => {
    leftPart.classList.add('animate');
    rightPart.classList.add('animate');

    setTimeout(() => {
      splash.style.transition = 'opacity 0.2s ease-out';
      splash.style.opacity = '0';

      setTimeout(() => {
        splash.remove();
        mainContent.style.display = 'block';
        setTimeout(() => {
          mainContent.style.opacity = '1';
        }, 10);

        const duration = 500;
        const end = Date.now() + duration;

        (function frame() {
          confetti({
            particleCount: 3,
            angle: 90,
            spread: 60,
            startVelocity: 25,
            decay: 0.92,
            gravity: 0.45,
            drift: Math.random() * 0.8 - 0.4,
            origin: {
              x: Math.random(),
              y: Math.random() * 0.25
            },
            colors: ['#c94b6c', '#ff8cab', '#e8b4c1', '#ffffff', '#ffb6c1'],
            zIndex: 1000
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }, 200);
    }, 1000);
  });
});
