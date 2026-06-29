import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connect";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized",userfound: false },
        { status: 401 }
      );
    }

    const {searchParams} = new URL(req.url);
    const userName = searchParams.get("userName");

    if (!userName) {
      return NextResponse.json(
        { message: "Bad Request", userfound: false },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      userName: userName,
    }).select("-password -followers -friends -following -time -_id");

    if(!user) {
      return NextResponse.json(
        { message: "User not found", userfound: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ userfound: true, user});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error", userfound: false },
      { status: 500 }
    );
  }
}