// navigation.js - Navegación entre pantallas
const pages = {
  'index': 'index.html',
  'tareas': 'pages/tareas.html',
  'agenda': 'pages/agenda.html',
  'progreso': 'pages/progreso.html',
  'perfil': 'pages/perfil.html'
};

function navigateTo(page) {
  if (pages[page]) {
    window.location.href = pages[page];
  }
}

function goToHome() {
  window.location.href = '../index.html';
}

// Inicializar navegación en los elementos .nav-item
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const page = item.getAttribute('data-page');
      if (page && page !== 'index') {
        navigateTo(page);
      }
    });
  });
});
