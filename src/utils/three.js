import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 *
 * @param {*} fov
 * @param {*} near
 * @param {*} far
 * @returns 相机
 */
const addCamera = (fov, near, far) => {
  const camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / window.innerHeight,
    near,
    far
  );
  return camera;
};

/**
 * 添加轨道控制器
 * @param {*} camera 相机
 * @param {*} renderer 渲染器
 * @returns controls  控制器
 */
const addOrbitControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  return controls;
};

export { addCamera, addOrbitControls };
