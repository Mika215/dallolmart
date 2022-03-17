require("dotenv").config();
const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const CLIENT_ID = process.env.GMAILER_CLIENT_ID;
const CLIENT_SEC = process.env.GMAILER_CLIENT_SEC;
const REDIRECT_URI = process.env.GMAILER_REDIRECT_URI;
const Gmail_Ref_Token = process.env.GMAILER_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SEC,
  REDIRECT_URI
);
oAuth2Client.setCredentials({refresh_token: Gmail_Ref_Token});

 const sendMail = async (mailOptions) => {
  try {
    const gaccessToken = await oAuth2Client.getAccessToken();
    //Transporter
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "mikacodes@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SEC,
        refreshToken: Gmail_Ref_Token,
        accessToken: gaccessToken,
      },
    });
//Mail Options
    const mailOptions = {
      from: "DallolMart || <mt@gmail.com>",
      to: "mikalsoyra@gmail.com",
      subject: "Mika Sending email from DM",
      text: "This message could have been sent after the DM server instantly restarted",
      html: `<h2>This message was sent from  Server(ESP)</h2>
    <p>More customised body message with HTML elements</p>
  

    <strong>Best Regards</strong>
    <p>Michael T<p>
    <strong>D</strong>
    `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};


//!i have disabled the below lines of code cause the emailing system is failed due to token issues with gmail apis
//TODO:try to fix the automatic email reffresh token or create a new one with different email
// sendMail()
//   .then((result) => console.log("Email sent...", result))
//   .catch((err) => console.log(error.message));

  module.exports=sendMail