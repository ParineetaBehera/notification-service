📬 Notification Service

A simple and scalable Notification Service built using Node.js, Express, MongoDB, Redis, and BullMQ. It supports asynchronous delivery of notifications (📧 Email, 📱 SMS, 🖥️ In-App) to users through a job queue system.

🚀 Features

📧 Send Email, 📱 SMS, and 🖥️ In-App notifications

⏳ Asynchronous processing using BullMQ and Redis queues

🗃️ MongoDB stores notification history

🔁 Built-in retry logic for failed jobs

🧪 Dummy delivery implementation for Email, SMS, and In-App (console logs)

⚙️ Technologies Used

Node.js

Express.js

MongoDB + Mongoose

Redis

BullMQ

Dotenv

🔧 Setup Instructions

1. Clone the Repository
git clone https://github.com/ParineetaBehera/notification-service.git
cd notification-service

2. Install Dependencies
npm install

3. Set Up .env File
Create a .env file in the root directory with the following content:

PORT=5000
MONGO_URI=mongodb://localhost:27017/notificationService
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

EMAIL_USER=parineeta316@gmail.com
EMAIL_PASS=rbzsbxwpnmkzxgjj

4. Start MongoDB and Redis Locally
Make sure MongoDB and Redis are running on your local machine.

5. Run the App
Start the main Express server:

npm start

Start the background worker (in a separate terminal):

node workers/notificationWorker.js

📬 Sample API Requests

POST /notifications
Send a notification to a user

json

{
  "userId": "receiver@example.com",
  "type": "email", // "email", "sms", or "in-app"
  "message": "🎉 Your order has been confirmed!"
}
✅ Response:

json

{
  "success": true,
  "message": "Notification job queued successfully"
}
GET /notifications/user/:id
Get all notifications for a user

Example:


GET /notifications/user/receiver@example.com
✅ Response:

json
Copy code
{
  "success": true,
  "data": [
    {
      "_id": "647e112...",
      "userId": "receiver@example.com",
      "type": "email",
      "message": "🎉 Your order has been confirmed!",
      "timestamp": "2025-05-18T10:00:00.000Z"
    }
  ]
}
📝 Assumptions
Notifications are processed asynchronously for scalability.

Email, SMS, and In-App notifications are simulated using console logs.

MongoDB stores all notification history.

BullMQ (instead of RabbitMQ/Kafka) is used for queue processing.

✅ Deliverables Checklist
 POST /notifications endpoint

 GET /notifications/user/:id endpoint

 Queue processing with BullMQ and Redis

 Dummy delivery for Email, SMS, and In-App

 Retry logic for failed jobs

 README with setup and assumptions

 Code pushed to GitHub: notification-service