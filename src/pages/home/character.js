import character1 from "../../assets/image/character/character1.jpg";
import character2 from "../../assets/image/character/character2.jpg";
import character3 from "../../assets/image/character/character3.jpg";
import character4 from "../../assets/image/character/character4.jpg";
import character5 from "../../assets/image/character/character5.jpg";

class Character {
  render() {
    let imgs = [character1, character2, character3, character4, character5];
    let titles = ["独具匠心", "格物修身", "尽善尽美", "一丝不苟", "精益求精"];
    const content = imgs.map((val, index) => {
      return `
        <div class="character-item-container">
            <div class="character-item-title">${titles[index]}</div>
            <img class="character-img" src=${val}>
        </div>
        `;
    });

    return `
        <div id="character">
            <div class="character-title">（工匠）焠匠心之火，铸时代之梦</div>
            <div class="character-container">
                ${content.join("")}
            </div>
        </div>  
    `;
  }
}

export default Character;
