import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet"
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import logger from "./utils/logger";
import { CORS_ORIGIN } from "./constants";
import userRoute from "./modules/user/user.route"

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(helmet())

app.use('/api/users', userRoute)

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`server listening at http://localhost:${PORT}`);
});

const Signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(singal: string) {
  process.on(singal, async () => {
    //disconnect from db
    console.log("Goodbye, got singal", singal);
    console.log("my work is done");
    process.exit(0);
  });
}

for (let i = 0; i < Signals.length; i++) {
  gracefulShutdown(Signals[i]);
}
