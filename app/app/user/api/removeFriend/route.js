import { NextResponse } from "next/server";
import connectDB from "@/db/connect";
import Friendship from "@/models/Friendship";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";

export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);
        const { sender, receiver } = await req.json();
        console.log(sender, receiver, session);
        if (!sender || !receiver) {
            return NextResponse.json({message: "Missing sender or receiver",success: false,},{ status: 400 });
        }
        if (!session || session.user.id.toString() !== sender) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }
        await connectDB();
        const friendship = await Friendship.findOneAndDelete({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender },
            ],
        });
        if (!friendship) {
            return NextResponse.json({ message: "Friendship not found", success: false }, { status: 404 });
        }
        await Promise.all([
            User.findByIdAndUpdate(_id = sender, {
                $inc: { totalFriends: -1 },
            }),
            User.findByIdAndUpdate(_id = receiver, {
                $inc: { totalFriends: -1 },
            }),
        ]);
        return NextResponse.json({
            message: "Friend removed successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}