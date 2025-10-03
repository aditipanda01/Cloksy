require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const startReminderCron = require('./cron/reminderCron');

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  startReminderCron();
})();
