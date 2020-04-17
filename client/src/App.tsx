import Taro, { Component, Config } from "@tarojs/taro";
import Clock from "./pages/Clock/index";
import "./style/index.less";

class App extends Component {
  config: Config = {
    pages: ["pages/Clock/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fa897b",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
    },
    cloud: true,
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
