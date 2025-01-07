// Entire script will be in strict mode
"use strict";
// Function to add error message and apply error style
function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

// Function to remove error message and apply success style
function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

// Function to validate email using regular expression
function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
}

// Function to validate password with special characters, capital letter, and numbers
function isValidPassword(password) {
    const passwordPattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    return passwordPattern.test(password);
}

// Function to validate date of birth
function isValidDOB(dob) {
    if (dob.trim() === '') {
        return false;
    }
    const currentDate = new Date();
    const inputDate = new Date(dob);
    const age = currentDate.getFullYear() - inputDate.getFullYear();
    if (age < 12) {
        return false;
    }
    return true;
}

// Function to validate phone number with a minimum of 8 and a maximum of 15 digits
function isValidPhoneNumber(phone) {
    const phoneNumberPattern = /^\d{8,15}$/;
    return phoneNumberPattern.test(phone);
}

// Validation function for the signup form
function validateSignUpForm() {
    const form = document.forms.register; // Get the form by its name
    const name = form.name;
    const email = form.email;
    const password = form.password;
    const confirmPassword = form['confirm-password']; // Access by name for hyphenated IDs
    const dob = form.dob;
    const phone = form.phone;
    let isValid = true; // Track overall validity

    // Reset previous errors
    setSuccess(name);
    setSuccess(email);
    setSuccess(password);
    setSuccess(confirmPassword);
    setSuccess(dob);
    setSuccess(phone);

    //Validate userName
    const nameValue = name.value.trim();
    if (nameValue === '') {
        setError(name, 'Please enter your name');
        isValid = false;
    }

    // Validate email
    const emailValue = email.value.trim();
    if (emailValue === '' || !isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    }

    // Validate password
    const passwordValue = password.value;
    if (passwordValue === '' || !isValidPassword(passwordValue)) {
        setError(password, 'Password must contain at least 8 characters, including a capital letter, a number, and a special character');
        isValid = false;
    }

    // Validate confirm password
    const confirmPasswordValue = confirmPassword.value;
    if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, "Passwords don't match");
        isValid = false;
    }

    // Validate date of birth
    const dobValue = dob.value.trim();
    if (!isValidDOB(dobValue)) {
        setError(dob, 'You must be at least 12 years old');
        isValid = false;
    }

    // Validate phone number
    const phoneValue = phone.value.trim();
    if (!isValidPhoneNumber(phoneValue)) {
        setError(phone, 'Phone Number must be 8 to 15 digits');
        isValid = false;
    }
    
    if (isValid) {
        // Retrieve existing users data from local storage
        const existingUsersData = localStorage.getItem('usersData');
    
        // Initialize usersData as an empty array
        let usersData = [];
    
        // Check if any existing users data exists in local storage
        if (existingUsersData) {
            // Parse the existing users data from JSON
            usersData = JSON.parse(existingUsersData);
            
            // Check if the email value already exists in the stored data
            const existingUser = usersData.find(user => user.email === emailValue);
            if (existingUser) {

                // Display a message indicating that the account already exists
                setError(email, 'Account already exists! Please log in.');
                isValid = false;
    
                return; // Exit the function as the registration is unsuccessful
            }
        }
    
        // Create a new user object
        const newUser = {
            name: nameValue,
            email: emailValue,
            password: passwordValue,
            dob: dobValue,
            phone: phoneValue,
        };
    
        // Add the new user to the existing users data
        usersData.push(newUser);
    
        // Save the updated users data in local storage
        localStorage.setItem('usersData', JSON.stringify(usersData));
    
        // Redirect to another page 
        window.location.href = 'login.html';

    }
    
    // If all validation passes, the form will submit
    return isValid;

}

// Get all input fields and attach event listeners for keyup
document.addEventListener('DOMContentLoaded', function() {
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(field => {
        field.addEventListener('keyup', function() {
            validateSignUpForm(); // Call the validation function on keyup
        });
    });
});


// Validation function for the log in form
function validateLogInForm() {
    const form = document.forms.logIn; // Get the form by its name
    const email = form.email;
    const password = form.password;
    let isValid = true; // Track overall validity

    // Reset previous errors
    setSuccess(email);
    setSuccess(password);

    // Validate email
    const emailValue = email.value.trim();
    if (emailValue === '' || !isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    }

    // Validate password
    const passwordValue = password.value;
    if (passwordValue === '' || !isValidPassword(passwordValue)) {
        setError(password, 'Password must contain at least 8 characters, including a capital letter, a number, and a special character');
        isValid = false;
    }

    // If all validation passes, proceed with login attempt
    if (isValid) {
        const storedUsersData = JSON.parse(localStorage.getItem('usersData'));

        if (storedUsersData) {
            const storedUser = storedUsersData.find(user => user.email === emailValue);
            if (storedUser) {
                if (storedUser.password === passwordValue) {
                    // Redirect to the game page
                    window.location.href = 'game.html';
                    
                    // Store the logged-in user details in sessionStorage
                    sessionStorage.setItem('loggedInUser', JSON.stringify(storedUser));
                
                } else {
                    setError(password, 'Invalid password');
                    isValid = false;
                }
            } else {
                setError(email, 'Email not recognized');
                isValid = false;
            }
        }
    }

    // If all validation passes, the form will submit
    return isValid;
}
// Get all input fields and attach event listeners for keyup
document.addEventListener('DOMContentLoaded', function() {
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(field => {
        field.addEventListener('keyup', function() {
            validateLogInForm(); // Call the validation function on keyup
        });
    });
});
