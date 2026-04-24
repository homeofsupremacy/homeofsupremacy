// ABOUT.JS
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('menuOverlay');
  
  if (!mobileBtn || !navLinks || !overlay) return;
  
  function closeMenu() {
    navLinks.classList.remove('active');
    mobileBtn.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function openMenu() {
    navLinks.classList.add('active');
    mobileBtn.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  mobileBtn.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  overlay.addEventListener('click', closeMenu);
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}

document.addEventListener('DOMContentLoaded', initMobileMenu);