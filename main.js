const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();

const defaultCamera = {
  fieldOfView: 90,
  aspect: canvas.width / canvas.height,
  near: 0.2,
  far: 2000
}

const setupCamera = (cameraSpec, cells) => {
  const camera = new THREE.PerspectiveCamera(cameraSpec.fieldOfView, cameraSpec.aspect, cameraSpec.near, cameraSpec.far);
  camera.position.x = cells / Math.sqrt(cells) * 5;
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