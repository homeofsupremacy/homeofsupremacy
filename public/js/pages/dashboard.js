// DASHBOARD.JS - Fetch and display bookings from Supabase

async function loadBookings() {
  const tbody = document.getElementById('bookingsBody');
  if (!tbody) return;
  
  tbody.innerHTML = '<tr class="loading-row"><td colspan="7">Loading bookings...</td></tr>';
  
  try {
    const { data, error } = await window.supabaseClient
      .from(window.BOOKINGS_TABLE)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      renderBookings(data);
    } else {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No bookings yet.</td></tr>';
    }
    
  } catch (error) {
    console.error('Error loading bookings:', error);
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--gray-500);">Error loading bookings. Make sure Supabase is configured correctly.</td></tr>';
  }
}

function renderBookings(bookings) {
  const tbody = document.getElementById('bookingsBody');
  if (!tbody) return;
  
  tbody.innerHTML = bookings.map(booking => `
    <tr>
      <td>${escapeHtml(booking.full_name || '-')}</td>
      <td>${escapeHtml(booking.email || '-')}</td>
      <td>${escapeHtml(booking.preferred_location || '-')}</td>
      <td>${escapeHtml(booking.additional_request || '-')}</td>
      <td>${escapeHtml(booking.referral_code || '-')}</td>
      <td>${formatDate(booking.created_at)}</td>
    </tr>
  `).join('');
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Initialize dashboard
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadBookings();
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) refreshBtn.addEventListener('click', loadBookings);
  });
} else {
  loadBookings();
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) refreshBtn.addEventListener('click', loadBookings);
}