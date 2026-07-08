import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const FriendshipSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["p", "a"],
        default: "p",
    },
});

const Friendship = model("Friendship", FriendshipSchema);

export default mongoose.models.Friendship || Friendship;