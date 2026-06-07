// theme.js - Manejo del tema claro/oscuro
const html = document.documentElement;
const themeIcon = document.getElementById('theme-icon');

function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
      themeIcon.className = savedTheme === 'dark' ? 'ti ti-sun' : 'ti ti-moon';
    }
  } else if (prefersDark) {
    html.setAttribute('data-theme', 'dark');
    if (themeIcon) {
      themeIcon.className = 'ti ti-sun';
    }
  }
}

function toggleTheme() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  if (themeIcon) {
    themeIcon.className = isDark ? 'ti ti-moon' : 'ti ti-sun';
  }
  saveTheme(newTheme);
}

// Inicializar tema al cargar
loadTheme();

// Asignar evento al botón de tema si existe
const themeBtn = document.getElementById('theme-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', toggleTheme);
}
