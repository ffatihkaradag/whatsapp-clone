import express from "express";
import mongoose from "mongoose";

//app config
const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});

//DB config
const connection_url =
  "mongodb+srv://admin:FMWxdmiBUbVOfLPd@cluster0.xut2l.mongodb.net/whatsapp?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//api endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//listen
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
