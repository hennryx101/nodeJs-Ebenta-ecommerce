const asyncWrapper = require("../Middleware/asyncWrapper");
const User = require("../Models/User");
const Address = require("../Models/userAddress");
const { Places } = require("./CheckPlaces");

const { generateToken, maxAge } = require("./usersController");

const signUpUser = asyncWrapper( async (req, res) => {
    const userData = req.body;
    const user = await User.create(userData);
    const token = generateToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
    res.status(200).json({ user: user._id });
});

const addAddress = async (req, res) => {
    const address = req.body;
    const checkAddress = await validateAddress(address);
    console.log(checkAddress);

    if(!checkAddress){
        return res.status(404).json({message: "error"});
    }
    
    try {
        await Address.create(address);
        res.status(200).json({message: "success"});
    } catch (error) {
        console.log(error);
    }
}

const validateAddress = async (address) => {

    const checkaddress = Places[address.region]
        ?.province_list[address.province]
        ?.municipality_list[address.municipality]
        ?.barangay_list.includes(address.baranggay);
   
    return checkaddress;
}


module.exports = {
    signUpUser,
    addAddress,
}