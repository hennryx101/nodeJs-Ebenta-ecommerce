import { CartSvg } from "../utils/svg.js";

const purchaseContainer = document.querySelector(".purchase-status");
const cartContainer = document.querySelector(".cart");
const logOutBtn = document.querySelector(".log-out");
const username = document.querySelector('.user-name');
const isAdmin = document.querySelector('.isAdmin');

const userDetails = document.querySelector(".user-details");

const bg30Color = getComputedStyle(document.documentElement).getPropertyValue('--bg-30');
const color20 = getComputedStyle(document.documentElement).getPropertyValue("--bg-20");
const cart = CartSvg(color20, bg30Color);

cartContainer.insertAdjacentHTML("beforeend", cart);

async function fetchUser(){
    try {
        const res = await fetch("/api/auth/user/user", {
            method: "GET"
        });
    
        const data = await res.json();

        logOutBtn.addEventListener("click", (e) => logoutFunction(e));

        // admin signUp
        const signUpdiv = document.createElement("div");
        const signUpA = document.createElement("a");
        signUpA.style.textDecoration="none";
        signUpA.style.color="black";
        signUpdiv.classList.add("primary-nav");

        // link to sign up
        signUpA.href = "./accounts/adminSignup.html";
        signUpA.textContent = "Add account";
        signUpdiv.appendChild(signUpA);

        console.log(data.user.name);

        if(data.user){
            username.textContent = data.user.name;
            isAdmin.textContent = "User";
        }
        if(data.user.isAdmin){
            isAdmin.textContent = "Admin";
            cartContainer.replaceChildren();
            purchaseContainer.replaceChildren();
            userDetails.append(signUpdiv);
        }
        
        if(data.errors){
            console.log(data.errors);
        }
    } catch (error) {
        console.log(error);
    }
}

fetchUser();

async function logoutFunction(e){
    e.preventDefault();
    console.log("click");
    try {
        const res = await fetch("/api/auth/user/logout", {
            method: "GET"
        });
    
        const data = await res.json();
        console.log(data);
        console.log(data.redirect);
        if(data.redirect){
            window.location.href = data.redirect;
        }
    } catch (error) {
        console.log(error);
    }
};
