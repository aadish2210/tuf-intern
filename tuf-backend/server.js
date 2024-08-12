const morgan = require("morgan");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const express = require("express");
const flashCardRoutes = require("./routes/flashCardRoutes");
const db = require("./models");
const { createServer } = require("http");
const { Server } = require("socket.io");
const errorHandler = require("./utils/errorHandler");

const app = express();
const ioServer = createServer();

const io = new Server(ioServer, {
  cors: {
    origin: "*",
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
configDotenv();

app.use("/flashcards", flashCardRoutes);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

io.on("error", (error) => {
  console.error("Socket.IO error:", error);
});

async function bootstrap() {
  await db.sequelize.sync();
  app.listen(process.env.PORT, async () => {
    console.log(`Server Started On Port ${process.env.PORT}`);
    try {
      await db.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });
  ioServer.listen(process.env.SOCKET_PORT, () => {
    console.log(`Socket.IO server started on port ${process.env.SOCKET_PORT}`);
  });
};

bootstrap();