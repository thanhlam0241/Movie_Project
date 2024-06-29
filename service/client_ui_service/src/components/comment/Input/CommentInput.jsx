function CommentInput({ user }) {
  return (
    <div className="commentInput">
      <input
        type="text"
        placeholder={user ? `Trả lời ${user}` : "Viết bình luận..."}
      />
    </div>
  );
}
