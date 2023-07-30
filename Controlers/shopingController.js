const mongoose = require('mongoose');
const Cart = require("../Models/AddToCart");
const Products = require("../Models/Products");
const TotalPrice = require("../Models/TotalPrice");
const Checkout = require("../Models/Checkout");
const History = require("../Models/History");

const addCart = async (req, res) => {
    const id = req.user.id;
    const {productid, ordercount} = req.body;
    
    const products = {}
    try {

        const isExistinCart = await Cart.find({productid: productid});

        console.log(isExistinCart.length);
        
        if(isExistinCart.length > 0){
            console.log("have a product");
            const newCount = parseInt(isExistinCart[0].ordercount) + parseInt(ordercount);
            const cart = await Cart.findOneAndUpdate({productid: productid}, {ordercount: newCount}, {new: true, runValidators: true});
            console.log(cart);
            return res.status(200).json({ message: "Succesfully Added new value in cart"});
       
        }

        const product = await findProductById(req, res, productid);

        let price = 0;
        for(const prod of product){
            price = parseInt(prod.price);
        }
        
        products.userid = id;
        products.productid = productid;
        products.productprice = price;
        products.ordercount = ordercount;
        
        console.log(price);
        await Cart.create(products);
        res.status(200).json({ message: "Succesfully Added to cart"});
        
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
    }
}

const getCart = async (req, res) => {
    const {id} = req.user;

    try {
        const cartProducts = await Cart.find({userid: id});
        const productrIds = cartProducts.map(cartProduct => cartProduct.productid);
        const productList = await Products.find({_id: { $in: productrIds}});

        const cartItems = productList.reduce((acc, product) => {
            const cartProduct = cartProducts.find(item => new mongoose.Types.ObjectId(item.productid).equals(product._id));
            acc[product._id] = {
                _id: product._id,
                name: product.name,
                price: product.price,
                gallery: product.gallery,
                orderCount: cartProduct.ordercount,
                cartId: cartProduct._id,
                ischeck: cartProduct.ischecked
              };
              return acc;
        }, {});
        const priceList = await findAllChekedItems(req, res, id);
        res.status(200).json({ product: "Successfully failed", cartItems, priceList});
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
    }
}

const removeCart = async (req, res) => {
    const id = req.params.id;
    try {
        await Cart.findByIdAndDelete(id);
        res.status(200).json({ message: "success"});
    } catch (error) {
        res.status(404).json({ message: "Product cannot Delete for some reason"});
    }
}

const updateQuantity = async (req, res) => {
    const id = req.params.id;
    const order = req.body;
    
    try {
        // const ordCount = parseInt(order.ordercount);

        // if(order.ordercount > 1){
        //     const count = ordCount * ordPrice;
        //     order.productprice = count;
        // }

        const count = {
            ordercount: order.ordercount
        }

        await Cart.findByIdAndUpdate(id, count, { new: true, runValidators: true })
        res.status(200).json({message: "success"});
    } catch (error) {
        console.log(error);
        res.status(404).json({ error, err: "Not found!"});
    }
    
    
}

const singleItem = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Cart.find({_id: id});
        res.status(200).json({ result: result });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error, err: "Not found!"});
    }
}

