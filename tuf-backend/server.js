const morgan = require("morgan");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const express = require("express");
const flashCardRoutes = require("./routes/flashCardRoutes")
const db = require("./models");

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
configDotenv();

app.use("/" , flashCardRoutes)

db.sequelize.sync().then((req) => {
  app.listen(process.env.PORT, async () => {
    console.log(`Server Started On Port ${process.env.PORT}`);
    try {
      await db.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });
});
