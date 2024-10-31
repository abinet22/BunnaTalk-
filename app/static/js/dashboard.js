document.addEventListener('DOMContentLoaded', () => {
  const courseCards = document.querySelectorAll('.course-card');
  courseCards.forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = '/learning';
    });
  });

  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.textContent = navLinks.classList.contains('active') ? '×' : '☰';
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
      navLinks.classList.remove('active');
      mobileMenu.textContent = '☰';
    }
  });

  // Close mobile menu when window is resized above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      mobileMenu.textContent = '☰';
    }
  });
});
