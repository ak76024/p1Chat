import {Schema, model, models} from "mongoose";

const NotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        enum: ["fr","fa","msg","grpinvite","info"],
        required: true,
    },
    friendReqId:{
        type: Schema.Types.ObjectId,
        ref: "Friendship"
    },
    msg: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default models.Notification || model("Notification", NotificationSchema);