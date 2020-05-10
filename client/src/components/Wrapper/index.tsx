import Taro, { FunctionComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./style.less";

const Wrapper: FunctionComponent = props => {
  return <View className="wrapper">{props.children}</View>;
};

export default Wrapper;
