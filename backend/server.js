const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/fir-management', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
