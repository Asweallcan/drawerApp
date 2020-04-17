import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Router, { Page } from "../../components/Router";
import "./style.less";

interface Props {
  currentPage: Page;
}

class Layout extends Component<Props> {
  render() {
    const { currentPage, children } = this.props;

    return (
      <View className="layout">
        <View className="body">{children}</View>
        <View className="footer">
          <Router currentPage={currentPage} />
        </View>
      </View>
    );
  }
}

export default Layout;
