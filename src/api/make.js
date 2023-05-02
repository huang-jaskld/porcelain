import { get } from "../utils/http";

class MakeApi {
  static async getProduction() {
    const temp = await get("/getProduction");
    return await temp.json();
  }
}

export default MakeApi;
