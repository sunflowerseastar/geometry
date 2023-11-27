import { OrbitControls } from "./OrbitControls.js";

/*
 * camera, scene, light, renderer
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0x999999);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(0, 1, 0);
scene.add(ambientLight);
scene.add(directionalLight);

const light1 = new THREE.PointLight(0xffffff, 0.2, 0);
light1.position.set(0, 200, 0);
scene.add(light1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*
 * geometry
 */
const largeIcosahedronGeometry = new THREE.IcosahedronGeometry(5, 0); // Radius 5, and detail level 0
const largeIcosahedronMaterial = new THREE.MeshBasicMaterial({
  color: 0x555555,
  wireframe: true,
});
const largeIcosahedron = new THREE.Mesh(
  largeIcosahedronGeometry,
  largeIcosahedronMaterial,
);
scene.add(largeIcosahedron);

const smallIcosahedronGeometry = new THREE.IcosahedronGeometry(0.5, 0); // Radius 0.5, detail level 0
const smallIcosahedronMaterial = new THREE.MeshNormalMaterial();

const vertices = largeIcosahedronGeometry.attributes.position;
for (let i = 0; i < vertices.count; i++) {
  const vertex = new THREE.Vector3();
  vertex.fromBufferAttribute(vertices, i);

  const smallIcosahedron = new THREE.Mesh(
    smallIcosahedronGeometry,
    smallIcosahedronMaterial,
  );
  smallIcosahedron.position.copy(vertex);
  smallIcosahedron.lookAt(largeIcosahedron.position);
  scene.add(smallIcosahedron);
}

/*
 * controls and render
 */
function animate() {
  requestAnimationFrame(animate);
  // Optional: Rotate the large icosahedron for better visualization
  largeIcosahedron.rotation.x += 0.005;
  largeIcosahedron.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.3;
