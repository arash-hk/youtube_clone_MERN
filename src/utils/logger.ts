import { pino } from "pino";

const logger = pino({
  transport: {
    target : "pino-pretty",
    options: {
      colorrize: true
    }
  }
})

export default logger