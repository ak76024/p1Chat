import { NextResponse } from "next/server";
import connectDB from "@/db/connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
        let {check,password,confirmPassword} = await req.json();
        await connectDB();
        if(!check || !password || !confirmPassword){
            return NextResponse.json(
                { message: "Bad Request",changed: false },
                { status: 400 }
            );
        }

        if(password.length < 8){
            return NextResponse.json(
                { message: "Password must be at least 8 characters.",changed: false },
                { status: 400 }
            );
        }

        if(password !== confirmPassword){
            return NextResponse.json(
                { message: "Passwords do not match.",changed: false },
                { status: 400 }
            );
        }

        const user = await User.findOne({otpHash: check});
        if(!user){
            return NextResponse.json(
                { message: "Invalid password reset request.",changed: false },
                { status: 400 }
            );
        }
        if(user.otpExpiry < Date.now()){
            return NextResponse.json(
                { message: "Password reset request has expired.",changed: false },
                { status: 400 }
            );
        }
        const hashPass= await bcrypt.hash(password.trim(),10);
        let updatedUser = await User.findOneAndUpdate({otpHash: check},{$set:{password: hashPass,otpHash:"",otpExpiry:null}});
        if(updatedUser){
            return NextResponse.json(
                { message: "Password updated Successfully",changed: true },
                { status: 200 }
            );
        }else{
            return NextResponse.json(
                { message: "Something went wrong",changed: false },
                { status: 500 }
            );
        }
    }catch(error){
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error",changed: false },
            { status: 500 }
        );
    }
}