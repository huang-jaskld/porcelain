import { get } from "../utils/http";

class HomeAPI {
  static async getSwiper() {
    const temp = await get("/findAllPicturesUrl");
    return await temp.json();
  }

  static async getIntroduce() {
    const temp = await get("/getIntroduce");
    return await temp.json();
  }
}

export default HomeAPI;
