const commentSchema = require("../models/comment");

const fs = require("fs");
const path = require("path");

const numberOfReplyPerPage = 10;
const numberOfCommentPerPage = 10;

// Path: backend\controller\Social\commentController.js
const createCommentInMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movie_id);
    const { text, userId } = req.body;
    const data = {
      text,
      user_id: userId,
      movie_id: movieId,
      create_at: Date.now(),
    };
    const comment = await commentSchema.create(data);
    return res.status(200).json({ comment });
  } catch (err) {
    return res.json({
      msgs: "Opps! Something went wrong with our server. Please wait and try again",
    });
  }
};

const getCommentInMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movie_id);
    const page = parseInt(req.query.page);
    const totalComment = await commentSchema.countDocuments({
      movie_id: movieId,
    });
    const comments = await commentSchema
      .find({ movie_id: movieId })
      .sort({ create_at: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .select("_id user_id text create_at");
    return res.status(200).json({ comments, total: totalComment, page });
  } catch (err) {
    return res.json({
      msgs: "Opps! Something went wrong with our server. Please wait and try again",
    });
  }
};

const deleteCommentInMovie = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.body.user_id;
    const comment = await commentSchema.findById(commentId);
    if (!comment) {
      return res.status(400).json({ msgs: "Comment not found" });
    }
    if (comment.user_id !== userId) {
      return res
        .status(400)
        .json({ msgs: "You are not authorized to delete this comment" });
    }
    await comment.remove();
    return res.status(200).json({ msgs: "Comment deleted successfully" });
  } catch (err) {
    return res.json({
      msgs: "Opps! Something went wrong with our server. Please wait and try again",
    });
  }
};

const updateCommentInMovie = async (req, res) => {
  const commentId = req.params.id;
  const { text, userId } = req.body;
  try {
    const comment = await commentSchema.findById(commentId);
    if (!comment) {
      return res.status(400).json({ msgs: "Comment not found" });
    }
    if (comment.user_id !== userId) {
      return res
        .status(400)
        .json({ msgs: "You are not authorized to update this comment" });
    }
    comment.text = text;
    await comment.save();
    return res.status(200).json({ msgs: "Comment updated successfully" });
  } catch (err) {
    return res.json({
      msgs: "Opps! Something went wrong with our server. Please wait and try again",
    });
  }
};

// const createReplyInComment = async (req, res) => {
//   try {
//     const commentId = req.params.id;
//     const { text, userId, movieId } = req.body;
//     if (!text || !userId || !movieId) {
//       res.status(409).text("Params not having user, movie or text commment");
//     }
//     const data = {
//       text,
//       repliedBy: user._id,
//       inComment: commentId,
//       created: Date.now(),
//     };
//     const reply = await CommentReply.create(data);
//     return res.status(200).json({ reply });
//   } catch (err) {
//     return res.json({
//       msgs: "Opps! Something went wrong with our server. Please wait and try again",
//     });
//   }
// };

// const getReplyInComment = async (req, res) => {
//   const commentId = req.params.id;
//   const page = req.query.page;
//   try {
//     const replies = await CommentReply.find({ inComment: commentId })
//       .populate("repliedBy", "_id name avatar")
//       .sort({ created: -1 })
//       .skip((page - 1) * numberOfReplyPerPage)
//       .limit(numberOfReplyPerPage)
//       .select("text created photos repliedBy");
//     return res.status(200).json({ replies });
//   } catch (err) {
//     return res.json({
//       msgs: "Opps! Something went wrong with our server. Please wait and try again",
//     });
//   }
// };

// const deleteReplyInComment = async (req, res) => {
//   const user = req.user;
//   const replyId = req.params.id;
//   try {
//     await CommentReply.deleteOne({ _id: replyId, commentedBy: user._id });
//     return res.status(200).json({ msgs: "Reply deleted successfully" });
//   } catch (err) {
//     return res.json({
//       msgs: "Opps! Something went wrong with our server. Please wait and try again",
//     });
//   }
// };

// const updateReplyInComment = async (req, res) => {
//   const user = req.user;
//   const replyId = req.params.id;
//   const { text } = req.body;
//   const image = req.file;
//   try {
//     const commentReply = await CommentReply.findById(replyId);
//     if (!commentReply) {
//       return res.status(400).json({ msgs: "Reply not found" });
//     }
//     if (commentReply.repliedBy.toString() !== user._id.toString()) {
//       return res
//         .status(400)
//         .json({ msgs: "You are not authorized to update this reply" });
//     }
//     if (image) {
//       if (commentReply.photos) {
//         fs.unlink(
//           path.join(
//             __dirname,
//             `../../../uploads/comment/${commentReply.photos}`
//           ),
//           (err) => {
//             if (err) {
//               console.log(err);
//             }
//           }
//         );
//       }
//       commentReply.photos = image.filename;
//     }
//     commentReply.text = text;
//     await commentReply.save();
//     return res.status(200).json({ msgs: "Reply updated successfully" });
//   } catch (err) {
//     return res.json({
//       msgs: "Opps! Something went wrong with our server. Please wait and try again",
//     });
//   }
// };

module.exports = {
  createCommentInMovie,
  getCommentInMovie,
  deleteCommentInMovie,
  updateCommentInMovie,
  //   createReplyInComment,
  //   getReplyInComment,
  //   deleteReplyInComment,
  //   updateReplyInComment,
};
