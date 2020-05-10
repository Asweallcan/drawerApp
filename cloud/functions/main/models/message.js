const { checkParams } = require("../utils");

/**
  date,
  type, // star, comment, follow,
  postId,
  userId,
  content,
 */

const Message = (params) => {
  if (!checkParams(params, ["date", "type", "postId", "userId", "content"]))
    throw "参数错误";

  const { date, type, postId, userId, content } = params;

  return {
    date,
    type,
    postId,
    userId,
    content,
  };
};

module.exports = Message;
