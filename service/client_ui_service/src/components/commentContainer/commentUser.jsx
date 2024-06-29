import { useEffect, useState } from "react";
import "./comment.scss";
import { getDataById } from "@/api/account/api";
import { formatDate } from "@/utils/validate";

function CommentUser({ comment, time, id }) {
  const [imageAvatar, setImageAvatar] = useState("/src/assets/avatar.png");
  const [name, setName] = useState(`userid${comment.user_id}`);
  const fetchData = () => {
    getDataById(id).then((data) => {
      if (data?.data && data?.data?.avatar) setImageAvatar(data.data.avatar);
      if (data?.data && data?.data?.name) setName(data.data.name);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="comment">
      <img
        className="avatar small"
        src={imageAvatar}
        alt="avatar"
        width="40"
        height="40"
      />
      <div className="comment-content">
        <p className="user">{name}</p>
        <p className="text">{comment}</p>
        <p className="time">{formatDate(time)}</p>
      </div>
    </div>
  );
}

export default CommentUser;
