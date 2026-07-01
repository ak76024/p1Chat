import connectDB from "@/db/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
export async function POST(req) {
    try {
        await connectDB();
        const { otpr, otpHash } = await req.json();
        console.log(otpr, otpHash);
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
        await User.findOneAndUpdate({ otpHash: otpHash }, { verified: true, otp: null, otpHash: null });
        return NextResponse.json({ message: "OTP Verified", verified: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", verified: false },
            { status: 500 }
        )
    }
}