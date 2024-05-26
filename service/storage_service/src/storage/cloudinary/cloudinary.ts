require("dotenv").config();
// CLOUDINARY_URL=cloudinary://963458243725343:9b0HfJePBXMX9pUyyMwmdSGgRW4@dsyvinumt
// CLOUDINARY_CLOUD_NAME=dsyvinumt
// CLOUDINARY_API_SECRET=9b0HfJePBXMX9pUyyMwmdSGgRW4
// CLOUDINARY_API_KEY=963458243725343
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadVideoByFilename = async (fileName: string) => {
  try {
    const result = await cloudinary.uploader.upload(fileName, {
      resource_type: "video",
      public_id: "video_1",
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 100,
          crop: "crop",
          gravity: "south",
          audio_codec: "none",
        },
      ],
      eager_async: true,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

interface FileRequest extends Request {
  file: any;
}

export const uploadVideoByFile = async (
  req: FileRequest,
  res: Response,
  next: NextFunction
) => {
  let file = req.file;
  cloudinary.uploader
    .upload_stream({ resource_type: "raw" }, function (error, result) {
      if (!error && result?.url) {
        req.body.imageURL = result.url;
        next();
      } else {
        req.body.imageURL = "";
        next();
      }
    })
    .end(file.data);
};
