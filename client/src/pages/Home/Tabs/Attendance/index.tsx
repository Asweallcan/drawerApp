import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { request } from "@/utils";
import { BACKEND_ERROR } from "@/constants";
import { SelfInfoResp, AttendanceHistoryResp } from "@/typings";
import { IconFont, Divider, Blank, ListItem } from "@/components";
import SelfInfo from "./components/SelfInfo";

import "./style.less";

interface Props {}

interface State {
  selfInfo: SelfInfoResp;
  attendanceHistory: AttendanceHistoryResp;
}

class Attendance extends Component<Props, State> {
  state = {
    selfInfo: {} as SelfInfoResp,
    attendanceHistory: [] as AttendanceHistoryResp
  };

  async componentDidShow() {
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
    }
  }

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
    const attendanceHistory = await request<AttendanceHistoryResp>(
      "attendance/history"
    );
    this.setState({
      attendanceHistory
    });
  };

  render() {
    const { selfInfo, attendanceHistory } = this.state;

    const { attended, continuousAttendCount } = selfInfo;

    return (
      <ScrollView
        className="tab-attendance"
        enableBackToTop
        refresherEnabled
        refresherDefaultStyle="black"
        refresherTriggered={true}
      >
        <SelfInfo selfInfo={selfInfo} />
        <Divider>打卡</Divider>
        <View className="new-attendance">
          <View className="new-attendance-icon">
            <IconFont name="bizuhe" size={200} />
          </View>
          {attended ? (
            <View className="new-attendance-info">
              今日已打卡~
              {continuousAttendCount > 0
                ? `，连续打卡${continuousAttendCount}天，请继续努力哦`
                : ""}
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
        <Divider>记录</Divider>
        <View className="attendance-history">
          {attendanceHistory.length ? (
            attendanceHistory.map(record => {
              const { title, file, date } = record;
              return (
                <ListItem
                  title={title}
                  file={file}
                  date={date}
                  onClick={() => {}}
                />
              );
            })
          ) : (
            <Blank />
          )}
        </View>
      </ScrollView>
    );
  }
}

export default Attendance;
