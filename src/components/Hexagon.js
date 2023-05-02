class Hexagon {
  constructor(imgUrl, height, width) {
    this.imgUrl = imgUrl;
    this.style = `height:${height}px;width:${width}px;`;
  }
  render() {
    return `
            <div class="hexagon-box1" style=${this.style}>
                <div class="hexagon-box2" style=${this.style}>
                    <div class="hexagon-box3" style=${this.style}>
                        <img style="width:100%;height:100%" src=${this.imgUrl}>
                    </div>
                </div>
            </div>
        `;
  }
}

export default Hexagon;
