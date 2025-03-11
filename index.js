// In-memory storage for registered users (for demo only)
let registeredUsers = [];

// Function to handle registration
function handleRegistration() {
    if (document.querySelector('.register-container')) {
        const form = document.querySelector('.register-container form');
        const messageContainer = document.getElementById('register-message');
        
        if (form) {
            form.onsubmit = function(e) {
                e.preventDefault();
                
                const username = form.elements['username'].value;
                const email = form.elements['email'].value;
                const password = form.elements['password'].value;
                const confirmPassword = form.elements['confirm_password'].value;
                
                if (password !== confirmPassword) {
                    messageContainer.innerHTML = '<div style="background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin-bottom: 15px;">Passwords do not match. Please try again.</div>';
                    return false;
                }
                
                registeredUsers.push({ username, email, password });
                sessionStorage.setItem('lastRegisteredUser', username);
                sessionStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
                
                messageContainer.innerHTML = '<div style="background-color: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-bottom: 15px;">Registration successful! Redirecting to login page...</div>';
                setTimeout(() => { window.location.href = "index.html"; }, 2000);
            };
        }
    }
}

// Function to handle login
function enhanceLoginButton() {
    if (document.querySelector('.login-container')) {
        const loginBtn = document.getElementById('mySubmit');
        const loginMessage = document.createElement('p');
        document.querySelector('.login-container').appendChild(loginMessage);

        loginBtn.onclick = function() {
            const username = document.getElementById('myUser').value;
            const password = document.getElementById('myPass').value;
            
            if (!username || !password) {
                loginMessage.textContent = "Please enter both username and password.";
                loginMessage.style.color = "#721c24";
                return;
            }
            
            const storedUsers = JSON.parse(sessionStorage.getItem('registeredUsers')) || [];
            const user = storedUsers.find(user => user.username === username && user.password === password);
            
            if (user) {
                sessionStorage.setItem('loggedInUser', username);
                loginMessage.textContent = "Login successful! Redirecting...";
                loginMessage.style.color = "#155724";
                setTimeout(() => { window.location.href = "dashboard.html"; }, 1500);
            } else {
                loginMessage.textContent = "Invalid username or password.";
                loginMessage.style.color = "#721c24";
            }
        };
    }
}

// Redirect to login if user is not logged in
function protectDashboard() {
    if (document.body.classList.contains('dashboard')) {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert("You must be logged in to access this page.");
            window.location.href = "index.html";
        }
    }
}

// Function to toggle settings dropdown menu
function toggleSettings() {
    let settingsMenu = document.getElementById('settings-menu');
    const settingsBtn = document.querySelector('.fa-cog');

    if (!settingsMenu) {
        settingsMenu = document.createElement('div');
        settingsMenu.id = 'settings-menu';
        settingsMenu.style.position = 'absolute';
        settingsMenu.style.background = '#fff';
        settingsMenu.style.padding = '10px';
        settingsMenu.style.border = '1px solid #ccc';
        settingsMenu.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
        settingsMenu.style.borderRadius = '5px';
        settingsMenu.style.display = 'none';
        settingsMenu.style.zIndex = '1000'; // Ensures it appears above other elements
        settingsMenu.innerHTML = `
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="padding: 5px; cursor: pointer;" onclick="changeAppearance()">Appearance</li>
                <li style="padding: 5px; cursor: pointer;" onclick="changeLanguage()">Languages</li>
                <li style="padding: 5px; cursor: pointer; color: red;" onclick="resetSettings()">Reset Settings</li>
            </ul>
        `;
        document.body.appendChild(settingsMenu);
    }

    // Calculate position dynamically based on button location
    const rect = settingsBtn.getBoundingClientRect();
    settingsMenu.style.top = `${rect.bottom + window.scrollY}px`; // Below the button
    settingsMenu.style.left = `${rect.left + window.scrollX}px`; // Aligned with button

    // Toggle visibility
    settingsMenu.style.display = settingsMenu.style.display === 'block' ? 'none' : 'block';
}


// Dummy functions for settings options
function changeAppearance() {
    alert("Appearance settings will be implemented soon.");
}

function changeLanguage() {
    alert("Language settings will be implemented soon.");
}

function resetSettings() {
    alert("Settings have been reset to default.");
}

// Run necessary functions on page load
document.addEventListener('DOMContentLoaded', function() {
    handleRegistration();
    enhanceLoginButton();
    protectDashboard();
    
    if (document.querySelector('.login-container')) {
        const lastUser = sessionStorage.getItem('lastRegisteredUser');
        if (lastUser) {
            document.getElementById('myUser').value = lastUser;
        }
    }
    
    // Attach settings button event listener
    const settingsBtn = document.querySelector('.fa-cog');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', toggleSettings);
    }
});
