document.addEventListener('DOMContentLoaded', () => {
  const courseCards = document.querySelectorAll('.course-card');
  courseCards.forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = '/user/currentlearn';
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


let currentSlide = 1;
const totalSlides = 3;

function nextSlide() {
  if (currentSlide < totalSlides) {
    document.querySelector(`[data-slide="${currentSlide}"]`).classList.remove('active');
    currentSlide++;
    document.querySelector(`[data-slide="${currentSlide}"]`).classList.add('active');
    updateProgress();
  }
}

function previousSlide() {
  if (currentSlide > 1) {
    document.querySelector(`[data-slide="${currentSlide}"]`).classList.remove('active');
    currentSlide--;
    document.querySelector(`[data-slide="${currentSlide}"]`).classList.add('active');
    updateProgress();
  }
}

function updateProgress() {
  const dots = document.querySelectorAll('.progress-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index < currentSlide);
  });
}

function toggleSelection(element) {
  element.classList.toggle('selected');
}
function submitLanguages() {
  const nativeLanguages = Array.from(document.querySelectorAll('#nativeLanguages .selected'))
    .map(el => el.textContent.trim());
  const targetLanguages = Array.from(document.querySelectorAll('#targetLanguages .selected'))
    .map(el => el.textContent.trim());

  // Store selections
  localStorage.setItem('nativeLanguages', JSON.stringify(nativeLanguages));
  localStorage.setItem('targetLanguages', JSON.stringify(targetLanguages));

  // Send a request to update user learning language
  const learningLanguages = targetLanguages.join(', '); // Combine into a string
  fetch('/user/update_learning_language', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrf_token') // Include CSRF token if using Flask-WTF
    },
    body: JSON.stringify({ learning_language: learningLanguages })
  })
  .then(response => {
    if (response.ok) {
      // Close modal
      document.getElementById('languageModal').style.display = 'none';
    } else {
      console.error('Failed to update learning language.');
    }
  })
  .catch(error => console.error('Error:', error));
}

 
// Show modal on page load if languages haven't been selected
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
// Function to toggle language selection
function toggleSelection(element) {
  element.classList.toggle('selected');
}
