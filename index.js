require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./data/db');

const app = express();
const notificationRoutes = require('./routes/notifications');

app.use(bodyParser.json());

// Base path
app.use('/notifications', notificationRoutes); // POST /notifications, GET /notifications/user/:id

// Connect MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

const setupSwagger = require('./swagger');
setupSwagger(app);

