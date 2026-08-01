import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connect";
import Notification from "@/models/Notification";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        await connectDB();
        const notifications = await Notification.countDocuments({
            user: session.user.id,
            read: false,
        });
        return NextResponse.json({ notifications });
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}