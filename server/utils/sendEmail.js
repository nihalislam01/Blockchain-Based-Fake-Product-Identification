const nodeMailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const html = await ejs.renderFile(path.join(__dirname, '../templates/verifyEmail.ejs'), {  name: options.name, url: options.url });

  const mailOptions = {
    from: `"Office of Co-curricular Activities - Brac University" <${process.env.SMPT_MAIL}>`,
    to: options.email,
    subject: options.subject,
    html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;