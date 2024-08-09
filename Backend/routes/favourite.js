const router = require("express").Router();
const user = require("../models/user");
const { authenticateToken } = require("./userAuth");


//add book to favourite
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try{
        const { bookid, id } = req.headers;
        const userData = await user.findById(id);
        const isFavourite = userData.favourites.includes(bookid);
        if(isFavourite)
        {
            return res.status(200).json({
                message: "Book is already added to favourites"
            });
        }

        await user.findByIdAndUpdate(id, { $push: { favourites: bookid }});

        return res.status(200).json({
            message: "Book added to favourites"
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});



//remove book from favourite
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try{
        const { bookid, id } = req.headers;
        const userData = await user.findById(id);
        const isFavourite = userData.favourites.includes(bookid);
        if(isFavourite)
        {
            await user.findByIdAndUpdate(id, { $pull: { favourites: bookid }});
        }

        return res.status(200).json({
            message: "Book removed from favourites"
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});



//get all the favourite books
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const userData = await user.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;

        return res.json({
            status: "Success",
            data: favouriteBooks,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


module.exports = router;