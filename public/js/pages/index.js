// INDEX.JS - Homepage with mobile navigation and rotating background

// Background image rotation
const backgroundImages = [
  'https://res.cloudinary.com/db65uctco/image/upload/v1775302841/pic1_pnem7t.jpg',
  'https://res.cloudinary.com/db65uctco/image/upload/v1775302841/pic_2_lxyzxo.jpg',
  'https://res.cloudinary.com/db65uctco/image/upload/v1775302841/pic_3_fftb0h.jpg',
  'https://res.cloudinary.com/db65uctco/image/upload/v1775302841/pic4_o0uiis.jpg'
];

let currentImageIndex = 0;
let bgRotationInterval;

function changeBackgroundImage() {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;
  
  heroBg.style.opacity = '0';
  
  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    heroBg.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    heroBg.style.opacity = '1';
  }, 500);
}

function startBackgroundRotation() {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;
  
  heroBg.style.backgroundImage = `url('${backgroundImages[0]}')`;
  heroBg.style.opacity = '1';
  bgRotationInterval = setInterval(changeBackgroundImage, 4000);
}

function stopBackgroundRotation() {
  if (bgRotationInterval) {
    clearInterval(bgRotationInterval);
  }
}

// Mobile menu functionality
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
  
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Set active nav link based on scroll position
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Pause background rotation when hovering over hero section
function initBackgroundHover() {
  const homeSection = document.getElementById('home');
  if (!homeSection) return;
  
  homeSection.addEventListener('mouseenter', stopBackgroundRotation);
  homeSection.addEventListener('mouseleave', startBackgroundRotation);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  startBackgroundRotation();
  initMobileMenu();
  initSmoothScroll();
  initScrollSpy();
  initBackgroundHover();
});