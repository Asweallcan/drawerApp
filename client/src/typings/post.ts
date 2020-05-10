import { Star } from "./star";
import { Comment } from "./comment";
import { UserInfoWithId } from "./users";

export interface Post {
  title: string;
  file: string;
  isPublic: boolean;
  isAttendance: boolean;
  date: number;
  userId: string;
  userInfo: UserInfoWithId;
  comments: Comment[];
  stars: Star[];
  commentIds?: string[];
  starIds?: string[];
  stared?: boolean;
  isSelf?: boolean;
  _id: string;
}

export type PostHistoryResp = Post[];
