import Taro, { Component, Config } from "@tarojs/taro";
import Clock from "./pages/Clock/index";
import "./style/index.less";

class App extends Component {
  config: Config = {
    pages: ["pages/Clock/index", "pages/Square/index", "pages/Course/index"],
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
      Taro.cloud.init();
    }
  }

  render() {
    return <Clock />;
  }
}

Taro.render(<App />, document.getElementById("app"));
