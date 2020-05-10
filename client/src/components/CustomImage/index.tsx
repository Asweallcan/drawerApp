import Taro, { Component } from "@tarojs/taro";
import { Image } from "@tarojs/components";
import { ImageProps } from "@tarojs/components/types/Image";

import "./style.less";

interface Props extends ImageProps {}

interface State {
  isError: boolean;
}

class CustomImage extends Component<Props, State> {
  static externalClasses = ["my-class"];

  state = {
    isError: false
  };

  onError = () => {
    this.setState({ isError: true });
  };

  render() {
    const { isError } = this.state;
    const {
      showMenuByLongpress,
      webp,
      mode,
      src,
      lazyLoad = true,
      onClick
    } = this.props;

    const isBlank = isError || !src;

    return (
      <Image
        onClick={onClick || function() {}}
        showMenuByLongpress={showMenuByLongpress}
        webp={!!webp}
        mode={mode || "aspectFill"}
        src={src}
        lazyLoad={lazyLoad}
        className={`my-class custom-image ${isBlank ? "blank" : ""}`}
        onError={this.onError}
      />
    );
  }
}

export default CustomImage;
