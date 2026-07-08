import { NextResponse } from "next/server";
import connectDB from "@/db/connect";
import Friendship from "@/models/Friendship";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }
        await connectDB();
        const sender = session.user.id;
        const { receiver } = await req.json();
        if (sender === receiver) {
            return NextResponse.json({ message: "You cannot add yourself as a friend", success: false }, { status: 400 });
        }
        const friendship = await Friendship.findOne({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender },
            ],
        });
        if (friendship) {
            if (friendship.status === "a") {
                return NextResponse.json({ message: "Friend already exists", success: false }, { status: 400 });
            } else if (friendship.status === "p") {
                return NextResponse.json({ message: "Friend request already sent", success: false }, { status: 400 });
            } else {
                friendship.sender = sender;
                friendship.receiver = receiver;
                friendship.status = "p";
                await friendship.save();
                return NextResponse.json({
                    message: "Friend request sent successfully",
                    success: true,
                    friendship,
                })
            }
        } else {
            const newFriendship = new Friendship({
                sender,
                receiver
            });
            await newFriendship.save();
            return NextResponse.json({
                message: "Friend request sent successfully",
                success: true,
                friendship: newFriendship,
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 })
    }
}