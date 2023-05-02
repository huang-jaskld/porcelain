import WorthApi from "../../api/worth";
import PageBasic from "../../components/PageBasic";

class Worth extends PageBasic {
  constructor() {
    super();
  }

  prepare() {
    window.addEventListener("load", async () => {
      const tempData = await WorthApi.getValueCollection();
      this.info = tempData.data.valueCollection;

      const container = document.getElementById("worth");
      window.addEventListener("wheel", (event) => {
        container.scrollLeft += event.deltaY;
      });
      super.mounted("Worth", this.render());
    });
    return this;
  }
  render() {
    return `
            <div id="worth">
                <div class="worth-title"></div>
                <div class="worth-innercontainer">
                  <div class="worth-row">
                    ${this.renderItem()}
                  </div>
                  <div class="worth-row">
                  ${this._renderItem()}
                </div>
                </div>
            </div>
        `;
  }

  renderItem() {
    if (!this.info) return "";
    const traversalData = this.info.splice(0, 4);
    const content = traversalData.map((val) => {
      return `
        <div class="item">
          <img class="item-img" src=${val.url}>
          <div>
            <div class="name">${val.name}</div>
            <div class="introduce">${val.introduce}</div>
          </div>
        </div>
      `;
    });
    return content.join("");
  }

  _renderItem() {
    if (!this.info) return "";
    const content = this.info.map((val) => {
      return `
        <div class="item">
          <img class="item-img" src=${val.url}>
          <div>
            <div class="name">${val.name}</div>
            <div class="introduce">${val.introduce}</div>
          </div>
        </div>
      `;
    });
    return content.join("");
  }
}

export default Worth;
