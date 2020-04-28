import Taro, { Component } from "@tarojs/taro";
import { View, Input, Image, Button } from "@tarojs/components";
import { FormItem, IconFont } from "@/components";
import colors from "@/style/constants";
import { getUserInfo, uuid, request } from "@/utils";

import "./style.less";

interface Props {}

interface State {
  title: string;
  file: string;
  errors: {
    title: boolean;
    file: boolean;
  };
}

class Attendance extends Component<Props, State> {
  state = {
    title: "",
    file: "",
    errors: {
      title: false,
      file: false
    }
  };

  fileID: string = ""; // 上传后的文件id

  onChooseImage = async () => {
    const { tempFilePaths } = await Taro.chooseImage({
      sizeType: ["compressed"],
      count: 1
    });

    this.setState({
      file: tempFilePaths[0]
    });
  };

  previewImage = path => {
    const { file } = this.state;

    Taro.previewImage({
      current: path,
      urls: [file]
    });
  };

  onDeleteImage = async e => {
    e.stopPropagation();

    const { confirm } = await Taro.showModal({ title: "确认删除吗？" });
    if (confirm) {
      this.setState({
        file: ""
      });
    }
  };

  validate = () => {
    const { title, file } = this.state;
    this.setState({
      errors: {
        title: !title,
        file: !file
      }
    });
    if (!title) return { valid: false, message: "标题没有填哦" };
    if (!file) return { valid: false, message: "今天的创作跑哪里去啦" };
    if (title.length > 120)
      return { valid: false, message: "标题不能超过120个字" };
    return { valid: true };
  };

  uploadImage = async () => {
    const { file } = this.state;
    const info = await getUserInfo();
    const cloudPath = uuid(info) + "." + file.split(".").pop();
    const { fileID, statusCode, errMsg } = await Taro.cloud.uploadFile({
      cloudPath,
      filePath: file
    });
    if (statusCode != 200) throw errMsg;
    this.fileID = fileID;
  };

  clearForm = () => {
    this.setState({
      title: "",
      file: "",
      errors: {
        title: false,
        file: false
      }
    });
    this.fileID = "";
  };

  onSubmit = async () => {
    const { valid, message } = this.validate();
    if (!valid) {
      Taro.showToast({
        title: message!,
        icon: "none"
      });
      return;
    }
    try {
      const { title } = this.state;
      await this.uploadImage();
      await request("attendance/attend", {
        title,
        file: this.fileID
      });
      Taro.showToast({
        title: "打卡成功",
        icon: "success"
      });
      this.clearForm();
      Taro.navigateBack();
    } catch (err) {
      console.error(err);
      Taro.showToast({
        title: err,
        icon: "none"
      });
    }
  };

  render() {
    const { file, errors } = this.state;

    return (
      <View className="page-attendance">
        <FormItem required title="标题" error={errors.title}>
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
        <FormItem required title="创作" error={errors.file}>
          <View className="imgs">
            {file ? (
              <View className="img choosen" onClick={this.previewImage}>
                <Image src={file} mode="aspectFill" />
                <View className="delete" onClick={this.onDeleteImage}>
                  <IconFont name="shanchu" size={30} color="#DC143C" />
                </View>
              </View>
            ) : (
              <View className="img add" onClick={this.onChooseImage}>
                <IconFont name="tianjia" color={colors.BLANK_COLOR} size={40} />
              </View>
            )}
          </View>
        </FormItem>
        <View className="action-area">
          <Button className="btn submit-btn" onClick={this.onSubmit}>
            提交
          </Button>
        </View>
      </View>
    );
  }
}

export default Attendance;
