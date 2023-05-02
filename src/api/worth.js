import { get } from "../utils/http";

class WorthApi {
  static async getValueCollection() {
    const temp = await get("/getValueCollection");
    return await temp.json();
  }
}

export default WorthApi;
