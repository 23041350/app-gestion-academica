// dashboard.js - Datos y lógica del dashboard

// Datos de ejemplo
const statsData = [
  { icon: "ti ti-books", iconColor: "var(--accent)", value: "6", label: "Materias activas" },
  { icon: "ti ti-checklist", iconColor: "var(--text-success)", value: "8", label: "Tareas pendientes" },
  { icon: "ti ti-calendar-event", iconColor: "var(--text-danger)", value: "2", label: "Exámenes esta semana" },
  { icon: "ti ti-clock", iconColor: "var(--text-warning)", value: "14h", label: "Tiempo estudiado" }
];

const materiasData = [
  { nombre: "Lenguajes de Interfaz", profesor: "Mtra. Nevárez Pérez", horario: "Mar / Jue 10:00", progreso: 65, color: "#185fa5", dificultad: "Dif. 4/5" },
  { nombre: "Ingenería de Software", profesor: "Mtra. Miranda Espinosa", horario: "Lun / Mié 8:00", progreso: 40, color: "#3b6d11", dificultad: "Dif. 3/5" },
  { nombre: "Ecuaciones Diferenciales", profesor: "Mtra. Barraza Castañeda", horario: "Vie 9:00", progreso: 80, color: "#854f0b", dificultad: "Dif. 5/5" }
];

const tareasData = [
  { titulo: "Análisis de interrupción 21H", prioridad: "Alta", fecha: "Mañana 11:59 pm", materia: "Lenguajes de Interfaz" },
  { titulo: "Diseño de Prueba de caja negra", prioridad: "Media", fecha: "Mar 11:59 pm", materia: "Ingeniería de Software" }
];

// Renderizar stats
function renderStats() {
  const container = document.getElementById('statsContainer');
  if (!container) return;
  
  container.innerHTML = statsData.map(stat => `
    <div class="stat-card">
      <i class="${stat.icon}" style="color:${stat.iconColor}"></i>
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

// Renderizar alerta de examen
function renderExamAlert() {
  const container = document.getElementById('examAlert');
  if (!container) return;
  
  container.innerHTML = `
    <i class="ti ti-alert-circle"></i>
    <div class="exam-alert-text">
      <span class="exam-alert-bold">Examen mañana:</span><br>Lenguajes de Interfaz · Aula 204 · 10:00 am
    </div>
  `;
}

// Renderizar materias
function renderMaterias() {
  const container = document.getElementById('materiasContainer');
  if (!container) return;
  
  container.innerHTML = materiasData.map(materia => `
    <div class="materia-card">
      <div class="materia-dot" style="background:${materia.color}"></div>
      <div class="materia-info">
        <div class="materia-nombre">${materia.nombre}</div>
        <div class="materia-sub">${materia.profesor} · ${materia.horario}</div>
        <div class="prog-bg"><div class="prog-fill" style="width:${materia.progreso}%;background:${materia.color}"></div></div>
      </div>
      <span class="dif-badge">${materia.dificultad}</span>
    </div>
  `).join('');
}

// Renderizar tareas
function renderTareas() {
  const container = document.getElementById('tareasContainer');
  if (!container) return;
  
  container.innerHTML = tareasData.map(tarea => `
    <div class="task-card">
      <div class="task-header">
        <div class="task-title">${tarea.titulo}</div>
        <span class="priority-badge ${tarea.prioridad === 'Alta' ? 'p-alta' : 'p-media'}">${tarea.prioridad}</span>
      </div>
      <div class="task-meta">
        <span><i class="ti ti-calendar"></i>${tarea.fecha}</span>
        <span><i class="ti ti-book"></i>${tarea.materia}</span>
      </div>
    </div>
  `).join('');
}

// Inicializar dashboard
document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderExamAlert();
  renderMaterias();
  renderTareas();
});
