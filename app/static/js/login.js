document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showError = (input, message) => {
      const formGroup = input.parentElement;
      formGroup.classList.add('error');
      const error = formGroup.querySelector('.error-message');
      error.textContent = message;
  };

  const removeError = (input) => {
      const formGroup = input.parentElement;
      formGroup.classList.remove('error');
  };

  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email');
      const password = document.getElementById('password');

      let isValid = true;

      if (!validateEmail(email.value)) {
          showError(email, 'Please enter a valid email address');
          isValid = false;
      } else {
          removeError(email);
      }

      if (password.value.length < 1) {
          showError(password, 'Password is required');
          isValid = false;
      } else {
          removeError(password);
      }

      if (isValid) {
          // Prepare data for sending to the server
          const loginData = {
              email: email.value,
              password: password.value,
          };

          try {
              const response = await fetch('/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(loginData),
              });

              if (!response.ok) {
                  throw new Error('Login failed');
              }

              // Optionally handle the successful response
              const result = await response.json();
              console.log('Login successful:', result);
              window.location.href = '/dashboard';
              // Redirect or do something with the response
          } catch (error) {
              console.error('Error during login:', error);
          }
      }
  });
});
