# Full-Stack Authentication Service

## Overview

This project is a full-stack authentication service built using Angular for the front end and Node.js for the back end. It provides a secure authentication mechanism for users to log in, access protected resources, and perform CRUD activities on data. The authentication process involves token-based authentication using JSON Web Tokens (JWT) to ensure secure communication between the client and the server.

## Features

- User registration: Users can login as Admin and create their personal accounts by providing their information.
- User authentication: Created users can log in using their email and password credentials.
- Token-based authentication: The authentication process generates JWTs, which are used to authenticate and authorize users for subsequent requests.
- Password hashing: User passwords are securely hashed using bcrypt before storing them in the database.
- Protected routes: Certain routes are protected and require authentication to access.

## Technologies Used

- **Frontend**: Angular, Tailwind, PrimeNg
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt

## Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- Node.js and npm
- Angular CLI
- MongoDB, Mongoose

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/emmanuelobi/auth-service.git

2. Navigate to the project directory:

   ```bash
   cd auth-service

3. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install


   ## Configuration

1. **Backend Configuration**:
   - Create a `.env` file in the backend directory.
   - Configure environment variables including database connection string, JWT secret, etc.

2. **Frontend Configuration**:
   - Modify environment files (`environment.ts` and `environment.prod.ts`) in the `src/environments` directory to set appropriate API endpoint URLs.

## Running the Application

1. **Start the Backend Server**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Start the server:
     ```bash
     npm start
     ```

2. **Start the Frontend Development Server**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Run the Angular development server:
     ```bash
     ng serve
     ```

3. Access the application in your web browser at `http://localhost:4200`.

## Usage

1. Login with Admin details, create a new user by providing your information.
2. Log in using your created user information.
3. Access protected resources or features available only to authenticated users.
