const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: "YOUR_GMAIL@gmail.com",
    pass: "joah cgan jxhq kqdt",
  },

});

const sendEmail = async (to, subject, text) => {

  try {

    await transporter.sendMail({
      from: "YOUR_GMAIL@gmail.com",
      to,
      subject,
      text,
    });

    console.log("Email Sent");

  } catch (error) {

    console.log(error);

  }
};

module.exports = sendEmail;