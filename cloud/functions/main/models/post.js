const { checkParams } = require("../utils");

/**
  title,
  file,
  date,
  isPublic,
  isAttendance,
  userId, // 发布的人的id
  commentIds = [],
  starIds = [],
  _id,
 */

const Post = (params) => {
  if (
    !checkParams(params, [
      "title",
      "file",
      "date",
      "isPublic",
      "isAttendance",
      "userId",
    ])
  )
    throw "参数错误";

  const {
    title,
    file,
    date,
    isPublic,
    isAttendance,
    userId,
    commentIds = [],
    starIds = [],
    _id,
  } = params;

  if (title.length > 120) throw "标题过长";

  return {
    title,
    file,
    date,
    isPublic,
    isAttendance,
    commentIds,
    starIds,
    userId,
    _id,
  };
};

Post.__TABLE__ = "Posts";

module.exports = Post;
