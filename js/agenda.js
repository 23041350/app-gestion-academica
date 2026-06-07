// agenda.js - Lógica de la agenda y calendario

// Función genérica para mostrar mensajes de prototipo
function mostrarMensajePrototipo(mensajePersonalizado) {
  const mensaje = document.createElement('div');
  mensaje.innerHTML = `
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--bg-surface);
      color: var(--text-primary);
      padding: 24px 28px;
      border-radius: 28px;
      box-shadow: 0 25px 50px rgba(0,0,0,0.3);
      z-index: 10000;
      text-align: center;
      max-width: 300px;
      border: 1px solid var(--border);
      animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    ">
      <div style="
        width: 56px;
        height: 56px;
        background: var(--accent-light);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
      ">
        <i class="ti ti-device-mobile" style="font-size: 28px; color: var(--accent);"></i>
      </div>
      <div style="font-weight: 600; font-size: 17px; margin-bottom: 8px; color: var(--text-primary);">
        ⚠️ Prototipo en desarrollo
      </div>
      <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 20px;">
        ${mensajePersonalizado}
      </div>
      <button id="closePrototypeMsg" style="
        background: var(--accent);
        color: white;
        border: none;
        padding: 10px 24px;
        border-radius: 40px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        font-family: inherit;
        transition: transform 0.1s ease;
      " 
      onmouseover="this.style.transform='scale(1.02)'"
      onmouseout="this.style.transform='scale(1)'"
      >Entendido</button>
    </div>
  `;
  
  // Agregar estilos de animación si no existen
  if (!document.getElementById('prototype-animation-style')) {
    const style = document.createElement('style');
    style.id = 'prototype-animation-style';
    style.textContent = `
      @keyframes fadeIn {
        from { 
          opacity: 0; 
          transform: translate(-50%, -50%) scale(0.92);
        }
        to { 
          opacity: 1; 
          transform: translate(-50%, -50%) scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Fondo semitransparente con blur
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 9999;
    backdrop-filter: blur(6px);
    animation: fadeIn 0.2s ease;
  `;
  
  document.body.appendChild(overlay);
  document.body.appendChild(mensaje);
  
  // Función para cerrar
  const cerrarMensaje = () => {
    overlay.remove();
    mensaje.remove();
  };
  
  // Cerrar al hacer clic en el botón
  const closeBtn = document.getElementById('closePrototypeMsg');
  if (closeBtn) closeBtn.addEventListener('click', cerrarMensaje);
  
  // Cerrar al hacer clic en el overlay
  overlay.addEventListener('click', cerrarMensaje);
  
  // Cerrar con tecla ESC
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      cerrarMensaje();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

// Datos de eventos
const eventosData = [
  { dia: 4, mes: "Jun", nombre: "Examen parcial — Lenguajes de Interfaz", tipo: "examen", peso: 30, hora: "10:00 am", lugar: "Aula 204, edificio B" },
  { dia: 6, mes: "Jun", nombre: "Ensayo unidad 3 — Redes I", tipo: "tarea", hora: "11:59 pm", materia: "Redes I" },
  { dia: 10, mes: "Jun", nombre: "Examen — Ecuaciones Diferenciales", tipo: "examen", peso: 25, hora: "8:00 am", lugar: "Departamento de Matemáticas, edificio C" }
];

// Renderizar eventos
function renderEventos() {
  const container = document.querySelector('.agenda-body');
  if (!container) return;
  
  const eventosHTML = eventosData.map(evento => {
    if (evento.tipo === 'examen') {
      return `
        <div class="event-card">
          <div class="event-date-col">
            <div class="event-day-num" style="color:var(--text-danger)">${evento.dia}</div>
            <div class="event-month">${evento.mes}</div>
          </div>
          <div class="event-divider"></div>
          <div class="event-info">
            <div class="event-name">${evento.nombre}</div>
            <span class="event-type-badge badge-exam">Examen · ${evento.peso}% del curso</span>
            <div class="event-meta">
              <span><i class="ti ti-clock"></i>${evento.hora}</span>
              <span><i class="ti ti-map-pin"></i>${evento.lugar}</span>
            </div>
            <div class="peso-bar-bg"><div class="peso-bar-fill" style="width:${evento.peso}%"></div></div>
            <div class="peso-label">Peso: ${evento.peso}%</div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="event-card">
          <div class="event-date-col">
            <div class="event-day-num">${evento.dia}</div>
            <div class="event-month">${evento.mes}</div>
          </div>
          <div class="event-divider"></div>
          <div class="event-info">
            <div class="event-name">${evento.nombre}</div>
            <span class="event-type-badge badge-task">Tarea</span>
            <div class="event-meta">
              <span><i class="ti ti-clock"></i>${evento.hora}</span>
              <span><i class="ti ti-book"></i>${evento.materia}</span>
            </div>
          </div>
        </div>
      `;
    }
  }).join('');
  
  container.innerHTML = `<div class="section-label3">Próximos eventos</div>${eventosHTML}`;
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  renderEventos();
  
  // Botón de "+" en agenda - Mensaje personalizado
  const plusButton = document.querySelector('.topbar-row3 .ti-plus');
  if (plusButton) {
    plusButton.addEventListener('click', () => {
      mostrarMensajePrototipo('Aún no se puede crear un nuevo evento, estás en una etapa temprana del proyecto');
    });
  }
  
  // Botón de campana 🔔 en agenda
  const bellButton = document.querySelector('.topbar-row3 .ti-bell');
  if (bellButton) {
    bellButton.addEventListener('click', () => {
      mostrarMensajePrototipo('Las notificaciones estarán disponibles en la versión final. Por ahora, este es un prototipo visual');
    });
  }
  
  // Flecha izquierda del calendario
  const leftArrow = document.querySelector('.ti-chevron-left');
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      mostrarMensajePrototipo('Aún no se puede consultar fechas anteriores, próximamente será implementado con la API de Google Calendar');
    });
  }
  
  // Flecha derecha del calendario
  const rightArrow = document.querySelector('.ti-chevron-right');
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      mostrarMensajePrototipo('Aún no se puede consultar fechas posteriores, próximamente será implementado con la API de Google Calendar');
    });
  }
  
  // Días del calendario (opcional)
  document.querySelectorAll('.cal-day').forEach(day => {
    day.addEventListener('click', () => {
      if (!day.classList.contains('other-month')) {
        mostrarMensajePrototipo('La vista detallada del día estará disponible en la versión final de la app');
      }
    });
  });
});
