const errorHandler = (err) => {
    console.log(err.message, err.code);
    let errors = { 
        // users
        username: "", 
        email: "",
        password: "",
        // products
        name: "",
        price: "",
        stock: "",
        description: "",
        origins: "",
        gallery: "",


    }

    if(err.message === "Incorrect Email"){
        errors.email = err.message;
    }

    if(err.message === "Incorrect Password"){
        errors.password = err.message;
    }

    if(err.code === 11000){
        errors.email = err.message;
    }

    console.log(err.message, "----2--");

    if(err.message.includes("Users validation failed")){

        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties.message, "------");
            errors[properties.path] = properties.message;
        });
    }

    if(err.message.includes("Products validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}
module.exports = errorHandler;