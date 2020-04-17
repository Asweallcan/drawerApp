import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import Router, { Page } from "../../components/Router";
import Loading from "../../components/Loading";
import "./style.less";

interface Props {
  currentPage: Page;
  loading?: boolean;
}

class Layout extends Component<Props> {
  render() {
    const { currentPage, loading, children } = this.props;

    return (
      <View className="layout">
        <ScrollView className="body" scrollY enableBackToTop>
          <Loading loading={loading}>{children}</Loading>
        </ScrollView>
        <View className="footer">
          <Router currentPage={currentPage} />
        </View>
      </View>
    );
  }
}

export default Layout;
