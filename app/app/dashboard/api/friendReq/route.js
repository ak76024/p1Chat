import { NextResponse } from "next/server";
import connectDB from "@/db/connect";
import { getServerSession } from "next-auth";
import Friendship from "@/models/Friendship";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Notification from "@/models/Notification";
import User from "@/models/User";

export async function PUT(data) {
    try {
        let { fId,nId, action } = await data.json();
        if (!fId || !nId || !action) {
            return NextResponse.json({ message: "Bad Request",success: false }, { status: 400 });
        }
        let session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({ message: "Unauthorized",success: false }, { status: 401 });
        }
        await connectDB();
        let friendReq = await Friendship.findOne({
            _id: fId,
            receiver: session.user.id,
        });
        if (!friendReq) {
            return NextResponse.json({ message: "Friend Request Not Found",success: false }, { status: 404 });
        }
        await Notification.updateOne({ _id: nId }, { $set: { read: true } });
        if (action === "fReqAccept") {
            friendReq.status = "a";
            await friendReq.save();
            await Notification.updateOne({ _id: nId }, { $set: { read: true } });
            await User.updateOne({ _id: session.user.id }, { $inc: { totalFriends: 1 } });
            await User.updateOne({ _id: friendReq.sender }, { $inc: { totalFriends: 1 } });
            return NextResponse.json({ message: "Friend Request Accepted",success: true }, { status: 200 });
        } else if (action === "fReqDecline") {
            await Friendship.deleteOne({ _id: fId });
            await Notification.updateOne({ _id: nId }, { $set: { read: true } });
            return NextResponse.json({ message: "Friend Request Declined",success: true }, { status: 200 });
        }else{
            return NextResponse.json({ message: "Invalid Action",success: false }, { status: 400 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.error({ message: error.message,success: false });
    }
}