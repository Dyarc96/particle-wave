const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();

const defaultCamera = {
  fieldOfView: 100,
  aspect: canvas.width / canvas.height,
  near: 0.2,
  far: 2000
}

// First understand basics -> Then start to 

const setupCamera = (cameraSpec, cells) => {
  console.log(cells);
  const camera = new THREE.PerspectiveCamera(cameraSpec.fieldOfView, cameraSpec.aspect, cameraSpec.near, cameraSpec.far);
  camera.position.x = cells / Math.sqrt(cells) * 20;
  camera.position.y = Math.sqrt(cells) * 2;
  camera.position.z = Math.sqrt(cells / 5);
  return camera;
}

const alignRenderer = (renderer) => {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = canvas.clientWidth * pixelRatio || 0;
  const height = canvas.clientHeight * pixelRatio || 0;
  let resizeCondition = canvas.width !== width || canvas.height !== height
  if (resizeCondition) {
    renderer.setSize(width, height, false);
  }
  return resizeCondition;
}

const checkIfResized = (resizeCondition) => {
  if(resizeCondition) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}

let circleGrid = [];

const addCircle = (circlesX, circlesY, space) => {
  let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  let geometry = new THREE.SphereGeometry(1, 8, 8);

  for(let i = 0; i < circlesY; i++) {
    let circleRow = [];
    for(let j = 0; j < circlesX; j++) {
      let circle = new THREE.Mesh(geometry, material);
      circle.position.x = i * space;
      circle.position.z = -j * space;
      circleRow.push(circle);
      scene.add(circle);
    }
    circleGrid.push(circleRow);
  }
}

const movement = (i, j, gridSize, cell, time) => {
  cell.position.y = (Math.sin((i + gridSize + time ) * 0.3 ) * 15) +
  (Math.sin((j + gridSize + time) * 0.3 ) * 15);
}

addCircle(50, 50, 50);
let camera = setupCamera(defaultCamera, circleGrid.length*circleGrid[0].length)

const animate = (time) => {
  time *= 0.01;

  checkIfResized(alignRenderer(renderer));

  for(let i = 0; i < circleGrid.length; i++) {
      for (let j = 0; j < circleGrid[i].length; j++) {
        movement(i, j, circleGrid.length, circleGrid[i][j], time);
      }
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);