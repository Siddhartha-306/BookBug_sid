const express = require("express");
const router = express.Router();
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");
// const { signup } = require("../controller/user.js");


//signup api 
router.post("/signUp",  async (req, res) => {
    // console.log(req);
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

        //hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        // //check if password already exists
        // const Pass = bcrypt.compare(password, hashedPass);

        // if(Pass)
        // {
        //     return res.status(400).json({
        //         message: "Password already exists"
        //     });
        // }

        //if all the checks are passed then create a new entry for the user
        const newUser = new user({
            username: username,
            email: email,
            password: hashedPass,
            address: address,
        });

        await newUser.save();
        
        return res.status(200).json({
            message: "Signed up successfully"
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});



//signin api
router.post("/signIn", async (req, res) => {
    try{
        const {username, password} = req.body;

        //check if username and password are entered
        if(!username || !password)
        {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //if all the fields are present then find if the user with that username is existed or not
        const User = await user.findOne({username});

        if(!User)
        {
            return res.status(400).json({
                message: "User not found",
            });
        }

        //if the user is present then check if the password entered is true or not
        const pass = await bcrypt.compare(password, User.password);

        if(!pass)
        {
            return res.status(400).json({
                message: "Password does not match",
            });
        }
        else{

            //if password also matches then make the user logged in
            const authClaims = [
                { name: User.username },
                { role: User.role },
            ];
            const token = jwt.sign({ authClaims }, "bookStore123", { expiresIn: "30d",});

            res.status(200).json({
                id: User._id,
                role: User.role,
                token: token,
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});



//get user information bu authenticating its token
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const data = await user.findById(id).select('-password');
        return res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error",
        });
    }
});



//update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const { address } = req.body;
        await user.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({
            message: "Address updated successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// module.exports = {
//     signup: router,
//     signin: router,
// };

module.exports = router;