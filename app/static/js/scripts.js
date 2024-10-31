
document.addEventListener('DOMContentLoaded', () => {
  // Animate progress bars
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const random = Math.floor(Math.random() * 40) + 60; // Random progress between 60-100%
    bar.style.width = `${random}%`;
  });

  // Add scroll reveal animation
  const cards = document.querySelectorAll('.feature-card, .language-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
  });
});
