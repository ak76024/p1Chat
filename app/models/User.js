import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    bio: {
        type: String,
    },
    gender: {
        type: String,
    },
    location: {
        type: String
    },
    otp: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    otpHash:{
        type: String
    },
    otpExpiry: {
        type: Date,
    },
    website: {
        type: String
    },
    profilePicture: {
        type: String
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    friends: {
        type: Array,
        default: []
    },
    totalFollowers: {
        type: Number,
        default: 0
    },
    totalFollowing: {
        type: Number,
        default: 0
    },
    totalFriends: {
        type: Number,
        default: 0
    },
    time: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.models.User || model("User", UserSchema);