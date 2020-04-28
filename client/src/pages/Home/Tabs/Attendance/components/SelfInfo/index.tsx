import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { SelfInfoResp } from "@/typings";
import { IconFont } from "@/components";

import "./style.less";

interface Props {
  selfInfo: SelfInfoResp;
}

class SelfInfo extends Component<Props> {
  render() {
    const { selfInfo = {} as SelfInfoResp } = this.props;
    const {
      avatarUrl,
      nickName = "暂未登录",
      postIds,
      followIds,
      followerIds,
      starIds,
      messages
    } = selfInfo;

    const haveNewMessage = messages && messages.length > 0;

    return (
      <View
        className="self-info"
        onClick={
          avatarUrl
            ? undefined
            : () => {
                Taro.navigateTo({ url: "/pages/Login/index" });
              }
        }
      >
        <Image src={avatarUrl} className="avatar" />
        <View className="social">
          <View className="top">
            <View className="nickName">{nickName}</View>
            <View className="message">
              <View className="new-count">
                {haveNewMessage ? `+${messages.length}` : null}
              </View>
              <IconFont
                name="icon-test"
                size={40}
                color={haveNewMessage ? "#f00000" : "#000"}
              />
            </View>
          </View>
          <View className="bottom">
            <View className="block" hoverClass="clicked">
              <View className="title">发布</View>
              <View className="num">{postIds.length || 0}</View>
            </View>
            <View className="block" hoverClass="clicked">
              <View className="title">已关注</View>
              <View className="num">{followIds.length || 0}</View>
            </View>
            <View className="block" hoverClass="clicked">
              <View className="title">粉丝</View>
              <View className="num">{followerIds.length || 0}</View>
            </View>
            <View className="block" hoverClass="clicked">
              <View className="title">获赞</View>
              <View className="num">{starIds.length || 0}</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SelfInfo;
