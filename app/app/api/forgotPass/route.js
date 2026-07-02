import { NextResponse } from "next/server";
import connectDB from "@/db/connect";
import User from "@/models/User";
import { sendEmail, generateOtp } from "@/app/action/userAction";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const userEmail = email?.trim().toLowerCase();

    if (!userEmail) {
      return NextResponse.json(
        {
          message: "Email is required",
          sendOtp: false,
        },
        {
          status: 400,
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        {
          message: "Invalid email address",
          sendOtp: false,
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    // Check user exists
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          sendOtp: false,
        },
        {
          status: 404,
        }
      );
    }

    // Generate OTP
    const { otp, otph, otpHash } = await generateOtp();

    const emailSubject = "OTP Verification for Password Reset";
    const emailBody =`
      <p>Hi ${user.name},</p>
      <p>Use the following OTP to reset your password:</p>
      <h2>${otp}</h2>
      <p>This OTP is valid for 3 minutes.</p>
      <p>Thank you for using our service.</p>`
    // Send email first
    const emailResult = await sendEmail(userEmail, emailSubject,emailBody);

    if (!emailResult.emailSent) {
      return NextResponse.json(
        {
          message: "Failed to send OTP",
          sendOtp: false,
        },
        {
          status: 500,
        }
      );
    }

    await User.findByIdAndUpdate(user._id, {
      otp: otph,
      otpHash,
      otpExpiry: new Date(Date.now() + 3 * 60 * 1000), 
    });

    return NextResponse.json(
      {
        message: "OTP sent successfully",
        sendOtp: true,
        otpHash,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Send OTP Error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        sendOtp: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {
  try{
    const { otpHash } = await req.json();
    await connectDB();
    const user = await User.findOne({ otpHash: otpHash });
    if(!user){
      return NextResponse.json({error: "Invalid OTP Request",sendOtp: false}, {status: 400})
    }
    let {otp,otph} = await generateOtp();
    const emailSubject = "OTP Verification for Password Reset";
    const emailBody =`
      <p>Hi ${user.name},</p>
      <p>Use the following OTP to reset your password:</p>
      <h2>${otp}</h2>
      <p>This OTP is valid for 3 minutes.</p>
      <p>Thank you for using our service.</p>`
    await sendEmail(user.email, emailSubject,emailBody);
    await User.findOneAndUpdate({otpHash: otpHash},{otp: otph,otpExpiry: new Date(Date.now() + 3 * 60 * 1000),});
    return NextResponse.json({sendOtp: true}, {status: 200})
  }catch(error){
    console.log(error)
    return NextResponse.json({error: error.message,sendOtp: false}, {status: 500})
  }
}