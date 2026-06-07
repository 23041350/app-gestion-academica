// perfil.js - Lógica del perfil y configuración

// Manejo de toggles
function initToggles() {
  document.querySelectorAll('.toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      this.classList.toggle('off');
      // Aquí se guardaría el estado en localStorage
    });
  });
}

// Manejo de cierre de sesión
function initLogout() {
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('¿Deseas cerrar sesión?')) {
        // Aquí iría la lógica de cierre de sesión
        window.location.href = '../index.html';
      }
    });
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  initToggles();
  initLogout();
});
