// Function to validate the form
function validateForm(event) {
    event.preventDefault();
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

    // Date of Birth validation
    const dob = document.getElementById('dob').value;
    if (!dob) {
        document.getElementById('dobError').textContent = 'Please select your date of birth';
        isValid = false;
    } else {
        const dobDate = new Date(dob);
        const today = new Date();
        if (dobDate >= today) {
            document.getElementById('dobError').textContent = 'Date of birth cannot be in the future';
            isValid = false;
        }
    }

    // City validation
    const city = document.getElementById('city').value;
    if (!city) {
        document.getElementById('cityError').textContent = 'Please select a city';
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
        document.getElementById('registrationForm').reset();
    }

    return isValid;
}

// Real-time phone number validation
document.getElementById('phone').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Set max date for Date of Birth to today
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dob').max = new Date().toISOString().split('T')[0];
});