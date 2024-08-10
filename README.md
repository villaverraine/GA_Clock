Certainly! Here's a README file based on the instructions provided:

---

# Clock0 Application

## Overview
This project is a full-stack application for logging time in and time out, featuring both a server-side API and a client-side React app. Follow the instructions below to set up the project on your local machine.

## Prerequisites
- Ensure that you have [Node.js](https://nodejs.org/) installed on your machine.

## Setup Instructions

### 1. Setting Up the Server

1. **Open Two Terminal Windows**:
   - Open two terminal windows or tabs. One will be used for running the server, and the other for running the React app.

2. **Navigate to the Server Directory**:
   - In the first terminal, navigate to the server directory:
     ```
     cd server
     ```

3. **Install Server Dependencies**:
   - Inside the server directory, install the required dependencies:
     ```
     npm install
     ```

4. **Create the .env File**:
   - Before starting the server, create a `.env` file inside the `server` folder with the following content:
     ```
     PORT=3001
     MONGO_URI=mongodb+srv://villaverraine0:a2snR75Lela5id1a@clock0.bfzdqhg.mongodb.net/?retryWrites=true&w=majority&appName=Clock0
     SECRET_KEY=klasjdh123aklsdjfh934itu123dkfj1lqwkej1ßß
     ```

5. **Start the Server**:
   - Once the `.env` file is in place, start the server by running:
     ```
     node index.js
     ```
   - The server will now be running on the port specified in the `.env` file.

### 2. Setting Up the React Application

1. **Navigate to the Main Directory**:
   - In the second terminal, navigate back to the main project directory:
2. **Install React App Dependencies**:
   - Before starting the React application, install the necessary dependencies:
     ```
     npm install
     ```

3. **Start the React Application**:
   - Once the dependencies are installed, start the React app:
     ```
     npm start
     ```
   - The application should now be running, and you can access it in your browser at `http://localhost:3000`.

## Admin Credentials
To log in as an admin, use the following credentials:
- **Username**: `admin`
- **Password**: `1234`

## Summary
- **Two Terminals**: Use one terminal for the server and another for the React app.
- **Server Setup**: Navigate to the `server` directory, install dependencies, create the `.env` file, and start the server.
- **React App Setup**: Navigate to the main directory, install dependencies, and start the app.

By following these steps, you should have both the server and the React application running concurrently.

---

This README file provides clear and concise instructions for setting up and running the project. Feel free to adjust any details according to your project's specific needs.