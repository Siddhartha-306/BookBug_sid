const { user } = require("../models/user");

const signup = async (req, res) => {
    console.log(req);
    try{
        const {username, email, password, address} = req.body;


        //check if username is already existed or not
        const User = await user.findOne({ username });
        if(User)
        {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        //check if email is already existed or not
        const Email = await user.findOne({ email });
        if(Email)
        {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        //check password length, if pass length is less than 6 than error
        if(password.length < 6)
        {
            return res.status(400).json({
                message: "Enter a password with at least 6 characters"
            });
        }


        //if all the checks are passed then create a new entry for the user
        const newUser = new user({
            username,
            email,
            password,
            address,
        });

        await newUser.save();
        
        return res.status(200).json({
            message: "User signed up successfully"
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {signup};