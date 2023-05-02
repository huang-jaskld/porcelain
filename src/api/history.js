import { get } from "../utils/http";

class HistoryApi {
  static async getPublicPicture() {
    const temp = await get("/getPublicPicture");
    return await temp.json();
  }

  // 唐
  static async getTangContentPicture() {
    const temp = await get("/getTangContentPicture");
    return await temp.json();
  }

  // 宋
  static async getSongContentPicture() {
    const temp = await get("/getSongContentPicture");
    return await temp.json();
  }

  // 元
  static async getYuanContentPicture() {
    const temp = await get("/getYuanContentPicture");
    return await temp.json();
  }

  // 明
  static async getMingContentPicture() {
    const temp = await get("/getMingContentPicture");
    return await temp.json();
  }

  // 清
  static async getQingContentPicture() {
    const temp = await get("/getQingContentPicture");
    return await temp.json();
  }
}

export default HistoryApi;
