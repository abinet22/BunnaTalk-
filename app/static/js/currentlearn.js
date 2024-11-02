
document.addEventListener('DOMContentLoaded', () => {
  const learningCards = document.querySelectorAll('.learning-card');
  
  learningCards.forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
      }, 100);
    });
  });

  const chatWidget = document.querySelector('.chat-widget');
  chatWidget.addEventListener('click', () => {
    alert('Chat feature coming soon!');
  });

  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});
