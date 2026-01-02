/**
 * TalentBook Login Page JavaScript
 * Handles form validation, animations, and user interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // FORM SUBMISSION HANDLING
    // ===================================

    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            const btn = this.querySelector('.btn-primary');
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validate inputs
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            // Validate email format
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Add loading state to button
            btn.classList.add('loading');
            btn.textContent = '';

            // Simulate API call (replace with actual API call)
            setTimeout(() => {
                // Remove loading state
                btn.classList.remove('loading');
                btn.textContent = 'Sign in';

                // Show success message (for demo purposes)
                alert(`Login attempted with:\nEmail: ${email}\nPassword: ${password.replace(/./g, '*')}\n\nThis is a demo. Implement actual authentication here.`);

                // In production, you would do:
                // window.location.href = '/dashboard';
            }, 2000);
        });
    }

    // ===================================
    // INPUT ANIMATIONS
    // ===================================

    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');

    inputs.forEach(input => {
        // Focus animation
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });

        // Blur animation
        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });

        // Real-time validation feedback
        input.addEventListener('input', function () {
            if (this.type === 'email' && this.value) {
                if (isValidEmail(this.value)) {
                    this.style.borderColor = '#10b981'; // Green
                } else {
                    this.style.borderColor = '#ef4444'; // Red
                }
            }
        });

        // Reset border on blur
        input.addEventListener('blur', function () {
            setTimeout(() => {
                this.style.borderColor = '';
            }, 300);
        });
    });

    // ===================================
    // SOCIAL SIGN-IN BUTTON
    // ===================================

    const socialBtn = document.querySelector('.btn-social');

    if (socialBtn) {
        socialBtn.addEventListener('click', function () {
            // Show loading state
            const originalContent = this.innerHTML;
            this.innerHTML = '<div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.6s linear infinite;"></div>';
            this.style.pointerEvents = 'none';

            // Simulate OAuth redirect
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.pointerEvents = 'auto';
                alert('Google Sign-In would be implemented here.\n\nIn production, this would redirect to Google OAuth.');
            }, 1500);
        });
    }

    // ===================================
    // LINK HANDLING (Demo Mode)
    // ===================================

    const links = document.querySelectorAll('a[href="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const linkText = this.textContent.trim();

            if (linkText === 'Forgot password?') {
                alert('Forgot Password functionality would be implemented here.\n\nUser would receive a password reset email.');
            } else if (linkText === 'Sign up for free') {
                alert('Sign Up page would be shown here.\n\nRedirect to: /signup');
            } else {
                alert(`This link (${linkText}) would navigate to the appropriate page.`);
            }
        });
    });

    // ===================================
    // REMEMBER ME FUNCTIONALITY
    // ===================================

    const rememberCheckbox = document.getElementById('remember');
    const emailInput = document.getElementById('email');

    // Load saved email if exists
    if (rememberCheckbox && emailInput) {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberCheckbox.checked = true;
        }

        // Save email when checkbox is checked
        rememberCheckbox.addEventListener('change', function () {
            if (this.checked && emailInput.value) {
                localStorage.setItem('rememberedEmail', emailInput.value);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
        });
    }

    // ===================================
    // KEYBOARD SHORTCUTS
    // ===================================

    document.addEventListener('keydown', function (e) {
        // Press Enter in email field to focus password
        if (e.key === 'Enter' && document.activeElement.id === 'email') {
            e.preventDefault();
            document.getElementById('password').focus();
        }
    });

    // ===================================
    // PASSWORD VISIBILITY TOGGLE (Optional Enhancement)
    // ===================================

    // You can add a toggle button in the HTML and uncomment this:
    /*
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            // Change icon
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
    */

});

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification (you can replace with toast library)
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Simple alert for demo (replace with better notification system)
    console.log(`[${type.toUpperCase()}] ${message}`);
    // In production, use a library like toastify or create custom toast
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Object with isValid and message
 */
function validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return {
            isValid: false,
            message: `Password must be at least ${minLength} characters`
        };
    }

    if (!hasUpperCase || !hasLowerCase) {
        return {
            isValid: false,
            message: 'Password must contain both uppercase and lowercase letters'
        };
    }

    if (!hasNumbers) {
        return {
            isValid: false,
            message: 'Password must contain at least one number'
        };
    }

    if (!hasSpecialChar) {
        return {
            isValid: false,
            message: 'Password must contain at least one special character'
        };
    }

    return {
        isValid: true,
        message: 'Password is strong'
    };
}

// ===================================
// PRODUCTION READY API INTEGRATION
// ===================================

/**
 * Example API call function (uncomment and modify for production)
 */
/*
async function loginUser(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token
            localStorage.setItem('authToken', data.token);
            
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            // Show error message
            showNotification(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    }
}
*/