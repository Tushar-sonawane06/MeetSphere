import httpStatus from "http-status";
import {user} from "../models/userModel.js";
import bcrypt, {hash}  from "bcrypt";
import crypto from "crypto";

// login
const login = async (req,res)=>{
    const {username, password} = req.body;
    
    if(!username || !password){
        return res.status(httpStatus.BAD_REQUEST).json({message:"Please provide username and password"});
    }

    try{
        const foundUser = await user.findOne({username});

        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"User not found"});
        }

        if(bcrypt.compare(password,foundUser.password)){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await foundUser.save();
            return res.status(httpStatus.OK).json({token:token});

        }
        
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message:`Something went wrong ${err}`});
    }
}


// register
const register = async (req,res)=>{
    const {name,username,password} = req.body;

    try{
        const existingUser = await user.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).JSON({MESSAGE:"User already exists"}); 
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new user({
            name:name,
            username:username,
            password:hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({messade:"User registered successfully"});
    }catch(err){
        return res.json({message: `User already exists`});
    }
}

export {login,register};