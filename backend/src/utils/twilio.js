// const Twilio = require('twilio');
// const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSms(to, body) {
  // Twilio SMS functionality commented out for now
  console.log('SMS sending is disabled. Would have sent:', { to, body });
  return Promise.resolve();
  
  /* Original Twilio code:
  if (!process.env.TWILIO_ACCOUNT_SID) {
    console.log('Twilio not configured; skipping SMS:', body);
    return;
  }
  return client.messages.create({ from: process.env.TWILIO_FROM_PHONE, to, body });
  */
}

module.exports = { sendSms };