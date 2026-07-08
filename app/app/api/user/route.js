import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/db/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendEmail, generateOtp } from "@/app/action/userAction";

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

    if (!data) {
      return NextResponse.json(
        {
          message: "Bad Request",
          updateData: false
        },
        { status: 400 }
      );
    }
    let {name,userName,profilePicture,bio,gender,location,website,} = data;

    name = name?.trim();
    userName = userName?.trim();
    profilePicture = profilePicture?.trim();
    bio = bio?.trim();
    gender = gender?.trim();
    location = location?.trim();
    website = website?.trim();

    // check username already exits
    const userNameExists = await User.findOne({ userName: userName });
    if (userNameExists && userNameExists._id.toString() !== user._id.toString()) {
      return NextResponse.json(
        {
          message: "Username already exists",
          updateData: false
        },
        { status: 400 }
      );
    }

    if(bio && bio.length > 100){
      return NextResponse.json(
        {
          message: "Bio must be less than 100 characters",
          updateData: false
        },
        { status: 400 }
      );
    }

    await User.findOneAndUpdate(
      { _id: session.user.id },
      { $set: { name, userName, profilePicture, bio, gender, location, website } },
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

export async function POST(req) {
  try {
    await connectDB();

    let data = await req.json();

    if (!data.email || !data.userName || !data.password || !data.confirmPassword || !data.name) {
      return NextResponse.json(
        { message: "Bad Request", signup: false },
        { status: 400 }
      );
    }

    if (data.password !== data.confirmPassword) {
      return NextResponse.json(
        { message: "Password doesn't match", signup: false },
        { status: 400 }
      );
    }
    // if (data.password.length < 8) {
    //   return NextResponse.json(
    //     {
    //       signup: false,
    //       message: "Password must be at least 8 characters.",
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }

    const existingUser = await User.findOne({
      $or: [
        { email: data.email },
        { userName: data.userName },
      ],
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        return NextResponse.json(
          { message: "Email already exists", signup: false },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: "Username already exists", signup: false },
        { status: 400 }
      );
    }

    let { otp, otph, otpHash } = await generateOtp();

    const hashPass = await bcrypt.hash(data.password.trim(), 10);

    let newUser = await User.create({
      name: data.name.trim(),
      userName: data.userName.trim(),
      email: data.email.trim(),
      password: hashPass,
      otp: otph,
      otpHash: otpHash,
      otpExpiry: Date.now() + 3 * 60 * 1000,
    });

    const emailSubject = "Verify your email";
    const emailBody = `
      <p>Hi ${data.name},</p>
      <p>Thank you for signing up. To complete your registration, please verify your email address by entering the following verification code:</p>
      <p><b>${otp}</b></p>
      <p>Please note that this code will expire in 3 minutes.</p>
      <p>Thanks again for joining us!</p>`;

    if (newUser) {
      let emailSent = await sendEmail(data.email.trim(), emailSubject, emailBody);
      if (!emailSent.emailSent) {
        return NextResponse.json({ message: "Email not sent", signup: false });
      }
      return NextResponse.json({ signup: true, otpHash });
    } else {
      return NextResponse.json(
        { message: "Internal Server Error", signup: false },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", signup: false },
      { status: 500 }
    );
  }
}