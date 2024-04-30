import mongoose from "mongoose";
const userschema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },
    isConfirmed: {
        type: Boolean,
        default: false


    },

},
    {
        timestamps: true
    })
const User = mongoose.model('User', userschema)

export default User