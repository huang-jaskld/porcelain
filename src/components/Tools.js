import img1 from "../assets/image/tools/tools-1.png";
import img2 from "../assets/image/tools/tools-2.png";
import img3 from "../assets/image/tools/tools-3.png";
import img4 from "../assets/image/tools/tools-4.png";
import img5 from "../assets/image/tools/tools-5.png";
import img6 from "../assets/image/tools/tools-6.png";
import img7 from "../assets/image/tools/tools-7.png";
import img8 from "../assets/image/tools/tools-8.png";
import img9 from "../assets/image/tools/tools-9.png";
import img10 from "../assets/image/tools/tools-10.png";

class Tools {
  constructor() {
    this.images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
    this.introduceWords = [
      "毛笔",
      "塑性木刀",
      "刻刀",
      "带状大扁丝刀",
      "利胚刀",
      "扫灰笔",
      "海绵",
      "带齿刮刀",
      "环形大扁丝刀",
      "瓷工木片",
    ];
  }

  render() {
    return `
        <div id="tools">
            ${this.renderIntroduce()}
            ${this.renderTitle()}
        </div>
    `;
  }

  renderIntroduce() {
    const content = this.introduceWords.map((val, index) => {
      return `
            <div class="tool-introduce-item">
                <img class="tool-introduce-item-img" src=${this.images[index]}>
                <div class="tool-introduce-item-words">${val}</div>
            </div>
        `;
    });

    return `<div class="tools-introduce-container">${content.join("")}</div>`;
  }

  renderTitle() {
    return `
        <div class="tools-title">使用工具</div>
    `;
  }
}

export default Tools;
