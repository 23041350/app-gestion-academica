// tareas.js - Lógica de la pantalla de tareas

// Función para mostrar mensajes de prototipo
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
  
  const cerrarMensaje = () => {
    overlay.remove();
    mensaje.remove();
  };
  
  const closeBtn = document.getElementById('closePrototypeMsg');
  if (closeBtn) closeBtn.addEventListener('click', cerrarMensaje);
  overlay.addEventListener('click', cerrarMensaje);
  
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      cerrarMensaje();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

// Datos de tareas (etiquetas editables)
const tareasData = [
  { id: 1, nombre: "Análisis de interrupción 21H", descripcion: "Desarrollar un programa en Turbo Assembler que utilice la interrupción 21h para realizar operaciones básicas de entrada, salida y finalización, con el fin de analizar su funcionamiento.", materia: "Lenguajes de Interfaz", materiaColor: "var(--bg-info)", materiaTextColor: "var(--text-info)", estado: "En progreso", estadoClass: "s-progreso", fecha: "Hoy 11:59 pm", urgente: true, dotColor: "var(--text-danger)" },
  { id: 2, nombre: "Ejercicios de práctica 2", descripcion: "Evaluar la Transformada Inversa de Laplace para ejercicios propuestos", materia: "Ecuaciones Diferenciales", materiaColor: "var(--bg-warning)", materiaTextColor: "var(--text-warning)", estado: "Pendiente", estadoClass: "s-pendiente", fecha: "Hoy 11:59 pm", urgente: true, dotColor: "var(--text-warning)" },
  { id: 3, nombre: "Diseño de Prueba de caja negra", descripcion: "Con el software Appium aplicar pruebas funcionales", materia: "Ingeniería de Software", materiaColor: "var(--bg-success)", materiaTextColor: "var(--text-success)", estado: "Pendiente", estadoClass: "s-pendiente", fecha: "Mañana 11:59 pm", urgente: false, dotColor: "var(--text-warning)" },
  { id: 4, nombre: "Ensayo unidad 3 — Redes", descripcion: "Comparar modelos OSI y TCP/IP, 2 cuartillas", materia: "Redes I", materiaColor: "#EEEDFE", materiaTextColor: "#3C3489", estado: "Pendiente", estadoClass: "s-pendiente", fecha: "Vie 11:59 pm", urgente: false, dotColor: "#888780" }
];

const tareasCompletas = [
  { id: 5, nombre: "Ejercicios Transformadas de Fourier", descripcion: "Entregado el 1 jun 2026", materia: "Ecuaciones Diferenciales", materiaColor: "var(--bg-info)", materiaTextColor: "var(--text-info)", estado: "Completada", fecha: "1 jun 2026" },
  { id: 6, nombre: "Reporte — Validación de Requisitos", descripcion: "Entregado el 30 may 2026", materia: "Ingeniería de Software", materiaColor: "var(--bg-success)", materiaTextColor: "var(--text-success)", estado: "Completada", fecha: "30 may 2026" }
];

// Función para obtener TODAS las tareas (activas + completadas)
function obtenerTodasLasTareas() {
  return [...tareasData, ...tareasCompletas];
}

// Función para filtrar tareas según el filtro seleccionado
function filtrarTareas(filtro) {
  switch(filtro) {
    case 'Todas':
      // Muestra TODAS (activas + completadas)
      renderTaskList(obtenerTodasLasTareas(), filtro);
      return;
    case 'Pendientes':
      renderTaskList(tareasData.filter(t => t.estado === 'Pendiente'), filtro);
      return;
    case 'En progreso':
      renderTaskList(tareasData.filter(t => t.estado === 'En progreso'), filtro);
      return;
    case 'Completadas':
      renderTaskList(tareasCompletas, filtro);
      return;
    case 'Alta prioridad':
      renderTaskList(tareasData.filter(t => t.urgente === true), filtro);
      return;
    default:
      renderTaskList(tareasData, filtro);
  }
}

