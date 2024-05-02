import express, { Express, Request, Response } from "express";
import fs from "fs";
import { uploadVideoByFilename } from "./cloudinary/cloudinary";

const app: Express = express();

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

app.get("/video/upload", async function (req: Request, res: Response) {
  console.log("uploading video");
  const fileName = "./src/video/1.mp4";
  const result = await uploadVideoByFilename(fileName);
  res.json(result);
});

// more code will go in here just befor the listening function

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
