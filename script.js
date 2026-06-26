// ===============================
// Siwa Script - Fixed & Safe Version
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const themeSwitch = document.getElementById("theme-switch");
  const menuBtn = document.querySelector(".menu-btn");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-list a");

  // =========================
  // THEME TOGGLE (safe)
  // =========================
  if (themeSwitch) {
    themeSwitch.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        document.body.setAttribute("data-theme", "dark");
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem("theme", "dark");
      } else {
        document.body.removeAttribute("data-theme");
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem("theme", "light");
      }
    });
  }

  // =========================
  // MOBILE MENU (safe)
  // =========================
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      navList.classList.toggle("active");

      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });
  }

  // =========================
  // NAV ACTIVE FIX 🔥
  // =========================
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener("click", function () {

        // remove active from all links
        navLinks.forEach(l => l.classList.remove("active"));

        // add active to clicked link
        this.classList.add("active");

        // close mobile menu
        if (navList) navList.classList.remove("active");

        const icon = menuBtn?.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }

      });
    });
  }

});



// Auto Active Navigation
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  
  document.querySelectorAll('.nav-list a').forEach(link => {
    const href = link.getAttribute('href');
    
    if (href === currentPage) {
      document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
});