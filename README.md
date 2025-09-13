# Project Chat

A real-time chat application built with React, Node.js, Express, Socket.io, and MongoDB.

## Features

- Real-time messaging
- User authentication (login/signup)
- Friend requests system
- Online user status
- Responsive design

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd PROJECT_CHAT
   npm install
   ```

2. **Setup development environment:**
   ```bash
   npm run setup-dev
   ```

3. **Configure environment variables:**
   Edit the `.env` file created in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:5000
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend development server (port 5000).

### Manual Setup

If you prefer to set up manually:

1. **Backend:**
   ```bash
   npm run server
   ```

2. **Frontend (in another terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

## Environment Configuration

The application automatically detects the environment:

- **Development**: Uses `http://localhost:5000` for both API and Socket.io
- **Production**: Uses the production URL from environment variables

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/users` - Get all users
- `GET /api/messages/:conversationId` - Get messages
- `POST /api/messages/send/:conversationId` - Send message
- `GET /api/friends/:userId/friends` - Get user's friends
- `GET /api/friends/requests/:userId` - Get friend requests

## Socket.io Events

- `getOnlineUsers` - List of online users
- `newMessage` - New message received
- `friendRequestReceived` - Friend request received
- `friendRequestResponse` - Friend request response

## Production Deployment

1. Set environment variables:
   ```env
   NODE_ENV=production
   PORT=5000
   CLIENT_URL=https://your-frontend-domain.com
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_secure_jwt_secret
   ```

2. Build and start:
   ```bash
   npm run build
   npm start
   ```

## Troubleshooting

### CORS Issues
- Ensure `CLIENT_URL` matches your frontend URL
- Check that both development and production URLs are included in CORS configuration

### Socket.io Connection Issues
- Verify the socket URL in the frontend configuration
- Check that the backend socket.io CORS settings allow your frontend origin

### Database Connection Issues
- Verify your MongoDB connection string
- Ensure MongoDB is running and accessible

## Project Structure

```
PROJECT_CHAT/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── db/             # Database connection
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routs/          # API routes
│   ├── socket/         # Socket.io configuration
│   └── utils/          # Utility functions
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # React contexts
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Page components
│   │   └── config/     # Configuration files
│   └── dist/           # Built frontend files
└── package.json
```
