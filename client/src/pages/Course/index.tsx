import Taro, { Component } from "@tarojs/taro";
import { Layout } from "../../components";
import "./style.less";

class Course extends Component {
  render() {
    return <Layout currentPage="course">course</Layout>;
  }
}

export default Course;