// Función auxiliar para renderizar una tarea individual
function renderTareaItem(tarea, esCompletada = false) {
  if (esCompletada || tarea.estado === 'Completada') {
    return `
      <div class="task-item done">
        <div class="check-circle checked"><i class="ti ti-check"></i></div>
        <div class="task-body">
          <div class="task-name">${tarea.nombre}</div>
          <div class="task-desc">${tarea.descripcion || ''}</div>
          <div class="task-footer">
            <span class="materia-pill" style="background:${tarea.materiaColor};color:${tarea.materiaTextColor}">${tarea.materia}</span>
            <span class="status-pill s-completada">Completada</span>
            <span class="due-label">${tarea.fecha || ''}</span>
          </div>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="task-item">
      <div class="p-dot" style="background:${tarea.dotColor || 'var(--text-secondary)'}"></div>
      <div class="task-body">
        <div class="task-name">${tarea.nombre}</div>
        <div class="task-desc">${tarea.descripcion}</div>
        <div class="task-footer">
          <span class="materia-pill" style="background:${tarea.materiaColor};color:${tarea.materiaTextColor}">${tarea.materia}</span>
          <span class="status-pill ${tarea.estado === 'En progreso' ? 's-progreso' : 's-pendiente'}">${tarea.estado}</span>
          <span class="due-label ${tarea.urgente ? 'due-urgent' : ''}">${tarea.fecha}</span>
        </div>
      </div>
    </div>
  `;
}

// Renderizar lista de tareas
function renderTaskList(tareas, filtroActivo = 'Todas') {
  const container = document.getElementById('taskListContainer');
  if (!container) return;
  
  if (!tareas || tareas.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <i class="ti ti-checklist" style="font-size: 48px; color: var(--text-secondary); margin-bottom: 12px; display: block;"></i>
        <div style="color: var(--text-secondary);">No hay tareas en esta categoría</div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">¡Disfruta tu descanso!</div>
      </div>
    `;
    return;
  }
  
  let html = '';
  
  // Si es el filtro "Todas", separar por secciones (activas y completadas)
  if (filtroActivo === 'Todas') {
    const activas = tareas.filter(t => t.estado !== 'Completada');
    const completadas = tareas.filter(t => t.estado === 'Completada');
    
    // Mostrar tareas activas
    if (activas.length > 0) {
      html += `<div class="section-date">📋 Pendientes y en progreso</div>`;
      
      // Separar activas por fecha
      const tareasHoy = activas.filter(t => t.fecha && t.fecha.includes("Hoy"));
      const tareasManana = activas.filter(t => t.fecha && t.fecha.includes("Mañana"));
      const tareasViernes = activas.filter(t => t.fecha && (t.fecha.includes("Vie") || t.fecha.includes("Sábado")));
      
      if (tareasHoy.length > 0) {
        html += `<div class="section-date" style="margin-top: 8px;">Hoy · 3 jun 2026</div>`;
        tareasHoy.forEach(tarea => { html += renderTareaItem(tarea); });
      }
      
      if (tareasManana.length > 0) {
        html += `<div class="section-date" style="margin-top: 8px;">Mañana · 4 jun 2026</div>`;
        tareasManana.forEach(tarea => { html += renderTareaItem(tarea); });
      }
      
      if (tareasViernes.length > 0) {
        html += `<div class="section-date" style="margin-top: 8px;">Fin de semana · 5-6 jun 2026</div>`;
        tareasViernes.forEach(tarea => { html += renderTareaItem(tarea); });
      }
    }
    
    // Mostrar tareas completadas
    if (completadas.length > 0) {
      html += `<div class="section-date" style="margin-top: 16px;">Completadas recientemente</div>`;
      completadas.forEach(tarea => { html += renderTareaItem(tarea, true); });
    }
    
  } 
  // Si es el filtro "Completadas"
  else if (filtroActivo === 'Completadas') {
    html += `<div class="section-date">Tareas completadas</div>`;
    tareas.forEach(tarea => { html += renderTareaItem(tarea, true); });
  }
  // Otros filtros (Pendientes, En progreso, Alta prioridad)
  else {
    // Separar por fecha
    const tareasHoy = tareas.filter(t => t.fecha && t.fecha.includes("Hoy"));
    const tareasManana = tareas.filter(t => t.fecha && t.fecha.includes("Mañana"));
    const tareasViernes = tareas.filter(t => t.fecha && (t.fecha.includes("Vie") || t.fecha.includes("Sábado")));
    
    if (tareasHoy.length > 0) {
      html += `<div class="section-date">Hoy · 3 jun 2026</div>`;
      tareasHoy.forEach(tarea => { html += renderTareaItem(tarea); });
    }
    
    if (tareasManana.length > 0) {
      html += `<div class="section-date">Mañana · 4 jun 2026</div>`;
      tareasManana.forEach(tarea => { html += renderTareaItem(tarea); });
    }
    
    if (tareasViernes.length > 0) {
      html += `<div class="section-date">Fin de semana · 5-6 jun 2026</div>`;
      tareasViernes.forEach(tarea => { html += renderTareaItem(tarea); });
    }
  }
  
  container.innerHTML = html;
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar todas las tareas inicialmente (Todas)
  renderTaskList(obtenerTodasLasTareas(), 'Todas');
  
  // Evento para el botón azul de agregar tarea (+)
  const addButton = document.querySelector('.add-btn');
  if (addButton) {
    addButton.addEventListener('click', () => {
      mostrarMensajePrototipo('Aún no se puede crear una nueva tarea, estás en una etapa temprana del proyecto');
    });
  }
  
  // Filtros - Funcionales
  const filtros = document.querySelectorAll('.filter-chip');
  filtros.forEach(chip => {
    chip.addEventListener('click', function() {
      filtros.forEach(c => c.classList.remove('sel'));
      this.classList.add('sel');
      const filtroTexto = this.textContent.trim();
      filtrarTareas(filtroTexto);
    });
  });
});
