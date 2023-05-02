import icon from "../assets/image/icon.png";

class Header {
  /**
   * Header组件props
   * @param {Object} logo logo图片
   * @param {Array<Object>} functionModules 功能模块
   * @param {String} extra 额外的内容元素
   */
  constructor(logo, functionModules, extra = "") {
    this.logo = logo;
    this.functionModules = functionModules;
    this.extra = extra;
  }

  render() {
    return `
    <div id="header">
        ${this.renderLogo()}
        ${this.renderNav()}
    </div>`;
  }

  renderLogo() {
    const info = this.logo;
    return `
    <a href="/home">
      <img id="header-logo" src=${icon} style="width:${info.width}px;height:${info.height}px"></img>
    </a>`;
  }

  renderNav() {
    const content = this.functionModules.map((item) => {
      return `
            <div>
                <a href=${item.url}>${item.name}</a>
                <div>
                </div>
            </div>
        `;
    });
    return `${content.join("")}`;
  }
}

export default Header;
