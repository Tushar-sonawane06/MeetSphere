import {createContext} from "react";
import axios from "axios";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {HttpStatusCode} from "axios";
import router from "../../../backend/src/routes/userRoutes";

export const AuthContext = React.createContext({});

const client = axios.create({
    baseURL : "localhost:8000/api/v1/users"
})

export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);

    const router = useNavigate();

    const handleRegister = async(name,username,password)=>{
        try{
            let request = await client.post("/register", {
                name:name,
                username:username,
                password:password
            })
            if(request.status === HttpStatusCode.CREATED){
                return request.data.message;
            }
        }catch(err){
            throw err;
        }
    }

    const handleLogin = async(username,password)=>{
        try{
            let request = await client.post("/login", {
                username:username,
                password:password
            })
            if(request.status === HttpStatusCode.OK){
                localStorage.setItem("token", request.data.token);

            }
        }catch(err){
            throw err;
        }
    }

    const data = {
        userData, setUserData, handleRegister
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
};