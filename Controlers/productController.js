const Product = require("../Models/Products");
const Checkout = require("../Models/Checkout");
const Users = require("../Models/User");

const asyncWrapper = require("../Middleware/asyncWrapper");

const addProduct = asyncWrapper (async (req, res) => {
    const productData =  req.body;
    const productFiles =  req.files;

    const imageName = productFiles.map((file) => file.filename);
    productData.gallery = imageName;

    const result = await Product.create(productData);
    res.status(200).json({message: "product save"});
})

const allProducts = async (req, res) => {
    const { minPrice, maxPrice, ratings } = req.query;
    const queryObject = {};

    if (minPrice && maxPrice) {
        queryObject.price = {
            $gte: Number(minPrice),
            $lte: Number(maxPrice)
        };
    } else if(minPrice) {
        queryObject.price = { $gte: Number(minPrice) };
    } else if(maxPrice) {
        queryObject.price = { $lte: Number(maxPrice) };
    }
    
    if (ratings) {
        queryObject.ratings = Number(ratings);
    }
    
    try {
        const products = await Product.find(queryObject);
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
    }
};

const singleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({_id: id});
    
        if(!product){
            res.status(404).json({ error: "Product not found"})
        }
        res.status(200).json({ product });
        
    } catch (error) {
        console.log(error);
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productData =  req.body;
        const productFiles =  req.files;
        
        if(productFiles){
            const imageName = productFiles.map((file) => file.filename);
            productData.gallery = imageName;
        }
        if (productData.gallery.length === 0) {
            delete productData.gallery;
        }
    
        const result = await Product.findByIdAndUpdate(id, productData);
        console.log(result);
        res.status(200).json({ product: result});
        
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findByIdAndDelete({_id: id});
    
        if(!product){
            res.status(404).json({ message: "Product not Found!"});
        }
    
        res.status(200).json({ result: "ok"});   
    } catch (error) {
        console.log(error);
    }
};

const getOrders = async (req, res) => {
    try {
        const result = await Checkout.find();
        
        const ids = result.map(users => users.userid);
        const usernames = await Users.find({_id: { $in: ids}});

        const Orders = result.reduce((acc, item) => {
            const user = usernames.find(user => user._id.toString() === item.userid.toString());
            acc.push({
                _id: item._id,
                username: user ? user.username : "Unknown",
                product: item.product,
                totalprice: item.totalprice,
                orderdate: item.orderdate,
                accepted: item.accepted,
                receive: item.receive,
                receivedate: item.receivedate,
                cancelled: item.cancelled
            });
            return acc;
        }, []);

        res.status(200).json({message: "success", Orders});
    } catch (error) {
        console.log(error);
    }
}

const cancelProduct = async (req, res) => {
    const {id} = req.params;
    const queryObject = {
        cancelled: true 
    }

    try {
        const result = await Checkout.findByIdAndUpdate(id, queryObject, { new: true });
        res.status(200).json({message: "success"});
    } catch (error) {
        console.log(error);
    }
}

const acceptProduct = async (req, res) => {
    const {id} = req.params;
    const queryObject = {
        accepted: true 
    }
    console.log(id);

    try {
        const result = await Checkout.findByIdAndUpdate(id, queryObject, { new: true });
        res.status(200).json({message: "success"});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addProduct,
    allProducts,
    singleProduct,
    updateProduct,
    deleteProduct,
    getOrders,
    acceptProduct,
    cancelProduct,
}