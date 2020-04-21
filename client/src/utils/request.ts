import Taro from "@tarojs/taro";

type Request = <T>(url: string, data?: { [param: string]: any }) => Promise<T>;

const request: Request = async (url, data = {}) => {
  try {
    const res = await Taro.cloud.callFunction({
      name: "main",
      data: {
        $url: url,
        ...data
      }
    });
    // @ts-ignore
    if (res.result.code === 0) {
      // @ts-ignore
      return res.result.data as T;
    }
    // @ts-ignore
    throw res.result.message;
  } catch (err) {
    throw err;
  }
};

export default request;
