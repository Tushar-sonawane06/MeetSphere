import httpStatus from "http-status";
import {user} from "../models/userModel.js";
import {meeting} from "../models/meetingModel.js";
import bcrypt, {hash}  from "bcrypt";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

const googleLogin = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Google credential is required" });
    }

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub, email, name } = payload;

        if (!email) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: "Google account does not provide an email" });
        }

        let foundUser = await user.findOne({ $or: [{ googleId: sub }, { username: email }] });

        if (!foundUser) {
            foundUser = new user({
                name: name || email.split('@')[0],
                username: email,
                googleId: sub
            });
        } else if (!foundUser.googleId) {
            foundUser.googleId = sub;
        }

        let token = crypto.randomBytes(20).toString("hex");
        foundUser.token = token;
        await foundUser.save();

        return res.status(httpStatus.OK).json({ token: token, username: foundUser.username });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${err.message || err}` });
    }
}

export {login, register, addToHistory, getUserHistory, googleLogin};