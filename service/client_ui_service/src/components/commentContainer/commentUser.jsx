import "./comment.scss";

function CommentUser({ avatar, name, comment, time }) {
  return (
    <div class="comment">
      <img src={avatar} alt="avatar" width="40" height="40" />
      <div class="comment-content">
        <p class="user">{name}</p>
        <p class="text">{comment}</p>
        <p class="time">{time}</p>
      </div>
    </div>
  );
}

export default CommentUser;
