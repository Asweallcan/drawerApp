const User = ({
  nickName,
  avatarUrl,
  openId,
  lastAttendDate = null,
  continuousAttendCount = 0,
  attendanceIds = [],
  followerIds = [],
  followIds = [],
  starIds = [],
  commentIds = [],
  postIds = [],
  messages = [],
  registerDate = Date.now(),
  _id,
}) => ({
  nickName,
  avatarUrl,
  openId,
  lastAttendDate,
  continuousAttendCount,
  attendanceIds,
  followerIds,
  followIds,
  starIds,
  commentIds,
  postIds,
  messages,
  registerDate,
  _id,
});

User.__TABLE__ = "Users";

module.exports = User;
