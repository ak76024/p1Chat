import connectDB from "@/db/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import crypto from "crypto";
export async function POST(req) {
    try {
        await connectDB();
        const { otpr, otpHash, reason } = await req.json();
        if (otpr.length !== 6) {
            return NextResponse.json(
                { message: "Bad Request", verified: false },
                { status: 400 }
            );
        }
        const user = await User.findOne({ otpHash: otpHash }).select("otp otpHash otpExpiry");
        if (!user) {
            return NextResponse.json(
                { message: "Invalid OTP Request..", verified: false },
                { status: 400 }
            );
        }
        if (user.otpExpiry < Date.now()) {
            return NextResponse.json(
                {
                    message: "OTP has expired",
                    verified: false,
                },
                { status: 400 }
            );
        }
        const isMatch = await bcrypt.compare(otpr, user.otp);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid OTP..", verified: false },
                { status: 400 }
            );
        }
        if(reason === "signup"){
            await User.findOneAndUpdate({ otpHash: otpHash }, { verified: true, otp: null, otpHash: null, otpExpiry: null });
            return NextResponse.json({ message: "OTP Verified", verified: true });
        }else if(reason === "forgotPass"){
            let resetToken = crypto.randomBytes(25).toString("hex");
            await User.findOneAndUpdate({ otpHash: otpHash }, { otp: null, otpHash: resetToken});
            return NextResponse.json({ message: "OTP Verified", verified: true, hash:resetToken });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", verified: false },
            { status: 500 }
        )
    }
}