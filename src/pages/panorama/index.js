import * as THREE from "three";

import { addCamera, addOrbitControls } from "../../utils/three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

// function main() {
//   // 创建场景
//   const scene = new THREE.Scene();

//   // 创建相机
//   const camera = addCamera(75, 0.1, 1000);
//   camera.position.set(0, 0, 50);
//   scene.add(camera);

//   // 环境光
//   const light = new THREE.AmbientLight(0xffffff, 0.9);
//   scene.add(light);

//   // 实例化加载器
//   const objLoader = new OBJLoader();
//   const textureLoader = new THREE.TextureLoader();

//     function renderModel(modelUrl, textureUrl, position) {
//       const texture = textureLoader.load(textureUrl);
//       objLoader.load(modelUrl, function (object) {
//         // 设置模型缩放
//         object.scale.set(4, 4, 4);
//         // 设置位置
//         object.position.set(position);
//         //贴图
//         object.traverse((child) => {
//           if (child.material) {
//             child.material.map = texture;
//           }
//         });
//         //   console.log(object);
//         scene.add(object);
//       });
//     }

//     renderModel(
//       "./assets/models/model1.obj",
//       "./assets/texture/qhc1.jpg",
//       [0, 0, 0]
//     );

//   // 初始化渲染
//   const renderer = new THREE.WebGL1Renderer();
//   // 设置渲染的尺寸
//   renderer.setSize(window.innerWidth, window.innerWidth);
//   // 将webgl渲染的canvas内容添加到页面中
//   document.getElementById("home-canvas").appendChild(renderer.domElement);

//   // 创建轨道控制器
//   //   const controls = addOrbitControls(camera, renderer.domElement);
//   //   controls.enableDamping = true;

//   // 添加坐标辅助
//   const axeshelper = new THREE.AxesHelper(5);
//   scene.add(axeshelper);

//   function render() {
//     // controls.update();
//     // 使用渲染器，通过相机将场景渲染进去
//     renderer.render(scene, camera);
//     // 渲染下一帧的时候就会调用render函数
//     requestAnimationFrame(render);
//   }

//   render();

//   window.addEventListener("dblclick", () => {
//     if (!document.fullscreenElement) {
//       // 让画布进入全屏
//       renderer.domElement.requestFullscreen();
//     } else {
//       // 退出全屏
//       document.exitFullscreen();
//     }
//   });

//   // 监听画面变化，更新渲染画面
//   window.addEventListener("resize", () => {
//     // 更新摄像头
//     camera.aspect = window.innerWidth / window.innerHeight;
//     // 更新摄像机的投影举证
//     camera.updateMatrix();

//     // 更新渲染器
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     // 设置渲染器的像素比
//     renderer.setPixelRatio(window.devicePixelRatio);
//   });
// }
function main() {
  // 创建场景
  const scene = new THREE.Scene();

  // 创建相机
  const camera = addCamera(75, 0.1, 1000);
  camera.position.set(0, 0, 50);
  scene.add(camera);

  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(light);
  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();
  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load("../../assets/texture/qhc1.jpg");

  // 加载贴图
  mtlLoader.load("../../assets/models/HSM0042.mtl", function (mtl) {
    // console.log(mtl);
    mtl.preload();
    objLoader.setMaterials(mtl);
    // 加载模型
    objLoader.load("./assets/models/model1.obj", function (object) {
      //设置模型缩放比例
      object.scale.set(1, 1, 1);
      object.rotation.set(-Math.PI / 4, 0, 0),
        //设置模型的坐标
        // object.position.set(0, -50, 0);
        //将模型添加到场景中
        object.traverse(function (child) {
          if (child.material) {
            child.material.map = texture;
          }
          // console.log(child);
        });
      scene.add(object);
    });
  });

  // 加载环境贴图
  const envMapTexture = textureLoader.load(
    "./assets/image/chinese-background.jpg"
  );
  let spherGeometry = new THREE.SphereGeometry(500, 50, 50);
  spherGeometry.scale(-1, 1, 1);
  let spherMaterial = new THREE.MeshBasicMaterial({ map: envMapTexture });
  let sphere = new THREE.Mesh(spherGeometry, spherMaterial);
  scene.add(sphere);

  // 初始化渲染
  const renderer = new THREE.WebGL1Renderer();
  // 设置渲染的尺寸
  renderer.setSize(window.innerWidth, window.innerWidth);
  // 将webgl渲染的canvas内容添加到页面中
  document.body.appendChild(renderer.domElement);

  // 添加坐标辅助
  const axeshelper = new THREE.AxesHelper(5);
  scene.add(axeshelper);
  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  function render() {
    controls.update();
    // 使用渲染器，通过相机将场景渲染进去
    renderer.render(scene, camera);
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }

  render();

  window.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
      // 让画布进入全屏
      renderer.domElement.requestFullscreen();
    } else {
      // 退出全屏
      document.exitFullscreen();
    }
  });

  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影举证
    camera.updateMatrix();

    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
}

export default main;
