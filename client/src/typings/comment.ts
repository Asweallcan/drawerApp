import { UserInfoWithId } from "./users";

export interface Comment {
  content: string;
  date: number;
  postId: string; // 被评论的帖子
  commentUserId: string; // 评论的人
  commentUserInfo: UserInfoWithId;
  commentedUserId: string; // 被评论的人
  commentedUserInfo: UserInfoWithId;
  replyUserId: string;
  replyUserInfo: UserInfoWithId; // @的人
  _id: string;
}
