import { Schema, model,models } from "mongoose";

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
        enum: ["p", "a","r"],
        default: "p",
    },
});

export default models.Friendship || model("Friendship", FriendshipSchema);