import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        type:{
            type: String,
            enum: ["single", "group"],
            default: "single"
        },
        lastMessageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null
        },
        lastMessageAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.Conversation || mongoose.model("Conversation", ConversationSchema);