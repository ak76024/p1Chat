import mongoose from 'mongoose';

const ConversationMemberSchema = new mongoose.Schema(
    {
        conversationId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        lastMsgReadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null
        },
        lastReadAt: {
            type: Date,
            default: null
        },
        muted:{
            type: Boolean,
            default: false
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)