# 📬 Notification Service

A simple Notification Service built using **Node.js**, **Express**, **MongoDB**, **BullMQ**, and **Redis**. It allows sending notifications via Email, SMS, or In-App to users asynchronously using a queue system.

---

## 🚀 Features

- 📧 Email, 📱 SMS, and 🖥️ In-App notifications
- 📦 Asynchronous job queue using BullMQ + Redis
- 🗃️ MongoDB stores all notifications
- 🔁 Retry logic for failed jobs
- 🧪 Simple dummy delivery system for Email, SMS, and In-App

---

## 📦 Technologies Used

- **Node.js**
- **Express**
- **MongoDB (Mongoose)**
- **Redis**
- **BullMQ**
- **Dotenv**

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ParineetaBehera/notification-service.git
cd notification-service
