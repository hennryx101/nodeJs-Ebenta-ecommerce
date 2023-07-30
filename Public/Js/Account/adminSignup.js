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

    const adminData = {
        username: signupForm.username.value,
        email: signupForm.email.value,
        password: signupForm.password.value
    }
    
    try {
        const res = await fetch("/api/admin/signup", {
            method: "POST",
            body: JSON.stringify(adminData),
            headers: {"content-type": "application/json"}
        });
        const data = await res.json();
    
        console.log(data);
        if(data.errors){
            usernameError.textContent = data.errors.username;
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
        }
    
        if(data.user){
            window.location.href = "/";
            btnSignup.textContent = "Signup";
        }
    } catch (error) {
        console.log(error);
    }
});