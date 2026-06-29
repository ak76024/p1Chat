import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/db/connect";
import User from "@/models/User";
import ProfilePage from "@/app/user/[userName]/page";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await User.findOne({
      _id: session.user.id,
    }).select("-password -followers -following -time -_id");

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          updateData: false
        },
        { status: 401 }
      );
    }

    const data = await req.json();
    const user = await User.findOne({
      _id: session.user.id,
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          updateData: false
        },
        { status: 404 }
      );
    }

    // check email and username already exits
    const emailExists = await User.findOne({ email: data.email });
    const userNameExists = await User.findOne({ userName: data.userName });
    if (emailExists && emailExists._id.toString() !== user._id.toString()) {
      return NextResponse.json(
        {
          message: "Email already exists",
          updateData: false
        },
        { status: 400 }
      );
    }
    if (userNameExists && userNameExists._id.toString() !== user._id.toString()) {
      return NextResponse.json(
        {
          message: "Username already exists",
          updateData: false
        },
        { status: 400 }
      );
    }

    const { name, userName, email,profilePicture, bio, gender, location, website } = data;

    await User.findOneAndUpdate(
      { _id: session.user.id },
      { $set: { name, userName, email,profilePicture, bio, gender, location, website } },
      {
        new: true,
        select: "-password -followers -following -time -_id"
      }
    );

    return NextResponse.json({ updateData: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        updateData: false
      },
      { status: 500 }
    );
  }
}