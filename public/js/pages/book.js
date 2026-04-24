// BOOK.JS - Handle booking form submission

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupForm);
} else {
  setupForm();
}

function setupForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'submitting...';
    
    const bookingData = {
      full_name: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      preferred_location: document.getElementById('location').value.trim() || null,
      additional_request: document.getElementById('request').value.trim() || null,
      referral_code: document.getElementById('referral').value.trim() || null,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    if (!bookingData.full_name || !bookingData.email) {
      showMessage('formMessage', 'Please fill in all required fields.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      showMessage('formMessage', 'Please enter a valid email address.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      return;
    }
    
    try {
      const { data, error } = await window.supabaseClient
        .from(window.BOOKINGS_TABLE)
        .insert([bookingData])
        .select();
      
      if (error) throw error;
      
      showMessage('formMessage', '✓ Session request submitted successfully! You will receive a confirmation email within 24 hours.', 'success');
      form.reset();
      
    } catch (error) {
      console.error('Error:', error);
      showMessage('formMessage', 'Error submitting request. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}