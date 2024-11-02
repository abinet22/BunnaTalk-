
document.addEventListener('DOMContentLoaded', () => {
  const practiceOptions = document.querySelectorAll('.practice-option');
  
  practiceOptions.forEach(option => {
    option.addEventListener('click', () => {
      practiceOptions.forEach(opt => opt.style.background = 'white');
      practiceOptions.forEach(opt => opt.style.color = 'var(--text)');
      
      if(option.textContent === 'How are you?') {
        option.style.background = 'var(--success)';
        option.style.color = 'white';
      } else {
        option.style.background = '#ff4444';
        option.style.color = 'white';
      }
    });
  });

  const playBtn = document.querySelector('.play-btn');
  playBtn.addEventListener('click', () => {
    // Audio playback functionality would go here
    alert('Audio playback coming soon!');
  });
});
