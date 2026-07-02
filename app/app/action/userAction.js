import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

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