import PatternApi from "../../api/pattern";
import PageBasic from "../../components/PageBasic";

class Pattern extends PageBasic {
  constructor() {
    super();
    this.info = null;
  }

  prepare() {
    window.addEventListener("load", async (event) => {
      PatternApi.getAllFigures().then((allFigures) => {
        this.info = allFigures.data.figures;
        super.mounted("Pattern", this.render());
        this.items = document.querySelectorAll(".pattern-left-item");
        this.entityImg = document.querySelectorAll(".pattern-right-entity-img");
        this.patternRightTitle = document.querySelectorAll(
          ".pattern-right-title-item"
        );
        this.introduce = document.querySelectorAll(
          ".pattern-right-introduce-item"
        );
        this.start();
      });
    });
    return this;
  }

  render() {
    return `
        <div id="pattern">
            <div class="pattern-container">
              ${this.renderLeft()}   
              ${this.renderRight()}
            </div>
        </div>
    `;
  }

  renderLeft() {
    if (!this.info) return "";
    let self = this;
    function renderImgs() {
      if (!self.info) return "";
      const content = self.info.map((val, index) => {
        return `
            <div class="pattern-left-item ${
              index === 0 ? "pattern-item--selected" : ""
            }" style="transform:rotate(${(index + 1) * 60 + 45}deg);">
                <img class="pattern-left-item-img"  src=${val.figureUrl}>
            </div>
        `;
      });
      return content;
    }
    return `
        <div class="pattern-left">
            ${renderImgs().join("")}
        </div>
    `;
  }

  renderRight() {
    if (!this.info) return "";
    return `
        <div class="pattern-right">
            <div class="pattern-right-entity">
                <img class="pattern-right-entity-img" style="opacity:1;" src=${this.info[0].entityUrl}> 
                <img class="pattern-right-entity-img" src=${this.info[1].entityUrl}> 
                <img class="pattern-right-entity-img" src=${this.info[2].entityUrl}> 
                <img class="pattern-right-entity-img" src=${this.info[3].entityUrl}> 
                <img class="pattern-right-entity-img" src=${this.info[4].entityUrl}> 
                <img class="pattern-right-entity-img" src=${this.info[5].entityUrl}> 
            </div>
            <div class="pattern-right-words">
                <div class="pattern-right-title">
                  <div class="pattern-right-title-item" style="opacity:1;">${this.info[0].name}</div>
                  <div class="pattern-right-title-item">${this.info[1].name}</div>
                  <div class="pattern-right-title-item">${this.info[2].name}</div>
                  <div class="pattern-right-title-item">${this.info[3].name}</div>      
                  <div class="pattern-right-title-item">${this.info[4].name}</div>
                  <div class="pattern-right-title-item">${this.info[5].name}</div>
                </div>
                <div class="pattern-right-introduce">
                  <div class="pattern-right-introduce-item" style="opacity:1;">
                    ${this.info[0].introduce}
                  </div>
                  <div class="pattern-right-introduce-item">
                    ${this.info[1].introduce}
                  </div>
                  <div class="pattern-right-introduce-item">
                    ${this.info[2].introduce}
                  </div>
                  <div class="pattern-right-introduce-item">
                    ${this.info[3].introduce}
                  </div>
                  <div class="pattern-right-introduce-item">
                    ${this.info[4].introduce}
                  </div>
                  <div class="pattern-right-introduce-item">
                    ${this.info[5].introduce}
                  </div>
                </div>
            </div>
        </div>
    `;
  }

  // 获取到选中的节点
  getCurrentItem() {
    for (let i = 0; i < this.items.length; i++) {
      let el = this.items[i];
      // console.log(el);
      if (el.classList.contains("pattern-item--selected")) {
        return el;
      }
    }
  }

  // 获取到选中节点的下标
  getCurrentIndex() {
    return Array.from(this.items).indexOf(this.getCurrentItem());
  }

  slideTo(idx) {
    const selected = this.getCurrentItem();
    selected && (selected.className = "pattern-left-item");

    const item = this.items[idx];
    item && (item.className = "pattern-left-item pattern-item--selected");
    console.log(this.items);
    // 修改信息
    for (let i = 0; i < this.entityImg.length; i++) {
      if (i === idx) {
        this.entityImg[i].style.opacity = 1;
        this.entityImg[i].style.top = 0;
        this.patternRightTitle[i].style.opacity = 1;
        this.introduce[i].style.opacity = 1;
      } else {
        this.entityImg[i].style.opacity = 0;
        this.entityImg[i].style.top = "10px";
        this.patternRightTitle[i].style.opacity = 0;
        this.introduce[i].style.opacity = 0;
      }
      const oldDeg = Number(this.items[i].style.transform.match(/[0-9]+/g)[0]);
      console.log(oldDeg + 60);
      if ((oldDeg + 60) % 360 === 105) {
        this.items[i].classList.add("pattern-left-item--chosed");
      } else {
        this.items[i].classList.remove("pattern-left-item--chosed");
      }
      this.items[i].style.transform = `rotate(${oldDeg + 60}deg)`;
    }
  }

  // 下一个
  next() {
    const currentIndex = this.getCurrentIndex();
    const nextIndex = (currentIndex + 1) % this.items.length;
    this.slideTo(nextIndex);
  }

  start() {
    this.timer = setInterval(() => this.next(), 3000);
  }

  stop() {
    this.count = 0;
    clearInterval(this.timer);
  }
}

export default Pattern;
