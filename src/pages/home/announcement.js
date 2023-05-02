class Announcement {
  prepare() {
    return this;
  }
  constructor(info) {
    this.info = info;
  }

  renderLeftItem = () => {
    const content = this.info.map((val, index) => {
      return `
            <div class="announcement-left-item">
                <p data-index=${index}>${val.title}</p>
            </div>
        `;
    });

    return `${content.join("")}`;
  };

  renderRightItem = () => {
    const content = this.info.map((val, index) => {
      return `
        <div class="announcement-right-item">
          <p class="announcement-right-item-introduce">${val.introduce}</p>
        </div>
      `;
    });

    return `${content.join("")}`;
  };
  render() {
    return `
            <div id="announcement">
                <div class="announcement-left">
                    <h1 style="margin-bottom:20px;">公告|</h1>
                    <div class="announcement-left-content">
                        ${this.renderLeftItem()}
                    </div>
                    
                </div>
                <div class="announcement-right">
                    ${this.renderRightItem()}
                </div>
            </div>
        `;
  }
}

export default Announcement;
