// import {
//   BoxBufferGeometry,
//   Color,
//   DoubleSide,
//   Mesh,
//   MeshPhongMaterial,
//   PerspectiveCamera,
//   PlaneGeometry,
//   Scene,
//   ShaderMaterial,
//   TubeGeometry,
//   Vector3,
//   WebGLRenderer,
// } from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// import { createCamera } from "./threejs-helpers/camera";
// import { createScene } from "./threejs-helpers/scene";
// import { createRenderer } from "./threejs-helpers/renderer";
// import { Path3 } from "./Path3";

// let camera: THREE.PerspectiveCamera;
// let renderer: THREE.WebGLRenderer;
// let scene: THREE.Scene;

function main() {
  const container: HTMLDivElement = document.querySelector("#scene-container")!;

  // camera = createCamera();
  // renderer = createRenderer();
  // scene = createScene();

  // container.append(renderer.domElement);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  // const ambientLight = new THREE.AmbientLight(0x404040);
  const ambientLight = new THREE.AmbientLight(0x999999);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight.position.set(0, 1, 0);
  scene.add(ambientLight);
  scene.add(directionalLight);

  const light1 = new THREE.PointLight(0xffffff, 0.2, 0);
  light1.position.set(0, 200, 0);
  scene.add(light1);

  // Function to create gradient texture
  function createGradientTexture(color1, color2) {
    // Create canvas
    var canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 2;

    // Get context
    var context = canvas.getContext("2d");

    // Create gradient
    var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    // Apply gradient to context
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Create texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;
  }

  // Create gradient materials
  const materialOne = new THREE.MeshPhongMaterial({
    map: createGradientTexture("#ff8c94", "#d0d0ff"),
    shininess: 100,
    flatShading: false,
  });

  const materialTwo = new THREE.MeshPhongMaterial({
    map: createGradientTexture("#ff8c94", "#b294bb"), // powder blue to lavender
  });

  const geometryTetra = new THREE.TetrahedronGeometry(1);
  const tetrahedron = new THREE.Mesh(geometryTetra, materialOne);
  scene.add(tetrahedron);

  const geometryCube = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(geometryCube, materialTwo);
  cube.position.x = 2; // position it next to the tetrahedron
  scene.add(cube);

  const geometryOcta = new THREE.OctahedronGeometry(1);
  const octahedron = new THREE.Mesh(geometryOcta, materialOne);
  octahedron.position.x = -2; // position it on the other side
  scene.add(octahedron);

  const geometryDodeca = new THREE.DodecahedronGeometry(1);
  const dodecahedron = new THREE.Mesh(geometryDodeca, materialTwo);
  dodecahedron.position.z = 2; // position it in front
  scene.add(dodecahedron);

  const geometryIcosa = new THREE.IcosahedronGeometry(1);
  const icosahedron = new THREE.Mesh(geometryIcosa, materialOne);
  icosahedron.position.z = -2; // position it behind
  scene.add(icosahedron);

  // Render function
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.3;

  // function render() {
  //   requestAnimationFrame(render);
  //   renderer.render(scene, camera);
  //   controls.update();
  // }
  // render();
}

main();
