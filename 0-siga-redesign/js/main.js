
// Form validation and submission handling
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    input.classList.add('error');
    
    // Remove existing error message if any
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    input.classList.remove('error');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function togglePassword() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearError(emailInput);
    clearError(passwordInput);
    
    let isValid = true;
    
    // Validate email
    if (!emailInput.value) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!passwordInput.value) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (!isValid) return;

    const submitButton = loginForm.querySelector('.login-btn');
    submitButton.classList.add('loading');
    submitButton.textContent = 'Signing in...';
    
    try {
        const response = await simulateApiCall({
            email: emailInput.value,
            password: passwordInput.value,
            remember: document.getElementById('remember').checked
        });

        if (response.success) {
            submitButton.textContent = 'Success!';
            // Redirect or handle successful login
        } else {
            showError(emailInput, 'Invalid email or password');
            showError(passwordInput, 'Invalid email or password');
        }
    } catch (error) {
        showError(emailInput, 'An error occurred. Please try again later.');
    } finally {
        submitButton.classList.remove('loading');
        submitButton.textContent = 'Login';
    }
});

// Simulate API call
function simulateApiCall(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: data.email === 'test@example.com' && data.password === 'password'
            });
        }, 1000);
    });
}

// Clear errors on input
emailInput.addEventListener('input', () => clearError(emailInput));
passwordInput.addEventListener('input', () => clearError(passwordInput));