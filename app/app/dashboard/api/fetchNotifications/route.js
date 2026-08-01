import { NextResponse } from "next/server";
import connectDB from "@/db/connect";
import Notification from "@/models/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Friendship from "@/models/Friendship";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        let notifications = await Notification.find({
            user: session.user.id
        }).populate("sender", "name userName profilePicture -_id").sort({ createdAt: -1 }).limit(20).lean();
        let friendshipIds = notifications.map(notification => notification.friendReqId);
        let friendships = await Friendship.find({
            _id: { $in: friendshipIds }
        }).lean();
        notifications = notifications.map((notification) => {
            const friendship = friendships.find(
                (friendship) =>
                    friendship._id.toString() === notification.friendReqId.toString()
            );
            return {
                ...notification,
                friendshipStatus: friendship?.status || null,
            };
        });
        return NextResponse.json({ notifications });
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}