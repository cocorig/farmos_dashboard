import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import devicesRouter from "./routes/devices.js";
import powerUsageRouter from "./routes/powerUsage.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/devices", devicesRouter);

app.use("/api/power", powerUsageRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
