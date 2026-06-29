import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/db/connect";
import User from "@/models/User";

export async function GET(req) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized", searchUser: false },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);

        const username = searchParams.get("search");

        const user = await User.find({
            userName: { $regex: username, $options: "i" },
        }).limit(5).lean().select("profilePicture userName name -_id");

        if (user.length === 0) {
            return NextResponse.json(
                { message: "User not found", searchUser: false },
                { status: 404 }
            );
        }

        return NextResponse.json({ searchUser: true, user });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}