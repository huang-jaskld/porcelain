import HistoryApi from "../../api/history";
import Hexagon from "../../components/Hexagon";
import PageBasic from "../../components/PageBasic";
import cloud from "../../assets/image/history-cloud.png";
import { throttle } from "../../utils";

class History extends PageBasic {
  constructor() {
    super();
  }

  prepare() {
    window.addEventListener("load", async (event) => {
      const publicData = await HistoryApi.getPublicPicture();
      const tangData = await HistoryApi.getTangContentPicture();
      const songData = await HistoryApi.getSongContentPicture();
      const yuanData = await HistoryApi.getYuanContentPicture();
      const mingData = await HistoryApi.getMingContentPicture();
      const qingData = await HistoryApi.getQingContentPicture();
      this.publicPicture = publicData.data.public[0].url || null; // 标题图片
      this.partOneData = [tangData.data, songData.data, yuanData.data];
      this.partTwoData = qingData.data;
      this.partThreeData = mingData.data;
      super.mounted("History", this.render());
      this.scrollElements = document.querySelectorAll(".scroll-container");
      const handle = throttle(this.handleScrollAnimation, 250);
      window.addEventListener("scroll", () => {
        handle();
      });
    });
    return this;
  }

  render() {
    return `
            <div id="history">
                <div class="history-content">
                    ${this.renderContentOne()}
                    ${this.renderContentThree(this.partThreeData)}
                    ${this.renderContentTwo(this.partTwoData)}
                </div>
            </div>
        `;
  }

  // 元素是否在页面中
  elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) *
        (percentageScroll / 100)
    );
  };

  // 添加类名
  displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  // 删除类名
  hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };

  handleScrollAnimation = (scrollElements) => {
    console.log(this.scrollElements);
    this.scrollElements.forEach((el) => {
      if (this.elementInView(el, 100)) {
        this.displayScrollElement(el);
      } else {
        this.hideScrollElement(el);
      }
    });
  };

  renderTitle(title) {
    return `
    <div class="history-item-title">
      <img class="history-item-title-decoration-one" src=${this.publicPicture} />
      <p class="history-item-title-detail">${title}</p>
      <img class="history-item-title-decoration-two" src=${this.publicPicture} />
    </div>
    `;
  }

  renderContentOne() {
    if (!this.partOneData) return "";
    const content = this.partOneData.map((val, index) => {
      return this.renderContentOneItem(val, index);
    });
    return `${content.join("")}`;
  }

  renderContentOneItem(itemInfo, index) {
    return `
      <div class="scroll-container ${index === 0 ? "scrolled" : ""}">
        <div class="history-item-container" style="${
          index % 2 === 1 ? "flex-direction: row-reverse;" : ""
        }">
            <div class="history-item-entity">
              <img class="history-item-entity-one ${
                index % 2 === 0 ? "slide-left" : "slide-right"
              }" src=${itemInfo.picture[0].url}>
            </div>
            <div class="history-item-right fade-in-bottom">
              ${this.renderTitle(itemInfo.content[0].title)}
              <div class="history-item-introduce">
                ${itemInfo.content[0].introduce}
              </div>
              ${
                itemInfo.picture[1]
                  ? `
                <div class="second-img">
                  <img src=${itemInfo.picture[1].url}>
                </div>        
              `
                  : ""
              }
            </div>
        </div>
        <div class="cloud-container" style=transform:rotateY(${
          index % 2 === 0 ? "180deg" : "0deg"
        })>
            <img class="cloud" src=${cloud}>
        </div>
      </div>
    `;
  }

  renderContentThree(info) {
    if (!info) return "";
    return `
    <div class="scroll-container">
      <div class="history-three-item-container fade-in">
        <div class="history-three-item-left">
          <img src=${info.picture[0].url}>
        </div>
        <div class="history-three-item-right">
          <div class="history-three-item-right-top">
            ${new Hexagon(info.picture[1].url, 200, 200).render()}
            ${this.renderTitle(info.content[0].title)}
          </div>
          <div class="history-three-item-right-bottom">
            ${new Hexagon(info.picture[2].url, 200, 200).render()}
            ${new Hexagon(info.picture[3].url, 200, 200).render()}
            ${new Hexagon(info.picture[4].url, 200, 200).render()}
          </div>
        </div>
      </div>
    </div>
    `;
  }

  renderContentTwo(info) {
    if (!info) return "";
    return `
    <div class="scroll-container">
      <div class="history-two-item-container fade-in">
        <div class="history-two-item-top">
          <img style="width:27%" src=${info.picture[0].url}>
          ${this.renderTitle(info.content[0].title)}
        </div>
        <div class="history-two-item-bottom">
          <div class="history-two-item-bottom-container">
            <img class="history-two-item-bottom-img" src=${
              info.picture[1].url
            }>          
            <div class="pop-up">${info.picture[1].introduce}</div>
          </div>
          <div class="history-two-item-bottom-container">
            <img class="history-two-item-bottom-img" src=${
              info.picture[2].url
            }>          
            <div class="pop-up">${info.picture[2].introduce}</div>
          </div>
          <div class="history-two-item-bottom-container">
            <img class="history-two-item-bottom-img" src=${
              info.picture[3].url
            }>          
            <div class="pop-up">${info.picture[3].introduce}</div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

export default History;
