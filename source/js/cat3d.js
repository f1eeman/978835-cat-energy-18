import * as THREE from './vendor/three.module.min.js';

const gsap = window.gsap;
const canvas = document.getElementById('cat3d');
if (!canvas) throw new Error('cat3d canvas not found');

const container = canvas.parentElement;
const W = container.offsetWidth || 280;
const H = container.offsetHeight || 271;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
camera.position.set(0, 0.2, 6.5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(W, H);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const sun = new THREE.DirectionalLight(0xfff4e0, 1.1);
sun.position.set(3, 6, 4);
scene.add(sun);
const rim = new THREE.DirectionalLight(0xaaff88, 0.45);
rim.position.set(-4, 1, -3);
scene.add(rim);

function mat(color, flat = true) {
  return new THREE.MeshPhongMaterial({ color, flatShading: flat, shininess: flat ? 8 : 25 });
}

const M = {
  green:      mat(0x68b738),
  darkGreen:  mat(0x4a8a28),
  lightGreen: mat(0x8ed45f),
  black:      mat(0x111111, false),
  white:      mat(0xffffff, false),
  pink:       mat(0xff9aaa, false),
  orange:     mat(0xff7722, false),
  gold:       mat(0xffd700, false),
};

const cat = new THREE.Group();
scene.add(cat);
cat.rotation.y = 0.2;

// Body
const body = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.35, 1.0), M.green);
cat.add(body);

// Belly
const belly = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.88, 0.18), M.lightGreen);
belly.position.set(0, -0.15, 0.51);
cat.add(belly);

// Front paws
[-0.3, 0.3].forEach(x => {
  const paw = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.38, 0.36), M.green);
  paw.position.set(x, -0.98, 0.2);
  cat.add(paw);
  const toe = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.36), M.lightGreen);
  toe.position.set(x, -1.19, 0.2);
  cat.add(toe);
});

// Tail pivot (base of tail on the left side of body)
const tailPivot = new THREE.Group();
tailPivot.position.set(-0.48, -0.25, 0);
cat.add(tailPivot);

const t1 = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.14, 0.62, 5), M.darkGreen);
t1.rotation.z = -0.85;
t1.position.set(-0.2, -0.26, 0);
tailPivot.add(t1);

const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.095, 0.52, 5), M.darkGreen);
t2.rotation.z = -1.55;
t2.position.set(-0.46, -0.57, 0);
tailPivot.add(t2);

const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.115, 6, 5), M.lightGreen);
tailTip.position.set(-0.62, -0.58, 0);
tailPivot.add(tailTip);

// Head group
const headGroup = new THREE.Group();
headGroup.position.set(0, 1.13, 0);
cat.add(headGroup);

const head = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.94, 0.9), M.green);
headGroup.add(head);

// Snout platform
const snout = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.28, 0.22), M.lightGreen);
snout.position.set(0, -0.14, 0.53);
headGroup.add(snout);

// Ears
[[-0.34, -1], [0.34, 1]].forEach(([x, side]) => {
  const ear = new THREE.Mesh(new THREE.ConeGeometry(0.195, 0.38, 3), M.darkGreen);
  ear.position.set(x, 0.56, 0.02);
  ear.rotation.y = side * 0.12;
  headGroup.add(ear);

  const innerEar = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.24, 3), M.pink);
  innerEar.position.set(x, 0.56, 0.07);
  innerEar.rotation.y = side * 0.12;
  headGroup.add(innerEar);
});

// Eye group (scaled for blink)
const eyeGroup = new THREE.Group();
headGroup.add(eyeGroup);

[[-0.24, -1], [0.24, 1]].forEach(([x, side]) => {
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), M.black);
  eye.position.set(x, 0.1, 0.47);
  eyeGroup.add(eye);

  const shine = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 5), M.white);
  shine.position.set(x + side * 0.025, 0.14, 0.56);
  headGroup.add(shine);
});

// Nose
const nose = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.065, 0.05), M.pink);
nose.position.set(0, -0.065, 0.67);
headGroup.add(nose);

// Whiskers (lines)
[[-1, 0.04], [-1, -0.07], [1, 0.04], [1, -0.07]].forEach(([side, dy]) => {
  const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(side * 0.52, dy, 0.06)];
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.65 })
  );
  line.position.set(side * 0.07, -0.13, 0.66);
  headGroup.add(line);
});

// Collar
const collar = new THREE.Mesh(new THREE.TorusGeometry(0.41, 0.063, 6, 14), M.orange);
collar.position.set(0, 0.55, 0.08);
collar.rotation.x = 0.32;
cat.add(collar);

// Bell
const bell = new THREE.Mesh(new THREE.SphereGeometry(0.088, 8, 6), M.gold);
bell.position.set(0, 0.44, 0.52);
cat.add(bell);

// Animate
if (gsap) {
  gsap.to(cat.position, { y: 0.2, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });

  gsap.to(cat.rotation, { y: -0.22, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.6 });

  gsap.to(headGroup.rotation, { z: 0.17, duration: 3.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.9 });

  gsap.to(tailPivot.rotation, { z: 0.68, duration: 0.52, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.25 });

  gsap.to(body.scale, { x: 1.04, y: 1.05, z: 1.03, duration: 1.9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.35 });

  const blink = () => {
    gsap.to(eyeGroup.scale, {
      y: 0.07, duration: 0.075, ease: 'power2.in',
      onComplete() {
        gsap.to(eyeGroup.scale, {
          y: 1, duration: 0.1, ease: 'power2.out',
          onComplete() { setTimeout(blink, 2200 + Math.random() * 2400); }
        });
      }
    });
  };
  setTimeout(blink, 2000);
}

// Show canvas, hide picture
const picture = container.querySelector('picture');
if (picture) picture.style.display = 'none';
canvas.style.display = 'block';

renderer.setAnimationLoop(() => renderer.render(scene, camera));

new ResizeObserver(() => {
  const w = container.offsetWidth;
  const h = container.offsetHeight;
  if (w && h) {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
}).observe(container);
