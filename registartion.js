document
    .getElementById("registrationForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("password").value;

        const gender =
            document.getElementById("gender").value;


        const message =
            document.getElementById("message");


        // Check empty fields

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            password === "" ||
            gender === ""
        ) {

            message.textContent =
                "Please fill all fields.";

            message.style.color = "red";

            return;
        }


        // Password validation

        if (password.length < 6) {

            message.textContent =
                "Password must be at least 6 characters.";

            message.style.color = "red";

            return;
        }


        // Phone validation

        if (!/^[0-9]{10}$/.test(phone)) {

            message.textContent =
                "Enter a valid 10-digit phone number.";

            message.style.color = "red";

            return;
        }


        // Create user object

        const user = {

            name: name,

            email: email,

            phone: phone,

            password: password,

            gender: gender

        };


        try {

            const response = await fetch(
                "/register",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(user)

                }
            );


            const data =
                await response.json();


            if (data.success) {

                message.textContent =
                    "Registration Successful!";

                message.style.color =
                    "green";


                document
                    .getElementById("registrationForm")
                    .reset();

            } else {

                message.textContent =
                    data.message || "Registration failed.";

                message.style.color =
                    "red";

            }


        } catch (error) {

            console.error(error);


            message.textContent =
                "Unable to connect to server.";

            message.style.color =
                "red";

        }

    });