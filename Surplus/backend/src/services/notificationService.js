import nodemailer from "nodemailer";
import Notification from "../models/Notification.js";

const createTransporter = () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER
  ) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port:
      Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendNotification = async ({
  recipient,
  title,
  message,
  type = "system",
  relatedDonation,
}) => {
  const notification =
    await Notification.create({
      recipient,
      title,
      message,
      type,
      relatedDonation,
    });

  const transporter =
    createTransporter();

  if (transporter) {
    try {
      await transporter.sendMail({
        from:
          process.env.SMTP_FROM ||
          process.env.SMTP_USER,
        to: recipient.email,
        subject: title,
        text: message,
      });
    } catch (error) {
      console.error(
        "Email notification failed:",
        error.message
      );
    }
  }

  return notification;
};
