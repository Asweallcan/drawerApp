const { checkParams } = require("../utils");

/**
 * 
  date,
  postId, // 被评论的帖子
  commentedUserId, // 被评论的人
  commentUserId, // 评论的人
  replyUserInfo, // @的人
  _id,
 */
const Comment = (params) => {
  if (
    !checkParams(params, [
      "date",
      "postId",
      "commentedUserId",
      "commentUserId",
      "replyUserId",
    ])
  )
    throw "参数错误";
  return {
    ...params,
  };
};

Comment.__TABLE__ = "Comments";

module.exports = Comment;
