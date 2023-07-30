const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const adminSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username cannot be empty!"]
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty!"],
        unique: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be greater than 8 character"]
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
}, { timestamps: true});

adminSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

adminSchema.statics.login = async function(email, password) {

    const user = await this.findOne({ email });

    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error("Incorrect Password");
    }

    throw Error("Incorrect Email");
}


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;