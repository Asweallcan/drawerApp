import Taro, { Component, Config } from "@tarojs/taro";
import "./style/index.less";

class App extends Component {
  config: Config = {
    pages: ["pages/Home/index", "pages/Attendance/index", "pages/Login/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fa897b",
      navigationBarTitleText: "手绘素材教程",
      navigationBarTextStyle: "black"
    },
    cloud: true
  };

  componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init({
        env: "drawer-app-gwhj1",
        traceUser: true
      });
    }
  }

  render() {
    return null;
  }
}

Taro.render(<App />, document.getElementById("app"));
