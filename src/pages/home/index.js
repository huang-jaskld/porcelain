import Swiper, { pluginController } from "../../components/Swiper";
import main from "./canvas";
import { get } from "../../utils/http";
import Announcement from "./announcement";
import Character from "./character";
import PageBasic from "../../components/PageBasic";
import HomeAPI from "../../api/home";

class Home extends PageBasic {
  prepare() {
    return this;
  }

  render() {
    const swiper = new Swiper(
      "slider",
      [
        "https://lc2909014708.oss-cn-hangzhou.aliyuncs.com/lunbo4.jpg",
        "https://lc2909014708.oss-cn-hangzhou.aliyuncs.com/lunbo.jpg",
      ],
      6000
    );

    window.addEventListener("load", async (event) => {
      swiper.preload();
      swiper.registerPlugins(pluginController);
      swiper.start();
      let tempData = await HomeAPI.getIntroduce();
      this.announcementData = tempData.data.introduce;
      super.mounted("Home", this.render());
      main();
      // Announcement公告元素
      this.left = document.querySelector(".announcement-left-content");
      this.rightItems = document.querySelectorAll(".announcement-right-item");
      // console.log(right);
      this.left.addEventListener("click", (e) => {
        const currentIndex = Number(e.target.dataset.index);
        for (let i = 0; i < this.rightItems.length; i++) {
          if (currentIndex === i) {
            this.rightItems[i].style.opacity = "1";
          } else {
            this.rightItems[i].style.opacity = "0";
          }
        }
      });
    });
    return `
        <div id="home">
          ${swiper.render()}
          ${new Announcement(this.announcementData || []).prepare().render()}
          ${new Character().render()}
          <div id="home-canvas"></div>
        </div>
        `;
  }
}

export default Home;
