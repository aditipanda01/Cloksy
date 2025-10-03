const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');   // <-- check path carefully
const internshipsRoutes = require('./routes/internships');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
}); // 👈 this will confirm it's imported

app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipsRoutes);

app.get('/', (req, res) => res.send('Internship Reminder API'));

module.exports = app;
