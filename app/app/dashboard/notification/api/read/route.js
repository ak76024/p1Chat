import { NextResponse } from "next/server";
import connectDB from "@/db/connect";
import Notification from "@/models/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const PUT = async (req) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }
        await connectDB();
        const body = await req.json();
        const { readone } = body;
        if (readone) {
            const { id } = body;
            await Notification.updateOne({ _id: id }, { $set: { read: true } });
            return NextResponse.json({ message: "Notification read", success: true }, { status: 200 });
        } else {
            const { ids } = body;
            await Notification.updateMany({ _id: { $in: ids } }, { $set: { read: true } });
            return NextResponse.json({ message: "Notifications read", success: true }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
};