import Header from "./components/Header";
import Footer from "./components/Footer";
// 路由
import matchRoute from "./route";
import Home from "./pages/home";

let header = document.querySelector("header");
let footer = document.querySelector("footer");
let main = document.querySelector("main");

header.innerHTML = new Header(
  {
    url: "https://developer.mozilla.org/static/media/theme-os-default.b14255eadab403fa2e8a.svg",
    width: 25,
    height: 25,
  },
  [
    {
      name: "起源与发展",
      url: "/history",
    },
    {
      name: "纹理样式",
      url: "/pattern",
    },
    {
      name: "制作工艺流程",
      url: "/make",
    },
    {
      name: "价值和收藏",
      url: "/worth",
    },
  ]
).render();

main.innerHTML = matchRoute(location.pathname).prepare().render();
// main.innerHTML = new Home().render();

// footer.innerHTML = new Footer().render();

// window.addEventListener("click", (e) => {
//   console.log(e);
// });
