// ROOMS.JS - Slideshow functionality
let slideIndex = 0;
let slides = [];
let dots = [];

function showSlides() {
  const slidesContainer = document.querySelector('.slides');
  if (!slidesContainer) return;
  
  slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.dots');
  
  if (slides.length === 0) return;
  
  // Create dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.onclick = () => currentSlide(i);
    dotsContainer.appendChild(dot);
  });
  
  dots = document.querySelectorAll('.dot');
  updateSlides();
}

function updateSlides() {
  const slidesContainer = document.querySelector('.slides');
  if (!slidesContainer) return;
  
  slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === slideIndex);
  });
}

function changeSlide(n) {
  slideIndex += n;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  updateSlides();
}

function currentSlide(n) {
  slideIndex = n;
  updateSlides();
}

// Auto-advance slides every 5 seconds
let autoAdvance = setInterval(() => changeSlide(1), 5000);

// Pause on hover
document.addEventListener('DOMContentLoaded', () => {
  showSlides();
  
  const container = document.querySelector('.slideshow-container');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    container.addEventListener('mouseleave', () => {
      autoAdvance = setInterval(() => changeSlide(1), 5000);
    });
  }
});

// Make functions global for onclick handlers
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;