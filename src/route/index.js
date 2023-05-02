import History from "../pages/history";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import Pattern from "../pages/pattern";
import Worth from "../pages/worth";
import Make from "../pages/make";

const routes = [
  {
    path: "/home",
    component: new Home(),
  },
  {
    path: "/history",
    component: new History(),
  },
  {
    path: "/make",
    component: new Make(),
  },
  {
    path: "/pattern",
    component: new Pattern(),
  },
  {
    path: "/worth",
    component: new Worth(),
  },
  {
    path: "/404",
    component: new NotFound(),
  },
];

// 路由匹配
const matchRoute = (pathName) => {
  for (const route of routes) {
    const basicPath = route.path;
    if (pathName === basicPath) return route.component;
    // 查询子路由
    if (route.children && judgeStartWith(pathName, basicPath)) {
      return depRoute(pathName, basicPath, route.children);
    }
  }
  return new NotFound();
};

const judgeStartWith = (complete, start) => {
  return complete.startsWith(start);
};

// 递归查询子路由
function depRoute(pathName, basicPath, children) {
  for (const child of children) {
    const newBasicPath = basicPath + "/" + child.path;
    if (newBasicPath === pathName) {
      return child.component;
    }
    if (child.children && judgeStartWith(pathName, newBasicPath)) {
      return depRoute(pathName, newBasicPath, child.children);
    }
  }
  return new NotFound();
}

export default matchRoute;
