import * as THREE from "three";

import { addCamera, addOrbitControls } from "../../utils/three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

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

  // 模型一
  let obj1;
  // 加载贴图
  mtlLoader.load("./assets/obj1/file.mtl", function (mtl) {
    // console.log(mtl);
    mtl.preload();
    objLoader.setMaterials(mtl);
    // 加载模型
    objLoader.load("./assets/obj1/file.obj", function (object) {
      obj1 = object;
      //设置模型缩放比例
      object.scale.set(0.08, 0.08, 0.08);

      // object.rotation.set(-Math.PI / 4, 0, 0),
      //设置模型的坐标
      object.position.set(-45, -10, 0);
      //将模型添加到场景中
      const texture = textureLoader.load("./assets/texture/qhc2.jpg");
      object.traverse(function (child) {
        if (child.material) {
          child.material.map = texture;
          child.material.color.set("#ffffff");
        }
        // console.log(child);
      });
      scene.add(object);
    });
  });

  // 模型二
  let obj2;
  // 加载贴图
  mtlLoader.load("./assets/obj2/file.mtl", function (mtl) {
    // console.log(mtl);
    mtl.preload();
    objLoader.setMaterials(mtl);
    // 加载模型
    objLoader.load("./assets/obj2/file.obj", function (object) {
      console.log("obj2", object);
      obj2 = object;
      //设置模型缩放比例
      object.scale.set(0.08, 0.08, 0.08);
      //设置模型的坐标
      object.position.set(45, -10, 0);
      let texture1 = textureLoader.load("./assets/texture/qhc3-1.jpg");
      let texture2 = textureLoader.load("./assets/texture/qhc3-2.jpg");
      scene.add(object);
      //将模型添加到场景中
      object.traverse(function (child) {
        if (child.material) {
          // console.log("1111", child);
          child.material.map = texture2;
          // if (child.name.startsWith("Shape")) {
          //   child.material.map = texture1;
          // } else {
          //   child.material.map = texture2;
          // }
        }
      });
      console.log(object);
    });
  });

  // 模型三
  let obj3;
  mtlLoader.load("./assets/obj3/file.mtl", function (mtl) {
    // console.log(mtl);
    mtl.preload();
    objLoader.setMaterials(mtl);
    // 加载模型
    objLoader.load("./assets/obj3/file.obj", function (object) {
      obj3 = object;
      //设置模型缩放比例
      object.scale.set(0.08, 0.08, 0.08);
      //设置模型的坐标
      object.position.set(35, -10, -80);
      let texture3 = textureLoader.load("../../assets/texture/qhc1.jpg");
      //将模型添加到场景中
      object.traverse(function (child) {
        if (child.material) {
          child.material.map = texture3;
          child.material.color.set("#ffffff");
        }
      });
      scene.add(object);
    });
  });

  let obj4;
  mtlLoader.load("./assets/obj4/file.mtl", function (mtl) {
    // console.log(mtl);
    mtl.preload();
    objLoader.setMaterials(mtl);
    // 加载模型
    objLoader.load("./assets/obj4/file.obj", function (object) {
      console.log("obj4", object);
      // obj4 = object;
      //设置模型缩放比例
      object.scale.set(0.08, 0.08, 0.08);
      //设置模型的坐标
      object.position.set(-35, -10, -80);
      let texture4 = textureLoader.load("./assets/texture/qhc4-1.jpg");
      let texture5 = textureLoader.load("./assets/texture/qhc4-2.jpg");
      // //将模型添加到场景中
      object.traverse(function (child) {
        if (child.material) {
          child.material.map = texture4;
          child.material.color.set("#ffffff");
        }
        // console.log("2222", child.name);
      });
      scene.add(object);
    });
  });

  // 初始化渲染
  const renderer = new THREE.WebGL1Renderer({ alpha: true, antialias: true });
  // 设置渲染的尺寸
  renderer.setSize(1688, 713.6);
  // 将webgl渲染的canvas内容添加到页面中
  document.getElementById("home-canvas").appendChild(renderer.domElement);
  // document.getElementById("home").appendChild(render.domElement);

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  let clock = new THREE.Clock();
  function render() {
    controls.update();
    let time = clock.getElapsedTime();
    camera.position.z -= time * 0.03;
    // if (obj1 & obj2 & obj3) {
    //   obj1.rotation.y = time * 0.3;
    //   obj2.rotation.y = time * 0.3;
    //   obj3.rotation.y = time * 0.3;
    // }

    // 使用渲染器，通过相机将场景渲染进去
    renderer.render(scene, camera);
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }

  render();

  // window.addEventListener("dblclick", () => {
  //   if (!document.fullscreenElement) {
  //     // 让画布进入全屏
  //     renderer.domElement.requestFullscreen();
  //   } else {
  //     // 退出全屏
  //     document.exitFullscreen();
  //   }
  // });

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
