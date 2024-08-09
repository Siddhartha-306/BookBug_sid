const router = require("express").Router();
const user = require("../models/user");
const { authenticateToken } = require("./userAuth");
const Order = require("../models/order");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const { order } = req.body;
        for(const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            //saving order in user model
            await user.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id }
            });

            //clearing cart
            await user.findByIdAndUpdate(id, { $pull: { cart: orderData._id }});
        }
        return res.json({
            status: "Success",
            message: "Order placed successfully"
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});



//get order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const userData = await user.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });
    
        const ordersData = userData.orders.reverse();
    
        return res.json({
            status: "Success",
            data: ordersData,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});



//get all orders -> admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try{
        const userData = await Order.find().populate({
            path: "book",
        }).populate({
            path: "user",
        }).sort({ createdAt: -1 });

        return res.json({
            status: "Success",
            data: userData,
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});



//update order status -> admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try{
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({
            status: "Success",
            message: "Status updated successfully"
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


module.exports = router;