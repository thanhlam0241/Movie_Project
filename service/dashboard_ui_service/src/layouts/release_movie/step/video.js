import FileUpload from "components/MDUpload";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import Backdrop from "@mui/material/Backdrop";

const typeMedia = {
  VIDEO: "video",
  POSTER: "poster",
  BACKDROP: "backdrop",
};

function Video() {
  const [fileVideo, setFileVideo] = useState();
  const [filePoster, setFilePoster] = useState();
  const [fileBackdrop, setFileBackdrop] = useState();

  const [openPreview, setOpenPreview] = useState(false);
  const [typePreview, setTypePreview] = useState();

  const handleClosePreview = () => {
    setOpenPreview(false);
    setTypePreview(null);
  };

  function handleChangeVideo(event) {
    const fileObj = event.target.files[0];
    console.log(fileObj);
    const fileName = fileObj.name;
    if (!fileName.endsWith(".mp4")) {
      alert("You can upload video files only.");
      return;
    }
    setFileVideo(fileObj);
  }

  function handleChangePoster(event) {
    const fileObj = event.target.files[0];
    console.log(fileObj);
    const fileName = fileObj.name;
    if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png")) {
      alert("You can upload image files only.");
      return;
    }
    setFilePoster(fileObj);
  }

  function handleChangeBackdrop(event) {
    const fileObj = event.target.files[0];
    console.log(fileObj);
    const fileName = fileObj.name;
    if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png")) {
      alert("You can upload image files only.");
      return;
    }
    setFileBackdrop(fileObj);
  }

  const handleClickFileName = (type) => {
    return () => {
      setTypePreview(type);
      setOpenPreview(true);
    };
  };
  return (
    <form
      style={{
        backgroundColor: "#fff",
        marginTop: 5,
        padding: "24px 24px 24px 0",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "flex-start",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openPreview}
        onClick={handleClosePreview}
      >
        {typePreview === typeMedia.VIDEO && fileVideo && (
          <ReactPlayer height="400px" controls url={URL.createObjectURL(fileVideo)} />
        )}
        {typePreview === typeMedia.POSTER && filePoster && (
          <img height="300px" src={URL.createObjectURL(filePoster)} />
        )}
        {typePreview === typeMedia.BACKDROP && fileBackdrop && (
          <img height="300px" src={URL.createObjectURL(fileBackdrop)} />
        )}
      </Backdrop>
      <FileUpload
        onClickName={handleClickFileName(typeMedia.VIDEO)}
        label="Upload video"
        onChange={handleChangeVideo}
        file={fileVideo}
      />

      <FileUpload
        onClickName={handleClickFileName(typeMedia.POSTER)}
        label="Upload poster"
        onChange={handleChangePoster}
        file={filePoster}
      />
      <FileUpload
        onClickName={handleClickFileName(typeMedia.BACKDROP)}
        label="Upload background"
        onChange={handleChangeBackdrop}
        file={fileBackdrop}
      />
    </form>
  );
}

export default Video;
