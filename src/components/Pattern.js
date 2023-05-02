import img1 from "../assets/image/pattern/patter-img1.png";
import img2 from "../assets/image/pattern/patter-img2.png";
import img3 from "../assets/image/pattern/patter-img3.png";
import img4 from "../assets/image/pattern/patter-img4.png";
import img5 from "../assets/image/pattern/patter-img5.png";
import img6 from "../assets/image/pattern/patter-img6.png";
import img7 from "../assets/image/pattern/patter-img7.png";
import img8 from "../assets/image/pattern/patter-img8.png";

class Pattern {
  constructor() {}

  render() {
    return `
            <div id="pattern">
                ${this.renderTitle()}
                ${this.renderIntroduce()}
            </div>
        `;
  }

  // 渲染标题
  renderTitle() {
    return `
        <div class="pattern-title">
            <div class="pattern-title-item">花</div>
            <div class="pattern-title-item">纹</div>
            <div class="pattern-title-item">样</div>
            <div class="pattern-title-item">式</div>
        </div>
    `;
  }

  // 渲染花纹样式介绍
  renderIntroduce() {
    return `
    <div class="pattern-introduce">

        <div class="pattern-introduce-row">
            <div class="pattern-introduce-innercontainer">
                <img class="pattern-introduce-img" src=${img1}>
                <div class="pattern-introduce-words">福寿善庆纹</div>
            </div>
            <div class="pattern-introduce-innercontainer">
                <img class="pattern-introduce-img" src=${img2}>
            </div>
        </div>
        <div class="pattern-introduce-row">
            <div class="pattern-introduce-innercontainer">
                <img class="pattern-introduce-img" src=${img3}>
            </div>
            <div class="pattern-introduce-innercontainer">
                <img class="pattern-introduce-img" src=${img4}>
            </div>
            <div class="pattern-introduce-innercontainer">
                <img class="pattern-introduce-img" src=${img5}>
            </div>
        </div>
        <div class="pattern-introduce-row">
            <div class="pattern-introduce-innercontainer">
                <img class="pattern-introduce-img" src=${img6}>
            </div>
            <div class="pattern-introduce-innercontainer">
                <img class="pattern-introduce-img" src=${img7}>
            </div>
        </div>
    </div>
    `;
  }

  // 渲染路线
  renderPath() {
    return `
    <svg class="pattern-svg">
        <path d="M 0 0 q 50 100 190 190" stroke="blue"
        stroke-width="5" fill="none" />
    </svg>
    `;
  }
}

export default Pattern;
