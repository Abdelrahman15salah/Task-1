require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./DB/DB');
const userRouter = require('./routes/userRoutes');
const claimRouter = require('./routes/claimHistory');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());

// Attach io to request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/users', userRouter);
app.use('/api/claim', claimRouter);

// DB & Server
connectDB();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));