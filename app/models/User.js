import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
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
    time: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.models.User || model("User", UserSchema);