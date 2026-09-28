document.getElementById("registrationForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phone").value;
    let gender = document.getElementById("gender").value;

    let message = document.getElementById("message");

    if (name === "" || email === "" || password === "" || phone === "" || gender === "") {
        message.textContent = "Please fill all fields.";
        message.style.color = "red";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "red";
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        message.textContent = "Enter a valid 10-digit phone number.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Registration Successful!";
    message.style.color = "green";

    document.getElementById("registrationForm").reset();
});