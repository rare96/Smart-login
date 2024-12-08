var loginEmailInput = document.getElementById("loginEmail");
var loginPasswordInput = document.getElementById("loginPassword");
var loginBtn = document.getElementById("loginBtn");

var signupNameInput = document.getElementById("signupName");
var signupEmailInput = document.getElementById("signupEmail");
var signupPasswordInput = document.getElementById("signupPassword");
var signupBtn = document.getElementById("signupBtn");


var users = [];

if (localStorage.getItem("users") !== null) {
    users = JSON.parse(localStorage.getItem("users"));
}

function signIn() {
    var loginEmail = loginEmailInput.value;
    var loginPassword = loginPasswordInput.value;

    if (loginEmail === "" || loginPassword === "") {
        swal({
            text: "Please fill in all fields",
        });
        return;
    }

    if (validInputs(loginEmail, loginPassword)) {
        clearLoginForm();  
        window.location.href = "home.html"; 
    } else {
        swal({
            text: "Incorrect email or password",
        });
    }
}

function validInputs(email, password) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            localStorage.setItem("userName", users[i].name);  
            return true;
        }
    }
    return false;
}

function clearLoginForm() {
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
}



function signUp() {
    var user = {
        name: signupNameInput.value,
        email: signupEmailInput.value,
        password: signupPasswordInput.value,
    };

    if (signupNameInput.value === "" || signupEmailInput.value === "" || signupPasswordInput.value === "") {
        swal({
            text: "Please fill in all fields",
        });
        return;
    }

    if (!isValidEmail(signupEmailInput.value)) {
        swal({
            text: "Invalid email format",
        });
        return;
    }

    if (!isNewEmail(signupEmailInput.value)) {
        swal({
            text: "Email already in use",
        });
        return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    clearSignupForm();  
    swal({
        text: "Sign up successful",
    });
}

function isValidEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function isNewEmail(email) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return false;
        }
    }
    return true;
}

function clearSignupForm() {
    signupNameInput.value = "";
    signupEmailInput.value = "";
    signupPasswordInput.value = "";
}



var logOutBtn = document.getElementById("logOutBtn");
var welcomeUser = document.getElementById("userName");
var userName = localStorage.getItem("userName");

welcomeUser.innerHTML = "Welcome " + userName;

logOutBtn.addEventListener("click", function () {
  window.location.href = "index.html";
});
