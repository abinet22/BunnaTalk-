document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

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

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const username = document.getElementById('username'); // Added username
        const password = document.getElementById('password');
        const confirm = document.getElementById('confirmpassword');

        let isValid = true;

        if (name.value.length < 1) {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            removeError(name);
        }

        if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(email);
        }

        if (username.value.length < 1) { // Validate username
            showError(username, 'User Name is required');
            isValid = false;
        } else {
            removeError(username);
        }

        if (password.value.length < 8) {
            showError(password, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            removeError(password);
        }

        if (password.value !== confirm.value) {
            showError(confirm, 'Passwords do not match');
            isValid = false;
        } else {
            removeError(confirm);
        }

        if (isValid) {
            // Prepare data for submission
            const formData = {
                name: name.value,
                email: email.value,
                username: username.value,
                password: password.value
            };

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    // Registration was successful
                    console.log('Registration successful');
                    // Optionally redirect or show a success message
                    window.location.href = '/login'; // Redirect to login page after successful registration
                } else {
                    // Handle errors returned from the server
                    const errorData = await response.json();
                    console.error('Registration error:', errorData);
                    showError(name, errorData.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                showError(name, 'An error occurred. Please try again later.');
            }
        }
    });
});
