import matchRoute from "../route";

class PageBasic {
  mounted(name, innerHTML) {
    const el = document.querySelector("main");
    // 路由与组件进行匹配
    if (matchRoute(location.pathname).__proto__.constructor.name == name) {
      el.innerHTML = innerHTML;
    }
  }
}

export default PageBasic;
