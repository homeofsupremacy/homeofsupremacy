// ============================================
// BASE.JS - Shared functions & Supabase setup
// ============================================

// Initialize Supabase client (only once)
const SUPABASE_URL = 'https://ljccfahjmqcepfaaimnk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqY2NmYWhqbXFjZXBmYWFpbW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyOTg5NDYsImV4cCI6MjA5MDg3NDk0Nn0.bnePZRZgRuRCjVYrdEN9HYbYjgQ4VWHlLzX_KFTjs8k';

// Create global variables
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.BOOKINGS_TABLE = 'hos_bookings';

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Show message in form
function showMessage(elementId, message, type = 'success') {
  const messageDiv = document.getElementById(elementId);
  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = 'form-message';
    }, 5000);
  }
}

// Load shared components
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
});