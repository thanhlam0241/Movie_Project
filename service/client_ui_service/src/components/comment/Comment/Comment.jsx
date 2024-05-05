import './style.scss'

function Comment({ avatar, name, text, image, video, createdAt, isParent }) {
    return (
        <div className="comment">
            <div className="comment-avatar">
                <img className={['comment-img__avatar', isParent ? 'size32' : 'size24']} src={avatar} alt="name" />
            </div>
            <div className="comment-content">
                <div className="div-content">
                    <div className="div-content__comment">
                        <div>{name}</div>
                        <div>{text}</div>
                    </div>
                    <div className="div-control">
                        <img src="@/assets/icons/ellipsis.png" alt="Control" />
                    </div>
                </div>
                {image && <div className="comment-image">
                    <img src={image} alt="image" />
                </div>}
                {video && <div className="comment-video">
                    <video src={video} controls></video>
                </div>}
                <div className="comment-tool">
                    <span>{createdAt}</span>
                    <span>Thích</span>
                    <span>Phản hồi</span>
                </div>
            </div>

        </div>
    );
}

export default Comment;