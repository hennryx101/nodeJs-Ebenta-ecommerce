const signupForm = document.querySelector(".signup-form");
const usernameError = document.querySelector(".username") 
const emailError = document.querySelector(".email") 
const passwordError = document.querySelector(".password") 

signupForm.addEventListener('submit', async(e) => {
    const btnSignup = signupForm.querySelector("button");
    btnSignup.textContent = "Signup...";
    e.preventDefault();

    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    const userData = {
        username: signupForm.username.value,
        email: signupForm.email.value,
        password: signupForm.password.value
    }
    
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {"content-type": "application/json"}
        });
        const data = await res.json();
    
        console.log(data);
        if(data.errors){
            const error = data.errors;
            console.log(error);
            console.log(usernameError);
            
            usernameError.textContent = error.username;
            emailError.textContent = error.email;
            passwordError.textContent = error.password;
        }
    
        if(data.user){
            window.location.href = `../Views/accounts/address.html?id=${data.user}`;
            btnSignup.textContent = "Signup";
        }
    } catch (error) {
        console.log(error);
    }
});