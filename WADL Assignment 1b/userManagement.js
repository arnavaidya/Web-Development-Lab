// userManagement.js

// Static credentials for login
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "Admin@123";

// Function to validate login credentials
function validateLogin(event) {
    event.preventDefault();
    
    // Clear previous error messages
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // Username validation (up to 10 alphabets)
    if (!/^[A-Za-z]{1,10}$/.test(username)) {
        document.getElementById('usernameError').textContent = 'Username must contain only alphabets (max 10 characters)';
        return false;
    }
    
    // Password validation (8+ chars, digit, alphabet, uppercase, special char)
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        document.getElementById('passwordError').textContent = 
            'Password must be at least 8 characters with 1 uppercase, 1 digit, and 1 special character';
        return false;
    }
    
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        window.location.href = 'form.html';
        return true;
    } else {
        alert('Invalid credentials!');
        return false;
    }
}

// Function to clear login form
function clearForm() {
    document.getElementById('loginForm').reset();
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
}

// Function to validate registration form
function validateForm(event) {
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    // First Name validation
    const firstName = document.getElementById('firstName').value.trim();
    if (firstName.length < 2) {
        document.getElementById('firstNameError').textContent = 'First name must be at least 2 characters long';
        isValid = false;
    }

    // Last Name validation
    const lastName = document.getElementById('lastName').value.trim();
    if (lastName.length < 2) {
        document.getElementById('lastNameError').textContent = 'Last name must be at least 2 characters long';
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Gender validation
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        document.getElementById('genderError').textContent = 'Please select a gender';
        isValid = false;
    }

    // City validation
    const city = document.getElementById('city').value;
    if (!city) {
        document.getElementById('cityError').textContent = 'Please select a city';
        isValid = false;
    }

    return isValid;
}

// Function to handle registration form submission
function handleRegistration(event) {
    event.preventDefault();
    
    if (!validateForm(event)) {
        return false;
    }
    
    // Get selected hobbies
    const selectedHobbies = [];
    document.querySelectorAll('input[name="hobby"]:checked').forEach(hobby => {
        selectedHobbies.push(hobby.value);
    });
    
    // Create user data object
    const userData = {
        firstName: document.getElementById('firstName').value.trim(),
        middleName: document.getElementById('middleName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        gender: document.querySelector('input[name="gender"]:checked').value,
        city: document.getElementById('city').value,
        hobbies: selectedHobbies,
        registrationDate: new Date().toISOString()
    };
    
    // Simulate AJAX POST request
    simulateAjaxPost(userData);
    return false;
}

// Function to simulate AJAX POST
function simulateAjaxPost(userData) {
    // Show loading state
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
    }

    // Simulate AJAX request with a delay
    setTimeout(() => {
        try {
            // Get existing users or initialize empty array
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Add new user
            users.push(userData);
            
            // Save back to localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Registration successful!');
            window.location.href = 'users.html';
        } catch (error) {
            console.error('Error saving data:', error);
            alert('An error occurred while saving your data.');
            
            // Reset button state
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
        }
    }, 1000); // 1 second delay to simulate network request
}

// Function to display registered users
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const container = document.getElementById('usersList');
    
    if (users.length === 0) {
        container.innerHTML = '<p>No registered users found.</p>';
        return;
    }
    
    let table = `
        <table class="users-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Hobbies</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    users.forEach(user => {
        const fullName = `${user.firstName} ${user.middleName} ${user.lastName}`.trim();
        table += `
            <tr>
                <td>${fullName}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.gender}</td>
                <td>${user.city}</td>
                <td>${user.hobbies.join(', ') || 'None selected'}</td>
            </tr>
        `;
    });
    
    table += '</tbody></table>';
    container.innerHTML = table;
}

// Add real-time phone number validation
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
});