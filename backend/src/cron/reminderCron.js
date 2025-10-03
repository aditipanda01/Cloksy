const cron = require('node-cron');
const Internship = require('../models/Internship');
const User = require('../models/User');
const { sendSms } = require('../utils/twilio');

// Runs every day at 08:00 server time
function startReminderCron() {
  cron.schedule('0 8 * * *', async () => {
    console.log('Running daily reminder cron');
    try {
      const today = new Date();
      today.setHours(0,0,0,0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Find internships with reminderDate == today
      const items = await Internship.find({ reminderDate: { $gte: today, $lt: tomorrow } }).populate('user');
      
      console.log(`Found ${items.length} internships with reminders today`);
      
      for (const item of items) {
        const user = item.user;
        // SMS sending is disabled for now
        console.log(`Reminder for user ${user.email}: ${item.title} - Deadline: ${item.deadline ? new Date(item.deadline).toDateString() : 'N/A'}`);
        
        /* Original SMS code - commented out:
        const to = process.env.ADMIN_SMS_TO || user.phone || null;
        const body = `Reminder: ${item.title} deadline ${item.deadline ? new Date(item.deadline).toDateString() : 'N/A'} - ${item.link || ''}`;
        if (to) await sendSms(to, body);
        */
      }

    } catch (err) {
      console.error('Cron error', err);
    }
  });
  
  console.log('Reminder cron scheduled (SMS disabled - check console for logs)');
}

module.exports = startReminderCron;