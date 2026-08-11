# MeetSphere

MeetSphere is a video conferencing web app inspired by Zoom, built with a React frontend and a Node.js/Express backend using Socket.io for real-time signaling and communication.

## Features

- Create and join video meeting rooms
- Real-time audio/video calling
- Real-time signaling via Socket.io
- Chat during meetings
- Mute/unmute audio and enable/disable video
- Responsive UI

> Edit this list to match what's actually implemented in your app.

## Tech Stack

**Frontend**
- React
- (Add: React Router, state management, CSS framework, etc. if used)

**Backend**
- Node.js
- Express
- Socket.io

## Project Structure

```
MeetSphere/
├── backend/     # Express + Socket.io server
├── frontend/    # React client
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Tushar-sonawane06/MeetSphere.git
   cd MeetSphere
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` folder with variables such as:

```
PORT=5000
# Add any other required variables (DB connection string, API keys, etc.)
```

### Running the App

Start the backend server:
```bash
cd backend
npm start
```

Start the frontend dev server:
```bash
cd frontend
npm start
```

The app should now be running at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend), or whichever ports you've configured.

## How It Works

1. A user creates or joins a meeting room using a unique room ID.
2. The React client connects to the Express server over a Socket.io connection.
3. Socket.io handles signaling between peers (joining/leaving rooms, exchanging connection info, chat messages).
4. Peers establish real-time audio/video streams directly with each other.

## Roadmap

- [ ] Screen sharing
- [ ] Meeting recording
- [ ] Authentication / user accounts
- [ ] Waiting room / host controls

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Author

**Tushar Sonawane**
GitHub: [@Tushar-sonawane06](https://github.com/Tushar-sonawane06)