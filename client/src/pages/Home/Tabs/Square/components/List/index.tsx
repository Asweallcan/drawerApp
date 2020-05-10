import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { Post } from "@/typings";
import { CustomImage, Blank, IconFont } from "@/components";
import "./style.less";
import { request } from "@/utils";

interface Props {
  listData: Post[];
  onRefresherRefresh: () => void;
  onScrollToLower: () => void;
  lowerLoading: boolean;
  updateListData: (postId, data) => void;
}

class List extends Component<Props> {
  static externalClasses = ["my-class"];

  onStar = async postId => {
    const { updateListData } = this.props;
    const data = await request("post/star", {
      postId
    });
    updateListData(postId, data);
  };

  toUserPage = userId => {
    console.log("to user page");
  };

  toDetail = postId => {
    console.log("to detail");
  };

  render() {
    const {
      listData,
      onRefresherRefresh,
      onScrollToLower,
      lowerLoading
    } = this.props;

    return (
      <ScrollView
        className="my-class"
        enableBackToTop
        refresherEnabled
        onRefresherRefresh={onRefresherRefresh}
        onScrollToLower={onScrollToLower}
        lowerThreshold={100}
        scrollY
      >
        <View className="list">
          {listData && listData.length > 0 ? (
            listData.map((item, index) => {
              const {
                userInfo,
                userId,
                file,
                title,
                starIds,
                commentIds,
                stared,
                _id
              } = item;
              const { nickName, avatarUrl } = userInfo;
              return (
                <View
                  className={`card ${
                    (index + 1) % 2 === 0 ? "no-right-margin" : ""
                  }`}
                  onClick={this.toDetail}
                >
                  <View
                    className="user"
                    onClick={e => {
                      e.stopPropagation();
                      this.toUserPage(userId);
                    }}
                  >
                    <CustomImage src={avatarUrl} my-class="avatar" />
                    <View className="nickName">{nickName}</View>
                  </View>
                  <CustomImage my-class="card-img" src={file} />
                  <View className="title">{title}</View>
                  <View className="others">
                    <View className="stars">
                      <View
                        className="icon"
                        onClick={e => {
                          if (stared)
                            Taro.showToast({
                              title: "已经点过赞了~",
                              icon: "none"
                            });
                          e.stopPropagation();
                          this.onStar(_id);
                        }}
                      >
                        <IconFont
                          name="dianzan"
                          size={32}
                          color={stared ? "#f00" : undefined}
                        />
                      </View>
                      <View className="num">{starIds!.length}</View>
                    </View>
                    <View className="comments">
                      <View className="icon">
                        <IconFont name="pinglun" size={34} />
                      </View>
                      <View className="num">{commentIds!.length}</View>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View className="blank-wrapper">
              <Blank />
            </View>
          )}
          {lowerLoading ? (
            <View className="lower-loading">
              <View className="icon">
                <IconFont name="jiazai" size={36} />
              </View>
              <View className="text">加载中...</View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

export default List;
