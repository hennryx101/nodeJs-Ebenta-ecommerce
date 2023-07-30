const Products = require("../Models/Products");

const rateItem = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
  
    const rate = parseInt(rating);
  
    console.log(rate, id, "---id---");
  
    try {
      // Find the product by ID
      const product = await Products.findOne({_id: id});
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Update the ratingsnumber array with the new rating
      product.ratingsnumber.push(rate);
  
      // Calculate the average rating (using the function from the model)
      const averageRating = calculateAverageRating(product.ratingsnumber);
  
      // Update the product document with the new ratingsnumber and average rating
      product.ratingsnumber = product.ratingsnumber;
      product.ratings = averageRating;
      const result = await product.save();
  
      console.log(result, "result");
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
function calculateAverageRating(ratings) {
    const totalRatings = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRatings / (ratings.length || 1); 
    return averageRating.toFixed(0);
}

  module.exports = {
    rateItem,
  };
  