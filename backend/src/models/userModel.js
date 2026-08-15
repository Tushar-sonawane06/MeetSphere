import mongoose,{Schema} from "mongoose";

const userSchema = new Schema(
    {
        name: {type:String, required:true},
        username: {type:String, required:true, unique:true},
        password: {type:String},
        googleId: {type:String, unique:true, sparse:true},
        token: {type:String}
    }
)

const user = mongoose.model("user", userSchema);

export {user};  