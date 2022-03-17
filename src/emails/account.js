const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "yhurfadder@gmail.com",
    subject: "Thanks for joining us",
    text: `Welcome to the app ${name}. Let me know how you get along with the app`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "yhurfadder@gmail.com",
    subject: "Thanks for the opportunity, sad to see you go",
    text: `${name} si un día deseas regresar, usa este link: link`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
