import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true, 
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
        minLength: 5,
        maxLength: 255,
    },  
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 6,
        maxLength: 1024,
    },
}, {timestamps: true});

export default mongoose.model('User', userSchema);