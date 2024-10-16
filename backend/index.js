import express, { response } from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors'


const app = express();

app.use(express.json());

// MiddleWare for handlling CORS(Cross-Origin resource Sharing) Policy
// methode 1 : Allow all Origins will default of cors(*)
app.use(cors());

// method 2: Allow custom Origins (More control over it)
// app.use(
  //   cors({
    //     origin: "https://localhost:5555",
    //     methods: ["GET", "POST", "PUT", "DELETE"],
    //     allowedHeaders: ["Content-Type"],
    //   })
    // );
    
app.use("/books", booksRoute);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to Mern!!");
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/bookStore");
  console.log("Mongo Connection Open!!");

  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  });
}
main().catch((err) => {
  console.log("OHH NO mongo Connection Error!!");
  console.log(err);
});
