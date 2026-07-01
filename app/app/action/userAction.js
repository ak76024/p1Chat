import nodemailer from "nodemailer";

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
      text: bodyTxt,
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