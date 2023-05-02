import MakeApi from "../../api/make";
import PageBasic from "../../components/PageBasic";
import angle from "../../assets/image/angle.png";
import Tools from "../../components/Tools";

class Make extends PageBasic {
  constructor() {
    super();
  }
  prepare() {
    window.addEventListener("load", async () => {
      const tempData = await MakeApi.getProduction();
      this.info = tempData.data.production;
      this.currentIndex = 0;
      super.mounted("Make", this.render());
      const directoryContainer = document.querySelector(".make-directory");
      this.directoryItems = directoryContainer.querySelectorAll(
        ".make-directory-item"
      );
      this.makeImgs = document.querySelectorAll(".make-img");
      this.introduces = document.querySelectorAll(".make-introduce-item");
      directoryContainer.addEventListener("click", (e) => {
        // 前
        this.directoryItems[this.currentIndex].classList.remove(
          "make-directory-item-chosed"
        );
        this.makeImgs[this.currentIndex].style.transform = "scale(0)";
        this.introduces[this.currentIndex].style.left = "10px";
        this.introduces[this.currentIndex].style.opacity = "0";
        // 后
        console.log(e.target.dataset.index);
        this.currentIndex = Number(e.target.dataset.index);

        this.directoryItems[this.currentIndex].classList.add(
          "make-directory-item-chosed"
        );
        this.makeImgs[this.currentIndex].style.transform = "scale(1)";
        this.introduces[this.currentIndex].style.left = "0";
        this.introduces[this.currentIndex].style.opacity = "1";
      });
    });
    return this;
  }

  render() {
    return `
        <div id="make">
            ${this.renderContainer()}
        </div>
    `;
  }

  renderContainer() {
    if (!this.info) return "";
    return `
        <div class="make-container">
            ${this.renderDirectory()}
            ${this.renderIntroduce()}
        </div>
    `;
  }

  renderDirectory() {
    const content = this.info.map((val, index) => {
      return `
            <div class="make-directory-item" data-index=${index}>
              <div class="make-directory-order ${
                index === 0 ? "make-directory-item-chosed" : ""
              }" >${index + 1}</div>
              <div class="make-directory-name">《${val.name}》</div>
            </div>
        `;
    });
    return `
        <div class="make-directory">
            <div class="make-directory-title">制作工艺流程</div>
            ${content.join("")}
        </div>
    `;
  }

  renderIntroduce() {
    const imgsContent = this.info.map((val, index) => {
      return `
        <div class="make-img-item">
          <img class="make-img" style=${
            index === 0 ? "transform:scale(1)" : "transform:scale(0)"
          }  src=${val.url}>   
        </div>
      `;
    });

    const wordsContent = this.info.map((val, index) => {
      return `
        <div class="make-introduce-item" style="${
          index === 0 ? "opacity: 1;top:0px" : ""
        }">
          <div class="make-introduce-title" >${val.name}</div>  
          <div class="make-introduce-words">
            ${val.introduce}
          </div>
        </div>
      `;
    });

    return `
        <div class="make-right">
          <img class="angle1" src=${angle}>
          <img class="angle2" src=${angle}>
          <img class="angle3" src=${angle}>
          <img class="angle4" src=${angle}>
          <div class="make-right-top">
            <div class="make-imgs-container">
              ${imgsContent.join("")}
            </div>
            <div class="make-introduce-container">
              ${wordsContent.join("")}
            </div>
          </div>
          <div class="make-right-bottom">
            ${new Tools().render()}
          </div>
        </div>
    `;
  }
}

export default Make;
