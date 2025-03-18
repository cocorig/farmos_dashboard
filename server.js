import express from "express";
import next from "next";
import dotenv from "dotenv";
import cors from "cors";
import devicesRouter from "./server/routes/devices.js";
import powerUsageRouter from "./server/routes/powerUsage.js";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/devices", devicesRouter);
app.use("/api/power", powerUsageRouter);

app.all("*", (req, res) => {
  return handle(req, res);
});

nextApp.prepare().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
