class Swiper {
  /**
   * Swiper组件props
   * @param {Array<String>} imgs
   */
  constructor(id, imgs, cycle = 3000) {
    this.id = id;
    this.imgs = imgs;
    this.cycle = cycle;
  }

  render() {
    return `
        <div id=${this.id} class="slider-list">
            ${this.renderImgs()}
        </div>
    `;
  }

  // 渲染结束后调用，用于获取组件节点
  preload() {
    this.container = document.getElementById(this.id);
    // console.log(this.container);
    this.items = this.container.querySelectorAll(
      ".slider-list_item, .slider-list_item--selected"
    );
  }

  // 渲染图片
  renderImgs() {
    const content = this.imgs.map((imgUrl, index) => {
      return `
            <li class=${
              index === 0 ? "slider-list_item--selected" : "slider-list_item"
            }>
                <img src="${imgUrl}"/>
            </li>
        `;
    });
    return `<ul>${content.join("")}</ul>`;
  }

  // 加载插件
  registerPlugins(...plugins) {
    plugins.forEach((plugin) => {
      const pluginContainer = document.createElement("div");
      pluginContainer.className = "slider-list_plugin";
      pluginContainer.innerHTML = plugin.render(this.imgs);
      // console.log("记载插件", this);
      this.container.appendChild(pluginContainer);

      plugin.action(this);
    });
  }

  slideTo(idx) {
    const selected = this.getSelectedItem();
    selected && (selected.className = "slider-list_item");

    const item = this.items[idx];
    item && (item.className = "slider-list_item--selected");

    const detail = { index: idx };
    const event = new CustomEvent("slide", { bubbles: true, detail: detail });
    this.container.dispatchEvent(event); // 发起自定义事件
  }

  // 滑动到下一张图
  slideNext() {
    const currentIndex = this.getSelectedIndex();
    // console.log(currentIndex);
    const nextIndex = (currentIndex + 1) % this.items.length;
    this.slideTo(nextIndex);
  }

  // 滑动到上一张图
  slidePre() {
    const currentIndex = this.getSelectedItemIndex();
    const previousIndex =
      (this.items.length + currentIndex - 1) % this.items.length;
    this.slideTo(previousIndex);
  }

  // 获取选中的节点
  getSelectedItem() {
    const selected = this.container.querySelector(
      ".slider-list_item--selected"
    );
    return selected;
  }

  // 获取选中节点的下标
  getSelectedIndex() {
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }

  // 开始轮播
  start() {
    this.stop();
    this.timer = setInterval(() => this.slideNext(), this.cycle);
  }

  // 停止轮播
  stop() {
    clearInterval(this.timer);
  }
}

const pluginController = {
  render(imgs) {
    return `
      <div class="slide-list_control">
        ${imgs
          .map(
            (image, i) => `
            <span class="slide-list_control-buttons${
              i === 0 ? "--selected" : ""
            }"></span>
        `
          )
          .join("")}
      </div> 
    `.trim();
  },
  action(slider) {
    const controller = slider.container.querySelector(".slide-list_control");

    if (controller) {
      const buttons = controller.querySelectorAll(
        ".slide-list_control-buttons, .slide-list_control-buttons--selected"
      ); // 获取所有的控制点
      // 鼠标经过时停止
      controller.addEventListener("mouseover", (event) => {
        const target = event.target;
        const index = Array.from(buttons).indexOf(target); // 获取到下标
        if (index >= 0) {
          slider.slideTo(index);
          slider.stop();
        }
      });

      // 鼠标移出时开始轮播
      controller.addEventListener("mouseout", (event) => {
        slider.start();
      });

      // 监听自定义事件，修改小圆点的状态
      slider.container.addEventListener("slide", (event) => {
        const { index } = event.detail;
        const selected = controller.querySelector(
          ".slide-list_control-buttons--selected"
        );
        if (selected) selected.className = "slide-list_control-buttons";
        buttons[index].className = "slide-list_control-buttons--selected";
      });
    }
  },
};

export default Swiper;

export { pluginController };
