const loginForm = document.querySelector(".login-form");
const emailError = document.querySelector(".email");
const passwordError = document.querySelector(".password");

loginForm.addEventListener('submit', async (e) => {
    const btn = loginForm.querySelector("button");
    btn.textContent = "Login..."
    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";

    const userData = {
        email: loginForm.email.value,
        password: loginForm.password.value
    }

    try {
        const res = await fetch("/api/auth/user/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "content-type": "application/json" }
        });

        const data = await res.json();

        if(data.errors){
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
        }

        if(data.user){
            console.log("user");
            window.location.href = "/";
            btn.textContent = "Login";
        }

    } catch (error) {
        console.log(error);
    }
})