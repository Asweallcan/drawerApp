import Taro, {
  UserInfo,
  Component,
  useState,
  useCallback,
  useEffect,
  FunctionComponent
} from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { Post } from "@/typings";
import { request, getUserInfo } from "@/utils";
import { CustomImage, Wrapper, IconFont } from "@/components";
import colors from "@/style/constants";
import moment from "moment";

import "./style.less";

interface Props {}

interface State {
  postDetail: Post;
  userInfo: UserInfo;
  showActions: boolean;
}

class PostDetail extends Component<Props, State> {
  state = {
    postDetail: {} as Post,
    userInfo: {} as UserInfo,
    showActions: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      Taro.showLoading({
        title: "加载中"
      });
      const userInfo = await getUserInfo();
      const data = await request<Post>("post/detail", {
        id
      });
      setUserInfo(userInfo);
      setPostDetail(data);
    } catch (err) {
      Taro.showToast({
        icon: "none",
        title: err
      });
    } finally {
      Taro.hideLoading();
    }
  };
}

const PostDetail: FunctionComponent<Props> = props => {
  const { id } = this.$router.params;
  const [postDetail, setPostDetail] = useState({} as Post);
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const { title, file, date, isPublic, comments, stars, stared } = postDetail;
  const { nickName, avatarUrl } = userInfo;

  return (
    <ScrollView className="page-post-detail" scrollY>
      <Wrapper>
        <View className="post-detail">
          <CustomImage my-class="avatar" src={avatarUrl} />
          <View className="detail">
            <Text className="nickName">{nickName}</Text>
            <Text className="title">{title}</Text>
            <CustomImage
              my-class="file"
              src={file}
              onClick={() => {
                Taro.previewImage({
                  current: file,
                  urls: [file]
                });
              }}
            />
            <View className="date-n-action">
              <Text className="date">
                {moment(date).format("YYYY-MM-DD HH:mm:ss")}
              </Text>
              <View
                className="action-btn"
                onClick={() => setShowActions(!showActions)}
              >
                <IconFont name="more" size={32} />
                <View className={`actions ${showActions ? "show" : ""}`}>
                  <View className="action">
                    <IconFont name="dianzan" size={32} color="#fff" />
                    <View className="text">{stared ? "取消" : "点赞"}</View>
                  </View>
                  <View className="action">
                    <IconFont name="pinglun" size={32} color="#fff" />
                    <View className="text">评论</View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {isPublic ? (
          <View className="social">
            <View className="stars">
              <View className="icon">
                <IconFont name="dianzan" size={32} color={colors.THEME_COLOR} />
              </View>
              <View className="list">
                {stars.map(star => {
                  const { starUserInfo, starUserId } = star;
                  const { avatarUrl } = starUserInfo;
                  return (
                    <View className="user">
                      <CustomImage src={avatarUrl} my-class="avatar" />
                    </View>
                  );
                })}
              </View>
            </View>
            <View className="comments">
              <View className="icon"></View>
              {comments.map(comment => {
                const {
                  commentUserInfo: { avatarUrl, nickName },
                  commentUserId,
                  content
                } = comment;

                return <View>{content}</View>;
              })}
            </View>
          </View>
        ) : null}
      </Wrapper>
    </ScrollView>
  );
};

export default PostDetail;
