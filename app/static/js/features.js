
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      buttons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
      });
      
      if (e.target.textContent === 'Car') {
        e.target.classList.add('correct');
      } else {
        e.target.classList.add('incorrect');
      }
    });
  });

  const flashcard = document.querySelector('.flashcard');
  if (flashcard) {
    flashcard.addEventListener('click', () => {
      flashcard.classList.toggle('flipped');
    });
  }
});
