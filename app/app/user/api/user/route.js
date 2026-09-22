import { NextResponse } from "next/server";
import connectDB from "@/db/connect";
import User from "@/models/User";
import Friendship from "@/models/Friendship";
import Notification from "@/models/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    await connectDB();
    let friend = {status: false, friendReqId: null, notificationId: null};
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

    let self = false;
    if (userName === session.user.userName) {
      self = true;
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
        { sender: user._id, receiver: session.user.id},
        { sender: session.user.id, receiver: user._id},
      ],
    });
    if (friendship && friendship.status === "a") {
      friend = {status: "a", friendReqId: friendship._id, notificationId: null};
    }else if(friendship && friendship.status === "p"){
      let notification = await Notification.findOne({
        sender: user._id,
        user: session.user.id,
        type: "fr",
      });
      friend = {status: "pending",sender: friendship.sender,receiver: friendship.receiver, friendReqId: friendship._id, notificationId: notification?._id};
    }
    const responseUser = {
      ...user.toObject(),
      friend,
      self,
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