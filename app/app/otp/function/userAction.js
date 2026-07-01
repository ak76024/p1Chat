"use server";
import connectDB from "@/db/connect";
import User from "@/models/User";
export const verifyOtpPage= async (otph)=>{
    await connectDB();
    const user = await User.findOne({otpHash: otph});
    if(!user) {
        return false;
    }
    return true;
}