const checkItem = async (req, res) => {
    const {id} = req.user;
    const cheked = req.body;
    const cartId = req.params.id;

    try {
        await Cart.findByIdAndUpdate({_id: cartId}, cheked, { new: true, runValidators: true });
        const priceList = await findAllChekedItems(req, res, id);
        res.status(200).json({message: "success", priceList});

    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

const findAllChekedItems = async (req, res, id) => {
    const queryObj = {
        ischecked: true
    }

    try {
        let TotalPrices = {totalproductprice: 0, userid: id}
        const result = await Cart.find(queryObj);
        if(result.length > 0) {
            for(let obj of result) {
                const total = parseInt(obj.ordercount) * parseInt(obj.productprice);
                TotalPrices.totalproductprice += total;
            }
        }

        const priceList = await TotalPrice.create(TotalPrices);
        return priceList.totalproductprice;
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
    }
}

// Todo: subtract the number of orders in number of stock
const checkoutItem = async (req, res) => {
    const {id} = req.user;
    const checkoutItems = req.body;

    try {
        const productid = checkoutItems.map((cartItem) => {
            cartItem.userid = id;
            return cartItem.product._id;
        });
        const products = await findProductById(req, res, productid);

        for(const cartItems of checkoutItems){
            const product = products.find((prod) => prod._id.toString() === cartItems.product._id.toString());

            if(!product) {
                return res.status(404).json({ error, err: "Not found!"});
            }
            const prodPrice = cartItems.product.price;
            const ordercount = cartItems.product.orderCount;
            
            if(ordercount > product.stock){
                return res.status(404).json({ error, err: "Sorry The product is out of stock!"});
            }
            cartItems.totalprice = parseInt(ordercount) * parseInt(prodPrice);
            const newStock = product.stock - ordercount;
            
            await Products.findByIdAndUpdate({_id: product._id}, {stock: newStock}, { new: true, runValidators: true });
        }

        const CheckoutItem = await Checkout.create(checkoutItems);
        await TotalPrice.deleteMany({userid: id});
        res.status(200).json({ message: "success", CheckoutItem});

    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

const removeAllCheckoutItems = async (req, res) => {
    const ids = req.body;
    const filter = { _id: { $in : ids}}

    try {
        const result = await Cart.deleteMany(filter);
        res.status(200).json({ message: "success"});
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

const getAllCheckoutItems = async (req, res) => {
    const {id} = req.user;

    try {

        const result = await Checkout.find({userid: id});
        res.status(200).json({message: "success", result});
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

const orderReceive = async (req, res) => {
    const {id} = req.params;
    const isReceived = req.body;
    console.log(isReceived);
    console.log(id);

    try {
        const result = await Checkout.findByIdAndUpdate({_id: id}, isReceived, { new: true, runValidators: true });
        
        const history = await findAndSave(req, res, id);
        if(!history){
            res.status(404).json({message: "Item not found"});
        }
        console.log(result);
        res.status(200).json({message: "success", result});
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

const buyNow = async (req, res) => {
    const {id} = req.user;
    const { productid, ordercount } = req.body;
    console.log(ordercount);

    try {
        const products = await findProductById(req, res, productid);

        let price = 0;
        let stocks = 0;
        for(const prod of products){
            price = parseInt(prod.price);
            stocks = parseInt(prod.stock);
        }

        if(ordercount > stocks){
            return res.status(200).json({message: "No stock"});
        }

        const stock = stocks - parseInt(ordercount);
        await Products.findByIdAndUpdate(productid, {stock: stock}, { new: true, runValidators: true });

        const total = price * parseInt(ordercount);

        const newObject = products.reduce((acc, product) => {
            return acc = {
                _id: product._id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                description: product.description,
                origins: product.origins,
                gallery: product.gallery,
                orderCount: ordercount
              };
        }, {});

        const buyProduct = {
          product: newObject,
          totalprice: total,
          userid: id,
        };

        res.status(200).json({message: "success"});
        await Checkout.create(buyProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const Cancelitem = async (req, res) => {
    const {id} = req.params;

    const cancel = {
        cancelled: true
    }

    try {
        await Checkout.findByIdAndUpdate({_id: id}, cancel);
        res.status(200).json({message: "success"});

    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

const findProductById = async (req, res, id) => {
    try {
        const product = await Products.find({_id: id});
        return product;
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

const findAndSave = async (req, res, id) => {
    try {
        const canceledItem = await Checkout.find({_id: id});

        const newHistory = canceledItem.reduce((acc, item) => {
            return acc = {
                userid: item.userid, 
                product: item.product,   
                totalprice: item.totalprice, 
                orderdate: item.orderdate, 
                accepted: item.accepted,
                receive: item.receive,
                receivedate: item.receivedate,
                cancelled: item.receivedate
            };
        }, {});
        
        const history = await History.create(newHistory);
        if(history){
            return history;
        }
        return null;
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

const getHistory = async (req, res) => {
    const {id} = req.user;

    try {
        const result = await History.find({userid: id});
        res.status(200).json({message: "success", result});
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

const orderAgain = async (req, res) => {
    const {id} = req.params;

    try {
        const result = await History.find({_id: id});

        const addCartAgain = result.reduce((acc, item) => {
           acc.push({
                userid: item.userid,
                productid: item.product._id.toString(),
                ordercount: item.product.orderCount,
                ischecked: true,
                productprice: item.product.price
            });
            return acc
        }, []);
        await Cart.create(addCartAgain);
        res.status(200).json({message: "success"});
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

const removeCheckoutItem = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        const history = await findAndSave(req, res, id);
        if(!history){
            res.status(404).json({message: "Item not found"});
        }

        const result = await Checkout.findByIdAndDelete({_id: id});

        console.log(result);
        res.status(200).json({message: "success", result});
    } catch (error) {
        res.status(404).json({ error, err: "Not found!"});
        console.log(error);
    }
}

module.exports = {
    addCart,
    getCart,
    removeCart,
    updateQuantity,
    singleItem,
    checkoutItem,
    checkItem,
    removeAllCheckoutItems,
    getAllCheckoutItems,
    orderReceive,
    buyNow,
    Cancelitem,
    getHistory,
    orderAgain,
    removeCheckoutItem,
}