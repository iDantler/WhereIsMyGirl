const respuestaBtn = document.querySelector('.respuesta-button');
const respuestaModal = document.getElementById('respuesta-modal');
const respuestaTextarea = document.getElementById('respuesta-text');
const enviarBtn = document.getElementById('enviar-respuesta');
const cerrarBtn = document.getElementById('cerrar-respuesta');
const modalClose = respuestaModal ? respuestaModal.querySelector('.modal-close') : null;

let focusableElements = [];
let firstFocusable;
let lastFocusable;

function trapFocus(e) {
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }
}

function openRespuestaModal() {
  if (!respuestaModal) return;

  respuestaModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const previouslyFocused = document.activeElement;

  if (respuestaTextarea) respuestaTextarea.value = localStorage.getItem('borrador-respuesta') || '';

  focusableElements = respuestaModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  firstFocusable = focusableElements[0];
  lastFocusable = focusableElements[focusableElements.length - 1];

  setTimeout(() => {
    if (respuestaTextarea) respuestaTextarea.focus();
  }, 100);

  document.addEventListener('keydown', trapFocus);

  respuestaModal.addEventListener('close', () => {
    previouslyFocused?.focus();
  }, { once: true });
}

function closeRespuestaModal() {
  if (!respuestaModal) return;
  respuestaModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', trapFocus);
}

async function enviarRespuesta() {
  if (!respuestaTextarea || !respuestaTextarea.value.trim()) {
    mostrarNotificacion('Por favor escribe algo antes de enviar 💌', 'error');
    return;
  }

  if (!window.EMAIL_CONFIG) {
    mostrarNotificacion('Error de configuración. Contacta al administrador.', 'error');
    console.error('⚠️ EMAIL_CONFIG no está definido. Verifica js/config.js');
    return;
  }

  const mensaje = respuestaTextarea.value.trim();
  
  enviarBtn.disabled = true;
  enviarBtn.textContent = 'Enviando...';

  try {
    const response = await emailjs.send(
      window.EMAIL_CONFIG.serviceId,
      window.EMAIL_CONFIG.templateId,
      {
        message: mensaje,
        date: new Date().toLocaleString('es-ES'),
        from_name: 'Paola'
      }
    );

    console.log('Email enviado exitosamente:', response);
    
    respuestaTextarea.value = '';
    localStorage.removeItem('borrador-respuesta');
    
    mostrarNotificacion('¡Mensaje enviado con éxito! 💕', 'success');
    
    enviarBtn.disabled = false;
    enviarBtn.textContent = 'Enviar';
    
    setTimeout(() => {
      closeRespuestaModal();
    }, 1500);

  } catch (error) {
    console.error('Error al enviar:', error);
    mostrarNotificacion('Hubo un error al enviar. Intenta de nuevo 😔', 'error');
    enviarBtn.disabled = false;
    enviarBtn.textContent = 'Enviar';
  }
}

function mostrarNotificacion(mensaje, tipo = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${tipo}`;
  notification.textContent = mensaje;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: ${tipo === 'success' ? 'var(--primary)' : '#d32f2f'};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    z-index: 99999;
    animation: slideIn 0.3s ease;
    font-size: 1rem;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

if (respuestaBtn) respuestaBtn.addEventListener('click', openRespuestaModal);

if (enviarBtn) {
  enviarBtn.addEventListener('click', enviarRespuesta);
}

if (cerrarBtn) cerrarBtn.addEventListener('click', closeRespuestaModal);
if (modalClose) modalClose.addEventListener('click', closeRespuestaModal);

if (respuestaModal) {
  respuestaModal.addEventListener('click', (e) => {
    if (e.target === respuestaModal) closeRespuestaModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && respuestaModal && respuestaModal.getAttribute('aria-hidden') === 'false') {
    closeRespuestaModal();
  }
});

if (respuestaTextarea) {
  respuestaTextarea.addEventListener('input', () => {
    localStorage.setItem('borrador-respuesta', respuestaTextarea.value);
  });
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);
