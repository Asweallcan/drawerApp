import Taro, { Component } from "@tarojs/taro";
import { Layout } from "../../components";
import "./style.less";

interface Props {}

interface State {
  loading: boolean;
}

class Clock extends Component<Props, State> {
  state = {
    loading: false
  };

  componentDidMount() {
    wx.showShareMenu({
      withTicket: true
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <Layout currentPage="clock" loading={loading}>
        clock
      </Layout>
    );
  }
}

export default Clock;
