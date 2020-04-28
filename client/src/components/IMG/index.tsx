import Taro, { Component } from "@tarojs/taro";
import { Image } from "@tarojs/components";
import { ImageProps } from "@tarojs/components/types/Image";

import "./style.less";

interface Props extends ImageProps {}

class IMG extends Component<Props> {
  render() {
    return <Image {...this.props} />;
  }
}

export default IMG;
