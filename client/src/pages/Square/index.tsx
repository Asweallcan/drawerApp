import Taro, { Component } from "@tarojs/taro";
import { Layout } from "../../components";
import "./style.less";

class Sqaure extends Component {
  render() {
    return <Layout currentPage="square">square</Layout>;
  }
}

export default Sqaure;
