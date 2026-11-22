// MOBILE NAVIGATION
const menuButton = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll("#nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// THREE.JS 3D BACKGROUND
const container = document.getElementById("canvas-container");

if (window.THREE && container) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Create floating particles
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 900;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 22;
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x9b78ff,
    size: 0.035,
    transparent: true,
    opacity: 0.8
  });

  const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
  );

  scene.add(particles);

  // Create a floating 3D sphere
  const sphereGeometry = new THREE.IcosahedronGeometry(1.3, 2);

  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x7045e8,
    metalness: 0.65,
    roughness: 0.2,
    wireframe: true
  });

  const sphere = new THREE.Mesh(
    sphereGeometry,
    sphereMaterial
  );

  sphere.position.set(3.4, 0.3, -1.5);
  scene.add(sphere);

  // Lighting
  const blueLight = new THREE.PointLight(0x398bff, 3, 15);
  blueLight.position.set(4, 3, 4);
  scene.add(blueLight);

  const pinkLight = new THREE.PointLight(0xf05acb, 3, 15);
  pinkLight.position.set(-4, -2, 3);
  scene.add(pinkLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Animation
  function animate() {
    requestAnimationFrame(animate);

    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;

    sphere.rotation.x += 0.002;
    sphere.rotation.y += 0.004;

    renderer.render(scene, camera);
  }

  animate();

  // Responsive canvas
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
} else {
  console.log("Three.js could not load. Check your internet connection.");
}
// DARK / LIGHT MODE SWITCH
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");

    themeToggle.textContent = isLight
      ? "🌙 Dark Mode"
      : "☀️ Light Mode";
  });
}
// Console message
console.log("Girish's 3D Portfolio is running!");

