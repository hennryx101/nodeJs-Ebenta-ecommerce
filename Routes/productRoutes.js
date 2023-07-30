const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../Public/Imgs/');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        const filename = `${timestamp}${extension}`;
        cb(null, filename);
    }
    
});
const upload = multer({ storage: storage });

const { addProduct,
        allProducts, 
        singleProduct,
        updateProduct,
        deleteProduct,
        getOrders,
        acceptProduct,
        cancelProduct,
     } = require("../Controlers/productController");

router.route("/").post(upload.array("files"), addProduct).get(allProducts);
router.route("/getProduct/:id").get(singleProduct).patch(upload.array("files"), updateProduct).delete(deleteProduct);
router.route("/accept").get(getOrders);
router.route("/accept/:id").patch(acceptProduct);
router.route("/cancel/:id").patch(cancelProduct);

module.exports = router;