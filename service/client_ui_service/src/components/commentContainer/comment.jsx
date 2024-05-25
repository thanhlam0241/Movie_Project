import "./comment.scss";
import { useState, useEffect } from "react";
import CommentUser from "./commentUser";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/spinner/Spinner";

function CommentContainer({ movieId }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);

  const fetchComments = () => {
    // fetch comments from api
    // setComments(response.data)
    setComments([
      {
        name: "t20dcn4nguyenquocduy9",
        comment: "Hóng clip fff, full rương full thần đồng ❤️",
        time: "11/8/2024",
        avatar:
          "https://i2.wp.com/genshinbuilds.aipurrjects.com/genshin/characters/eula/image.png?strip=all&quality=75&w=256",
      },
      {
        name: "t20dcn4nguyenquocduy9",
        comment: "Hóng clip fff, full rương full thần đồng ❤️",
        time: "11/8/2024",
        avatar:
          "https://i2.wp.com/genshinbuilds.aipurrjects.com/genshin/characters/eula/image.png?strip=all&quality=75&w=256",
      },
      {
        name: "t20dcn4nguyenquocduy9",
        comment: "Hóng clip fff, full rương full thần đồng ❤️",
        time: "11/8/2024",
        avatar:
          "https://i2.wp.com/genshinbuilds.aipurrjects.com/genshin/characters/eula/image.png?strip=all&quality=75&w=256",
      },
      {
        name: "t20dcn4nguyenquocduy9",
        comment: "Hóng clip fff, full rương full thần đồng ❤️",
        time: "11/8/2024",
        avatar:
          "https://i2.wp.com/genshinbuilds.aipurrjects.com/genshin/characters/eula/image.png?strip=all&quality=75&w=256",
      },
    ]);
    setNumerOfComments(14);
  };

  const [numberOfComments, setNumerOfComments] = useState(0);

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div class="comment-container">
      <div class="comments-section">
        <div class="count-comments">{numberOfComments} bình luận</div>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentUser
              key={index}
              avatar={comment.avatar}
              name={comment.name}
              comment={comment.comment}
              time={comment.time}
            />
          ))
        ) : (
          <div>There are no comment</div>
        )}
      </div>
    </div>
  );
}

export default CommentContainer;
