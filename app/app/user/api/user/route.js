import { NextResponse } from "next/server";
import connectDB from "@/db/connect";
import User from "@/models/User";
import Friendship from "@/models/Friendship";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    await connectDB();
    let friend = false;
    let session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized", userfound: false },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const userName = searchParams.get("userName");

    if (!userName) {
      return NextResponse.json(
        { message: "Bad Request", userfound: false },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      userName: userName,
    }).select("_id name userName email profilePicture totalFriends gender bio location website");

    if (!user) {
      return NextResponse.json(
        { message: "User not found", userfound: false },
        { status: 404 }
      );
    }
    let friendship = await Friendship.findOne({
      $or: [
        { sender: user._id, receiver: session.user.id, status: "a" },
        { sender: session.user.id, receiver: user._id, status: "a" },
      ],
    });
    if (friendship) {
      friend = true;
    }
    const responseUser = {
      ...user.toObject(),
      friend,
    };

    return NextResponse.json({
      userfound: true,
      user: responseUser,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error", userfound: false },
      { status: 500 }
    );
  }
}