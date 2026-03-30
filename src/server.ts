import app from "./app";
import { env } from "./env";

app.listen({
  port: env.PORT  ,
  host: '0.0.0.0'
}).then(() => {
  console.log(`🚀 HTTP server aaa  running! on port ${env.PORT}`)
})