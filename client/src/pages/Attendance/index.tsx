import Taro, { Component } from "@tarojs/taro";
import { View, Input, Image, ScrollView, Form } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { FormItem } from "../../components";

import "./style.less";

interface Props {}

interface State {
  title: string;
  fileIds: string[];
}

class Attendance extends Component<Props, State> {
  state = {
    title: "",
    fileIds: []
  };

  render() {
    const { fileIds = [] } = this.state;
    return (
      <ScrollView className="page-attendance">
        <FormItem required title="标题">
          <Input
            id="title"
            className="title-input"
            onInput={e =>
              this.setState({
                title: e.detail.value
              })
            }
            placeholder="请输入今日份的打卡内容哦~"
          />
        </FormItem>
        <FormItem required title="创作">
          <View className="imgs">
            {fileIds.map(filedId => {
              return <Image src={filedId} className="img" />;
            })}
            <View className="img add">
              <AtIcon prefixClass="icon" value="tianjia" />
            </View>
          </View>
        </FormItem>
      </ScrollView>
    );
  }
}

export default Attendance;
