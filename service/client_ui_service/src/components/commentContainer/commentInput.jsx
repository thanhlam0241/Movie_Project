import "./input.scss";
import { useState } from "react";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GifIcon from "@mui/icons-material/Gif";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";

function CommentInput({ onComment }) {
  const [text, setText] = useState("");

  const { id, avatar } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onKeydown = (e) => {
    if (e.key === "Enter") onSubmitData();
  };

  const onSubmitData = () => {
    onComment(text, id).then(() => {
      setText("");
    });
  };

  return (
    <div className="comment-post">
      <div className="comment-post-input">
        <div className="comment-post-user">
          <img className="comment-post-avatar" src={avatar} alt="avatar" />
        </div>
        <div
          className={
            text.length > 0
              ? "comment-post-text-media"
              : "comment-post-text-media-focus"
          }
        >
          <textarea
            onKeyDown={onKeydown}
            onChange={handleChange}
            rows={text.length > 0 ? 2 : 1}
            value={text}
            className="comment-post-text"
            placeholder="Write a comment..."
          />
          <div className="input-more">
            <div className="icon-container">
              <SentimentSatisfiedAltIcon />
              <CameraAltIcon />
              <GifIcon />
            </div>
            {text.length > 0 && (
              <SendIcon onClick={onSubmitData} sx={{ cursor: "pointer" }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentInput;
