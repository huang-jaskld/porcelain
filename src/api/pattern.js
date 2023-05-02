import { get } from "../utils/http";

class PatternApi {
  static async getAllFigures() {
    const temp = await get("/findAllFigures");
    return await temp.json();
  }
}

export default PatternApi;
