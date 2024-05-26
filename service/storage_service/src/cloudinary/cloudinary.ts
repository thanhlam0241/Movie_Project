require("dotenv").config();
// CLOUDINARY_URL=cloudinary://963458243725343:9b0HfJePBXMX9pUyyMwmdSGgRW4@dsyvinumt
// CLOUDINARY_CLOUD_NAME=dsyvinumt
// CLOUDINARY_API_SECRET=9b0HfJePBXMX9pUyyMwmdSGgRW4
// CLOUDINARY_API_KEY=963458243725343
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadVideoByFilename = async (fileName: string) => {
  try {
    const result = await cloudinary.uploader.upload(fileName, {
      resource_type: "video",
      chunk_size: 6000,
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
