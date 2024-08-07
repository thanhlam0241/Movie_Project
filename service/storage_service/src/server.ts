import express, { Express, Request, Response } from "express";
import fs from "fs";
import morgan from "morgan";

import router from "./routes/index";
import cors from "cors";

const app: Express = express();

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/video", function (req: Request, res: Response) {
  const range = req.headers.range;

  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const videoPath = "./src/video/hello.mp4";
  const videoSize = fs.statSync(videoPath).size;
  const CHUNK_SIZE = 10 ** 6;

  const start = Number(range!.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.use(router);

// more code will go in here just befor the listening function

app.listen(8015, function () {
  console.log(`Listening on port ${8015}`);
});
