import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const emailVerificationMailgenContent = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro: [
        "Welcome to E-Pharmacy Management System!",
        "Thank you for creating your account.",
      ],
      action: {
        instructions:
          "Please verify your email address by clicking the button below:",
        button: {
          color: "#2563eb",
          text: "Verify Email",
          link: verificationURL,
        },
      },
      outro: [
        "This verification link will expire in 15 minutes.",
        "If you did not create this account, you can safely ignore this email.",
        "Thank you for choosing E-Pharmacy Management System.",
      ],
    },
  };
};

const forgotPasswordMailgenContent = (username, resetPasswordURL) => {
  return {
    body: {
      name: username,
      intro: [
        "We received a request to reset your E-Pharmacy account password.",
        "If you made this request, click the button below to create a new password.",
      ],
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#2563eb",
          text: "Reset Password",
          link: resetPasswordURL,
        },
      },
      outro: [
        [
          "This password reset link will expire in 15 minutes.",
          "If you did not request a password reset, you can safely ignore this email.",
          "For security reasons, please do not share this link with anyone.",
          "Thank you for using E-Pharmacy Management System.",
        ],
      ],
    },
  };
};

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "E-Pharmacy Management System",
      link: "https:e-pharmacy-management-system.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.epharmacy@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.log(
      "Email Service failed silently. Make sure that you have provided your MAILTRAP credentials in the .env file",
    );

    console.error("Error: ", error);
  }
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
