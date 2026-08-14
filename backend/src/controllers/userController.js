import httpStatus from "http-status";
import {user} from "../models/userModel.js";
import {meeting} from "../models/meetingModel.js";
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

        if(!foundUser){
            return res.status(httpStatus.NOT_FOUND).json({message:"User not found"});
        }

        let isPasswordCorrect = await bcrypt.compare(password,foundUser.password)
        if(isPasswordCorrect){
            let token = crypto.randomBytes(20).toString("hex");
            foundUser.token = token;
            await foundUser.save();
            return res.status(httpStatus.OK).json({token:token});
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid Username or password"});
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
            return res.status(httpStatus.CONFLICT).json({message:"User already exists"}); 
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new user({
            name:name,
            username:username,
            password:hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({message:"User registered successfully"});
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: `Something went wrong: ${err.message || err}`});
    }
}

const getUserHistory = async (req,res)=>{
    const {token} = req.query;

    try{
        const foundUser = await user.findOne({token:token});
        if(!foundUser){
            return res.status(httpStatus.NOT_FOUND).json({message:"User not found"});
        }
        const meetings = await meeting.find({user_id:foundUser.username})
        res.json(meetings)
    }catch(err){
        res.json({message: `Something went wrong ${err}`});
    }
}

const addToHistory = async (req,res)=>{
    const {token,meeting_code} = req.body;

    try{
        const foundUser = await user.findOne({token:token});
        if(!foundUser){
            return res.status(httpStatus.NOT_FOUND).json({message:"User not found"});
        }
        const newMeeting = new meeting({
            user_id: foundUser.username,
            meetingCode: meeting_code
        })
        await newMeeting.save();

        res.status(httpStatus.CREATED).json({message:"Meeting added to history"});
    }catch(err){
        res.json({message: `Something went wrong ${err}`});
    }
}

export {login,register, addToHistory, getUserHistory};