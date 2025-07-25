const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const generateToken = (userId) =>(
     jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1d"})
)


const registerUser = async (req,res)=>{
    try{
        const {name,email,password,profilePicUrl} = req.body;

        //if the user already exit
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"})
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        //create new user
        const user = await User.create({
            name,email,password:hashPassword,profilePicUrl
        })

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profilePicUrl:profilePicUrl,
            token:generateToken(user._id)
        })
    }catch(error){
        res.status(500).json({message:"Server error",error})
    }

}

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(500).json({message:"Invalid username or password"});

        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).json({message:"Invalid username or password"});
        }

        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profilePicUrl:user.profilePicUrl,
            token:generateToken(user._id)
        })

    }catch(err){
        res.status(500).json({message:"Server error",err})
    }
}

const getUserProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({message:"Server error",error})
    }
}

module.exports = {registerUser,loginUser,getUserProfile}