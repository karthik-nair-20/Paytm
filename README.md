# Paytm Clone

A full-stack Paytm-like digital payment platform built using the MERN stack, offering features such as user authentication, balance inquiry, and money transfer with robust input validation.

## 🚀 Features

- **User Authentication**: Sign up and sign in functionalities.
- **Account Management**: Check balance and perform money transfers.
- **Data Validation**: Robust input validation using Zod.
- **Secure Routes**: Protected routes with authentication.
- **Scalable**: Built with the MERN stack for scalability and performance.

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React
- **Language**: JavaScript
- **Styling**: TailwindCSS

### **Backend**
- **Framework**: Express.js
- **Database**: MongoDB
- **Validation**: Zod
- **Runtime**: Node.js


### **Frontend**
The frontend, built with React, provides an intuitive and responsive user interface for users to perform financial operations.

### **Backend**
The backend, powered by Express.js, handles user authentication, account management, and transaction operations. It uses MongoDB as the database and Zod for validating incoming data.

## 📡 API Endpoints

### **User Routes**
| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/signup`        | Register a new user      |
| POST   | `/signin`        | Authenticate a user      |

### **Account Routes**
| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| GET    | `/balance`       | Fetch account balance (auth)  |
| POST   | `/transfer`      | Transfer money (auth)         |

## 🖥️ Installation & Setup

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system.
- **MongoDB**: Set up a MongoDB database.

### **Steps to Run Locally**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/paytm-clone.git
   cd paytm-clone

---
