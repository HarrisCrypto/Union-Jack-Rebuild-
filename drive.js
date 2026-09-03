/* Union Jack — English country-lane drive at dawn.
   One Three.js scene. CDN ESM. Progressive: painted fallback first;
   this replaces it after the first rendered frame. */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';

const canvas = document.getElementById('drive');
if (!canvas) {
  /* nothing to mount */
} else {
  startDrive(canvas);
}

function startDrive(canvas) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = Math.min(window.innerWidth, window.innerHeight) < 700;
  const fallback = document.querySelector('.hero-fallback');

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !narrow,
      alpha: false,
      powerPreference: narrow ? 'default' : 'high-performance',
      failIfMajorPerformanceCaveat: false,
    });
  } catch (err) {
    return;
  }

  const gl = renderer.getContext();
  if (!gl) return;

  const FOG = 0xC9B89A;
  const maxPR = narrow ? 1.25 : 1.75;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPR));
  renderer.setClearColor(FOG, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  sizeRenderer();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(FOG);
  scene.fog = new THREE.FogExp2(FOG, 0.00128);

  /* Dawn sky — horizon stop matches FOG so the far plane has no seam */
  (function sky() {
    const c = document.createElement('canvas');
    c.width = 8;
    c.height = 512;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0.0, '#061018');
    g.addColorStop(0.28, '#1A2840');
    g.addColorStop(0.5, '#5A6478');
    g.addColorStop(0.68, '#C4A070');
    g.addColorStop(0.84, '#D2C0A0');
    g.addColorStop(1.0, '#C9B89A');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 8, 512);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(1400, 32, 20),
      new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.BackSide,
        fog: false,
        depthWrite: false,
      })
    );
    scene.add(dome);
  })();

  (function sun() {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 4, 128, 128, 128);
    g.addColorStop(0, 'rgba(255,236,200,1)');
    g.addColorStop(0.18, 'rgba(255,198,120,.65)');
    g.addColorStop(0.5, 'rgba(255,160,80,.18)');
    g.addColorStop(1, 'rgba(255,140,60,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const spr = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(c),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      })
    );
    spr.scale.set(140, 140, 1);
    spr.position.set(-80, 36, -260);
    scene.add(spr);
  })();

  const camera = new THREE.PerspectiveCamera(54, 1, 0.35, 1800);
  camera.position.set(0, 1.58, 0);
  sizeCamera();

  scene.add(new THREE.HemisphereLight(0xC8D0DC, 0x2A3224, 0.7));
  const sun = new THREE.DirectionalLight(0xFFD0A0, 1.25);
  sun.position.set(-60, 24, -130);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x6A88B0, 0.2);
  fill.position.set(40, 12, 30);
  scene.add(fill);

  const headL = new THREE.SpotLight(0xFFE8C0, 1.15, 50, 0.4, 0.55, 1.2);
  const headR = new THREE.SpotLight(0xFFE8C0, 1.15, 50, 0.4, 0.55, 1.2);
  scene.add(headL);
  scene.add(headR);
  scene.add(headL.target);
  scene.add(headR.target);

  const SEG = 420;
  const HALFW = 3.05;
  const AMP = 30;

  function laneX(z) {
    return Math.sin((z / SEG) * Math.PI * 2) * AMP;
  }
  function laneSlope(z) {
    return Math.cos((z / SEG) * Math.PI * 2) * AMP * ((Math.PI * 2) / SEG);
  }
  function laneY(z) {
    return Math.sin((z / SEG) * Math.PI * 4) * 1.55;
  }

  function asphaltTex() {
    const c = document.createElement('canvas');
    c.width = 128;
    c.height = 128;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#2A2D32';
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 1100; i++) {
      const v = 28 + (i * 19) % 45;
      ctx.fillStyle = 'rgba(' + v + ',' + v + ',' + (v + 5) + ',' + (0.07 + (i % 5) * 0.02) + ')';
      ctx.fillRect((i * 13) % 128, (i * 29) % 128, 1 + (i % 3), 1);
    }
    /* wheel tracks only — no centre line */
    ctx.fillStyle = 'rgba(14,14,16,.38)';
    ctx.fillRect(38, 0, 7, 128);
    ctx.fillRect(84, 0, 7, 128);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 48);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  function buildRibbon(width, colour, yLift, map) {
    const steps = narrow ? 160 : 280;
    const pos = [];
    const uvs = [];
    const idx = [];
    for (let i = 0; i <= steps; i++) {
      const z = -SEG * (i / steps);
      const x = laneX(z);
      const y = laneY(z) + yLift;
      let nx = 1;
      let nz = -laneSlope(z);
      const len = Math.hypot(nx, nz);
      nx /= len;
      nz /= len;
      pos.push(x - nx * width, y, z - nz * width);
      pos.push(x + nx * width, y, z + nz * width);
      const v = (i / steps) * 14;
      uvs.push(0, v, 1, v);
    }
    for (let s = 0; s < steps; s++) {
      const a = s * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      idx.push(a, c, b, b, c, d);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    const mat = map
      ? new THREE.MeshLambertMaterial({ map, color: 0xffffff })
      : new THREE.MeshLambertMaterial({ color: colour });
    return new THREE.Mesh(g, mat);
  }

  const roadMap = asphaltTex();
  const roadGroup = new THREE.Group();
  const grassGroup = new THREE.Group();
  const edgeGroup = new THREE.Group();
  for (let k = 0; k < 3; k++) {
    const r = buildRibbon(HALFW, 0x35383c, 0.03, roadMap);
    r.position.z = -SEG * k;
    roadGroup.add(r);
    const v = buildRibbon(95, 0x3d4c32, -0.09);
    v.position.z = -SEG * k;
    grassGroup.add(v);
    const eg = buildRibbon(HALFW + 0.45, 0x1e2022, 0.008);
    eg.position.z = -SEG * k;
    edgeGroup.add(eg);
  }
  scene.add(grassGroup);
  scene.add(edgeGroup);
  scene.add(roadGroup);

  function scatter(geo, mat, count, place) {
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const p = new THREE.Vector3();
    const s = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      q.identity();
      s.set(1, 1, 1);
      place(i, p, s, q);
      m.compose(p, q, s);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    return mesh;
  }

  const world = new THREE.Group();
  scene.add(world);

  /* Cut instance counts first if a device is tight — not lights, fog, or resolution. */
  const HEDGE_N = narrow ? 110 : 200;
  const TREE_N = narrow ? 32 : 64;
  const POST_N = narrow ? 80 : 140;

  world.add(
    scatter(
      new THREE.SphereGeometry(1, 6, 5),
      new THREE.MeshLambertMaterial({ color: 0x243a1e }),
      HEDGE_N,
      function (i, p, s) {
        const side = i % 2 ? 1 : -1;
        const z = -(i / HEDGE_N) * SEG * 2;
        p.set(laneX(z) + side * (HALFW + 1.05 + Math.random() * 0.5), laneY(z) + 0.95 + Math.random() * 0.55, z);
        s.set(1.5 + Math.random(), 1.6 + Math.random() * 1.2, 1.5 + Math.random());
      }
    )
  );
  world.add(
    scatter(
      new THREE.SphereGeometry(0.9, 5, 4),
      new THREE.MeshLambertMaterial({ color: 0x355028 }),
      Math.floor(HEDGE_N * 0.75),
      function (i, p, s) {
        const side = i % 2 ? 1 : -1;
        const z = -(i / (HEDGE_N * 0.75)) * SEG * 2 - 1.1;
        p.set(laneX(z) + side * (HALFW + 2.0 + Math.random()), laneY(z) + 0.72, z);
        s.set(1.15 + Math.random() * 0.7, 1.05 + Math.random() * 0.9, 1.15 + Math.random() * 0.7);
      }
    )
  );

  world.add(
    scatter(
      new THREE.CylinderGeometry(0.2, 0.38, 7.4, 5),
      new THREE.MeshLambertMaterial({ color: 0x453528 }),
      TREE_N,
      function (i, p, s) {
        const side = i % 2 ? 1 : -1;
        const z = -(i / TREE_N) * SEG * 2 - Math.random() * 8;
        p.set(laneX(z) + side * (HALFW + 3.7 + Math.random() * 4.5), laneY(z) + 3.6, z);
        s.set(1, 1 + Math.random() * 0.3, 1);
      }
    )
  );
  world.add(
    scatter(
      new THREE.SphereGeometry(3.8, 7, 6),
      new THREE.MeshLambertMaterial({ color: 0x2a4522 }),
      TREE_N,
      function (i, p, s) {
        const side = i % 2 ? 1 : -1;
        const z = -(i / TREE_N) * SEG * 2 - Math.random() * 8;
        p.set(laneX(z) + side * (HALFW + 3.5 + Math.random() * 4.5), laneY(z) + 8 + Math.random() * 1.8, z);
        const sc = 0.82 + Math.random() * 0.9;
        s.set(sc, sc * 0.82, sc);
      }
    )
  );
  world.add(
    scatter(
      new THREE.SphereGeometry(3.3, 6, 5),
      new THREE.MeshLambertMaterial({ color: 0x7a5a24 }),
      Math.floor(TREE_N * 0.4),
      function (i, p, s) {
        const side = i % 2 ? 1 : -1;
        const z = -(i / (TREE_N * 0.4)) * SEG * 2 - 10;
        p.set(laneX(z) + side * (HALFW + 5.2 + Math.random() * 5), laneY(z) + 7.4, z);
        const sc = 0.7 + Math.random() * 0.55;
        s.set(sc, sc * 0.9, sc);
      }
    )
  );

  world.add(
    scatter(
      new THREE.BoxGeometry(0.12, 1.25, 0.12),
      new THREE.MeshLambertMaterial({ color: 0x6a5840 }),
      POST_N,
      function (i, p) {
        const side = i % 2 ? 1 : -1;
        const z = -(i / POST_N) * SEG * 2;
        p.set(laneX(z) + side * (HALFW + 0.7), laneY(z) + 0.6, z);
      }
    )
  );

  world.add(
    scatter(
      new THREE.BoxGeometry(1.9, 0.9, 0.55),
      new THREE.MeshLambertMaterial({ color: 0x8c877a }),
      narrow ? 32 : 52,
      function (i, p, s) {
        const side = i % 2 ? 1 : -1;
        const n = narrow ? 32 : 52;
        const z = -(i / n) * SEG * 2 - 3;
        p.set(laneX(z) + side * (HALFW + 1.9), laneY(z) + 0.38, z);
        s.set(0.9 + Math.random() * 0.45, 0.75 + Math.random() * 0.55, 0.9);
      }
    )
  );

  world.add(
    scatter(
      new THREE.ConeGeometry(100, 38, 7),
      new THREE.MeshLambertMaterial({ color: 0x4e5e4e }),
      16,
      function (i, p, s) {
        const z = -80 - i * 80;
        p.set((i % 2 ? 1 : -1) * (125 + Math.random() * 150), -6, z);
        const sc = 0.65 + Math.random() * 1.05;
        s.set(sc, sc, sc);
      }
    )
  );

  (function church() {
    const g = new THREE.Group();
    const stone = new THREE.MeshLambertMaterial({ color: 0x9a9588 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(14, 10, 22), stone);
    body.position.y = 5;
    const tower = new THREE.Mesh(new THREE.BoxGeometry(6, 18, 6), stone);
    tower.position.set(0, 9, -8);
    const spire = new THREE.Mesh(
      new THREE.ConeGeometry(4.2, 11, 4),
      new THREE.MeshLambertMaterial({ color: 0x4a4038 })
    );
    spire.position.set(0, 23, -8);
    g.add(body, tower, spire);
    g.position.set(AMP + 100, laneY(-240), -240);
    world.add(g);
  })();

  const lookTarget = new THREE.Vector3();
  const bonnet = document.querySelector('.bonnet');

  let travelled = reduced ? 48 : 8;
  let speed = 0;
  let target = 22;
  let intro = reduced ? 1 : 0;
  let pointer = 0;
  let pointerT = 0;
  let lookY = 0;
  let lookYT = 0;
  let raf = 0;
  let revealed = false;
  let avgDt = 1 / 60;
  let frames = 0;
  const clock = new THREE.Clock();

  function pose(dt) {
    const zl = -(travelled % SEG);
    const lx = laneX(zl);
    const ly = laneY(zl);
    /* Stay on the tarmac through the curves. */
    camera.position.x = lx;
    camera.position.y = ly + 1.58;
    camera.position.z = 0;

    const ahead = zl - 32;
    lookTarget.set(laneX(ahead) + pointer * 3.2, laneY(ahead) + 1.55 + lookY * 10, -32);
    camera.lookAt(lookTarget);
    /* lookAt faces down the lane (−Z). Tiny roll only — no bounce that reads as shake. */
    camera.rotation.z += -pointer * 0.04;

    const headAhead = zl - 16;
    headL.position.set(lx - 0.65, ly + 0.95, 0.35);
    headR.position.set(lx + 0.65, ly + 0.95, 0.35);
    headL.target.position.set(laneX(headAhead) - 1.1, laneY(headAhead), -16);
    headR.target.position.set(laneX(headAhead) + 1.1, laneY(headAhead), -16);
    headL.target.updateMatrixWorld();
    headR.target.updateMatrixWorld();

    roadGroup.position.z = travelled % SEG;
    edgeGroup.position.z = travelled % SEG;
    grassGroup.position.z = travelled % SEG;
    world.position.z = travelled % (SEG * 2);
    roadMap.offset.y = -(travelled * 0.045) % 1;

    if (dt && bonnet) {
      bonnet.style.transform =
        'translate(calc(-50% + ' + (pointer * 8).toFixed(2) + 'px), ' + (Math.abs(pointer) * 3).toFixed(2) + 'px)';
    }
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    canvas.classList.add('is-live');
    if (fallback) fallback.classList.add('is-hidden');
    document.documentElement.classList.add('drive-live');
    document.dispatchEvent(new CustomEvent('uj:drive-ready'));
  }

  function draw() {
    pose(0);
    renderer.render(scene, camera);
    reveal();
  }

  function frame() {
    raf = 0;
    if (reduced) return;
    if (document.hidden) return;

    const dt = Math.min(clock.getDelta(), 0.05);
    avgDt = avgDt * 0.9 + dt * 0.1;
    frames += 1;
    if (frames === 50 && avgDt > 0.022) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, narrow ? 1 : 1.25));
    }

    intro = Math.min(1, intro + dt * 0.32);
    const ease = intro * intro * (3 - 2 * intro);
    const want = intro < 1 ? 5 + ease * 18 : Math.max(target, 20);
    speed += (want - speed) * dt * 1.5;
    travelled += speed * dt;

    pointer += (pointerT - pointer) * dt * 2.6;
    lookY += (lookYT - lookY) * dt * 2.2;

    pose(dt);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }

  function go() {
    if (reduced) {
      draw();
      return;
    }
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function sizeRenderer() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
  }

  function sizeCamera() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  }

  function onResize() {
    sizeRenderer();
    sizeCamera();
    if (reduced) draw();
  }

  /* Mouse look only. Finger-drag on a phone fights scroll and reads as shake. */
  window.addEventListener(
    'pointermove',
    function (ev) {
      if (ev.pointerType && ev.pointerType !== 'mouse') return;
      pointerT = (ev.clientX / window.innerWidth - 0.5) * 2;
      lookYT = (ev.clientY / window.innerHeight - 0.4) * -0.12;
    },
    { passive: true }
  );

  window.addEventListener(
    'scroll',
    function () {
      const sc = window.scrollY || 0;
      target = 22 + Math.min(sc / 32, 32);
    },
    { passive: true }
  );

  window.addEventListener('resize', onResize);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onResize);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    } else {
      clock.getDelta();
      go();
    }
  });

  canvas.addEventListener('webglcontextlost', function (ev) {
    ev.preventDefault();
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    canvas.classList.remove('is-live');
    if (fallback) fallback.classList.remove('is-hidden');
  });

  canvas.addEventListener('webglcontextrestored', function () {
    sizeRenderer();
    go();
  });

  /* First painted frame, then loop — never a blank hero or a freeze mid-load. */
  draw();
  if (!reduced) go();
}
