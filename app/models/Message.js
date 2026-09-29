import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true
        },
        senderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        type: {
            type: String,
            enum: ["text", "image", "video", "file"],
            default: "text"
        },
        text: {
            type: String,
            trim: true,
            maxlength:5000
        },
    },
    {
        timestamps: true
    }
)