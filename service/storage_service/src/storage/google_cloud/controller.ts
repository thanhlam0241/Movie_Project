// Imports the Google Cloud client library
import { FileMetadata, Storage } from "@google-cloud/storage";
import { Request, Response, NextFunction } from "express";
import processFile from "@/middleware/upload";
import { format } from "util";
import { MetadataResponse } from "@google-cloud/storage/build/cjs/src/nodejs-common";
import { v4 as uuid } from "uuid";

// Creates a client using Application Default Credentials
const storage = new Storage({
  keyFilename: "src/storage/google_cloud/key.json",
});

const bucketName = "my-bucket-movie-project";
const bucket = storage.bucket(bucketName);

const uploadVideo = async (req: any, res: Response) => {
  try {
    await processFile(req, res);

    if (!req?.file || !req?.file?.originalname) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const name = uuid() + req.file.originalname;

    const blob = bucket.file("video/" + name);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data: any) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        await bucket.file(name).makePublic();
      } catch {
        return res.status(200).send({
          message: `Uploaded the file successfully, but public access is denied!`,
          url: publicUrl,
          name,
        });
      }

      res.status(200).send({
        message: "Uploaded the file successfully",
        url: publicUrl,
        name,
      });
    });

    blobStream.end(req.file?.buffer);
  } catch (err: any) {
    console.log(err);

    if (err?.code && err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file. ERROR ${err}`,
    });
  }
};

const uploadImage = async (req: any, res: Response) => {
  try {
    await processFile(req, res);

    if (!req?.file || !req?.file?.originalname) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const name = uuid() + req.file.originalname;

    const blob = bucket.file("image/" + name);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data: any) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        await bucket.file(name).makePublic();
      } catch {
        return res.status(200).send({
          message: `Uploaded the file successfully, but public access is denied!`,
          url: publicUrl,
        });
      } finally {
      }

      res.status(200).send({
        message: "Uploaded the file successfully",
        url: publicUrl,
        name,
      });
    });

    blobStream.end(req.file?.buffer);
  } catch (err: any) {
    console.log(err);

    if (err?.code && err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file. ERROR ${err}`,
    });
  }
};

const getListFiles = async (req: Request, res: Response) => {
  try {
    const [files] = await bucket.getFiles();
    let fileInfos: any[] = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file.name,
        url: file.metadata.mediaLink,
      });
    });

    res.status(200).send(fileInfos);
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Unable to read list of files!",
    });
  }
};

const download = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    if (!name) {
      return res.status(400).send({
        message: "Please provide a file name!",
      });
    }
    const [metaData]: MetadataResponse<FileMetadata> = await bucket
      .file("video/" + name)
      .getMetadata();
    if (!metaData || !metaData.mediaLink) {
      return res.status(404).send({
        message: "File not found!",
      });
    }
    const file = bucket.file("video/" + name).download();
    res.status(200).send(file);
  } catch (err) {
    res.status(500).send({
      message: "Could not download the file. " + err,
    });
  }
};

const downloadStream = async (req: Request, res: Response) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const fileName = req.params.name;
  if (!fileName) {
    res.status(400).send("Requires file name");
  }
  try {
    storage
      .bucket(bucketName)
      .file(fileName)
      .createReadStream() //stream is created
      .pipe(res)
      .on("finish", () => {
        // The file download is complete
      });
  } catch (err) {
    res.status(500).send({
      message: "Could not download the file. " + err,
    });
  }
};

export { uploadVideo, uploadImage, getListFiles, download, downloadStream };
