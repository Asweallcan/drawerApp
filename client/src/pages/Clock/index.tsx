import Taro, { Component, Config } from "@tarojs/taro";
import { Layout } from "../../components";
import "./style.less";

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: "手绘素材教程库"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <Layout currentPage="clock">
      asd
    </Layout>;
  }
}
