function CommentInput({ user }) {
    return (
        <div class="commentInput">
            <input type="text" placeholder={user ? `Trả lời ${user}` : 'Viết bình luận...'} />
        </div>
    );
}