import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import Notification from "@/models/Notification";
import connectDB from "@/db/connect";

export async function sendEmail(email, subjectTxt, bodyTxt) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.appPass,
      },
    });

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: subjectTxt,
      html: bodyTxt,
    };

    await transporter.sendMail(mailOptions);

    return {
      emailSent: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      emailSent: false,
      message: "Email not sent",
    };
  }
}

function generateCode(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

export async function generateOtp() {
  let otp = Math.floor(100000 + Math.random() * 900000).toString();
  let otph = await bcrypt.hash(otp, 10);
  let otpHash = generateCode(25);
  return { otp, otph, otpHash };
}

export async function saveNotification(data) {
  const { user, type,friendReqId, sender} = data;
  try {
    await connectDB();
    if (type == "fr") {
      let notification = new Notification({
        user: user,
        sender: sender,
        friendReqId: friendReqId,
        type: type,
      });
      await notification.save();
      return { success: true, message: "Request Sent Successfully" }
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  } finally {
    const count = await Notification.countDocuments({ user });

    if (count > 10) {
      const extra = count - 10;

      const oldNotifications = await Notification.find({ user })
        .sort({ createdAt: 1 })
        .limit(extra)
        .select("_id");

      await Notification.deleteMany({
        _id: {
          $in: oldNotifications.map((n) => n._id),
        },
      });
    }
  }
}