// auth.js  —  page protection + navbar UI
// يشتغل على كل الصفحات كـ regular script بدون module

const PUBLIC_PAGES = ['auth.html', 'index.html', 'welcome.html'];

function isAuthenticated() {
  return localStorage.getItem('siwa_is_logged_in') === 'true'
      && !!localStorage.getItem('siwa_token');
}

function getCurrentUser() {
  const d = localStorage.getItem('siwa_user');
  return d ? JSON.parse(d) : null;
}

window.logout = function () {
  localStorage.removeItem('siwa_token');
  localStorage.removeItem('siwa_is_logged_in');
  localStorage.removeItem('siwa_user');
  window.location.href = 'auth.html';
};

function protectPage() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (PUBLIC_PAGES.includes(page)) return;
  if (!isAuthenticated()) {
    window.location.replace('auth.html?redirect=' + encodeURIComponent(window.location.pathname));
  }
}

function updateNavUI() {
  const btn  = document.getElementById('nav-auth-btn');
  const user = getCurrentUser();
  if (!btn) return;
  if (isAuthenticated() && user) {
    btn.innerHTML = '<i class="fas fa-user-circle"></i> <span>' + user.full_name.split(' ')[0] + '</span>';
    btn.href = '#';
    btn.onclick = function(e) { e.preventDefault(); window.logout(); };
  } else {
    btn.innerHTML = '<i class="fas fa-user"></i> <span>Login</span>';
    btn.href = 'auth.html';
    btn.onclick = null;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  protectPage();
  updateNavUI();
});
