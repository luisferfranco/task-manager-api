const sgMail = require("@sendgrid/mail");
const sendgridAPIKey =
  "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";

sgMail.setApiKey(sendgridAPIKey);

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
