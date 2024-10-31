// static/js/toast.js
document.addEventListener('DOMContentLoaded', () => {
    const toastContainer = document.getElementById('toast-container');

    if (toastContainer) {
        const toasts = toastContainer.getElementsByClassName('toast');
        Array.from(toasts).forEach((toast) => {
            setTimeout(() => {
                toast.classList.add('fade-out'); // Add fade-out class for animation
                setTimeout(() => {
                    toast.remove(); // Remove the toast element after fading out
                }, 500); // Duration of fade-out animation
            }, 3000); // Show for 3 seconds
        });
    }
});
