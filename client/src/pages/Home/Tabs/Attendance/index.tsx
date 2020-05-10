import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { request } from "@/utils";
import { BACKEND_ERROR } from "@/constants";
import { SelfInfoResp, PostHistoryResp } from "@/typings";
import { IconFont, Divider, PostListItem, Wrapper } from "@/components";
import SelfInfo from "./components/SelfInfo";

import "./style.less";

interface Props {}

interface State {
  selfInfo: SelfInfoResp;
  postHistory: PostHistoryResp;
}

class Attendance extends Component<Props, State> {
  state = {
    selfInfo: {} as SelfInfoResp,
    postHistory: [] as PostHistoryResp
  };

  async componentDidShow() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      Taro.showLoading({
        title: "加载中"
      });
      const settings = await Taro.getSetting();
      if (!settings.authSetting["scope.userInfo"]) return;
      await Promise.all([this.getSelfInfo(), this.getAttendanceHistory()]);
    } catch (err) {
      console.error(err);
      Taro.showToast({
        title: BACKEND_ERROR,
        icon: "none"
      });
    } finally {
      Taro.hideLoading();
      Taro.stopPullDownRefresh();
    }
  };

  toAttend = async () => {
    const settings = await Taro.getSetting();

    if (!settings["authSetting"]["scope.userInfo"]) {
      Taro.navigateTo({
        url: "/pages/Login/index"
      });
    } else {
      const {
        selfInfo: { attended }
      } = this.state;
      if (!attended) {
        Taro.navigateTo({
          url: "/pages/Attendance/index"
        });
      }
    }
  };

  getSelfInfo = async () => {
    const selfInfo = await request<SelfInfoResp>("user/selfInfo");
    this.setState({
      selfInfo
    });
  };

  getAttendanceHistory = async () => {
    const postHistory = await request<PostHistoryResp>("post/history");
    this.setState({
      postHistory
    });
  };

  render() {
    const { selfInfo, postHistory } = this.state;

    const { attended, continuousAttendCount } = selfInfo;

    return (
      <ScrollView
        className="tab-attendance"
        enableBackToTop
        refresherEnabled
        scrollWithAnimation
        refresherDefaultStyle="black"
        onRefresherRefresh={() => this.fetchData()}
        scrollY
      >
        <Wrapper>
          <SelfInfo selfInfo={selfInfo} my-class="self-info" />
          <Divider>打卡</Divider>
          <View className="new-attendance">
            <View className="new-attendance-icon">
              <IconFont name="bizuhe" size={200} />
            </View>
            {attended ? (
              <View className="new-attendance-info">
                今日已打卡
                {continuousAttendCount > 1
                  ? `，连续打卡${continuousAttendCount}天，请继续努力哦`
                  : "，去广场看看吧"}
              </View>
            ) : (
              <View
                className="new-attendance-btn-text"
                hoverClass="clicked"
                onClick={this.toAttend}
              >
                每天进步
              </View>
            )}
          </View>
          {postHistory.length > 0 ? (
            <View>
              <Divider>记录</Divider>
              <View className="attendance-history">
                {postHistory.map(record => {
                  const { title, file, date, _id, isPublic } = record;
                  return (
                    <PostListItem
                      title={title}
                      file={file}
                      date={date}
                      isPublic={isPublic}
                      onClick={() => {
                        Taro.navigateTo({
                          url: `/pages/PostDetail/index?id=${_id}`
                        });
                      }}
                    />
                  );
                })}
              </View>
            </View>
          ) : null}
        </Wrapper>
      </ScrollView>
    );
  }
}

export default Attendance;
