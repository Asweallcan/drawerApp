import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import constants from "../../style/constants";
import "./style.less";

interface Props {
  loading?: boolean;
}

class Loading extends Component<Props> {
  componentDidMount() {
    const { loading } = this.props;
    this.animate(loading);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loading !== nextProps.loading) {
      this.animate(nextProps.loading);
    }
  }

  animate = loading => {
    if (loading) {
      this.$scope.animate(
        ".loading-container.loading .indicator",
        [
          { rotate: 0, ease: "ease-out" },
          { rotate: 360, ease: "ease-out" }
        ],
        1000,
        () => {
          this.animate(loading);
        }
      );
    } else {
      this.$scope.clearAnimation(".loading-container.loading .indicator");
    }
  };

  render() {
    const { loading, children } = this.props;

    return (
      <View className={`loading-container ${loading ? "loading" : ""}`}>
        <View className="indicator">
          <AtIcon
            prefixClass="icon"
            value="jiazaizhong"
            size={48}
            color={constants.THEME_COLOR}
          />
        </View>
        <View className="body">{children}</View>
      </View>
    );
  }
}

export default Loading;
