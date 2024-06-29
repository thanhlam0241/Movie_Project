import "./comment.scss";
import { useState, useEffect } from "react";
import CommentUser from "./commentUser";
import commentApi from "@/api/communication/commentApi";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import CommentInput from "./commentInput";

function CommentContainer({ movieId }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [numberOfComments, setNumerOfComments] = useState(0);

  const fetchComment = async () => {
    const data = await commentApi.getComment(movieId, page);
    if (data.status === 200) {
      const comments = data.data;
      setComments((prev) => [...prev, ...comments.comments]);
      setNumerOfComments(comments.total);
      setTotalPage(comments.pageMax);
    } else {
      toast.error("Get comments fail");
    }
  };

  useEffect(() => {
    fetchComment();
  }, [page]);

  const onNextPage = () => {
    setPage((p) => p + 1);
  };

  const onComment = (text, userId) => {
    return commentApi.commentMovie(userId, movieId, text).then((res) => {
      setComments((prev) => [res.data.comment, ...prev]);
    });
  };

  return (
    <div className="comment-container">
      <div className="comments-section">
        <div className="count-comments">{numberOfComments} bình luận</div>
        <CommentInput onComment={onComment} />
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentUser
              key={comment._id + index ?? index}
              comment={comment.text}
              time={comment.create_at}
              id={comment.user_id}
            />
          ))
        ) : (
          <div>There are no comment</div>
        )}
        {page < totalPage && <Button onClick={onNextPage}>Next page</Button>}
      </div>
    </div>
  );
}

export default CommentContainer;
