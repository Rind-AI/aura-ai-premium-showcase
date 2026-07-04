/* NNAI Scene — reusable THREE.js background engine.
   One active scene at a time. Reacts to mouse (parallax rotation) and scroll (travel).
   Engine lineage: the morphing-icosahedron "Claude Desktop" look, generalised to 8 modes.
   Usage:
     const ctl = NNAIScene.create(canvasEl, config);
     ctl.setConfig(newConfig);   // smoothly rebuild for a new profile
     ctl.dispose();
   config = { mode, c1, c2, accent, particle, amp, speed, density }  (hex color strings)
*/
(function () {
  const MODES = ['blob', 'lattice', 'field', 'wave', 'orbit', 'torus', 'helix', 'ribbons'];

  function hexToRgb(h) {
    h = (h || '#888888').replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function create(canvas, cfg) {
    if (typeof THREE === 'undefined') return { setConfig() {}, dispose() {} };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.4;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    let W = canvas.clientWidth || innerWidth;
    let H = canvas.clientHeight || innerHeight;
    function size() {
      W = canvas.clientWidth || innerWidth;
      H = canvas.clientHeight || innerHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    }

    const group = new THREE.Group();
    scene.add(group);

    // lights (shared)
    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(amb);
    const l1 = new THREE.PointLight(0xffffff, 1.4, 40); l1.position.set(4, 3, 4); scene.add(l1);
    const l2 = new THREE.PointLight(0xffffff, 1.0, 40); l2.position.set(-5, -2, 3); scene.add(l2);
    const l3 = new THREE.PointLight(0xffffff, 0.9, 40); l3.position.set(0, 4, -4); scene.add(l3);

    let built = null;     // { objects:[], update(t,s) }
    let config = null;

    // ---- input ----
    let mx = 0, my = 0, tx = 0, ty = 0;
    let sTarget = 0, sEase = 0;
    function onMove(e) {
      const px = e.touches ? e.touches[0].clientX : e.clientX;
      const py = e.touches ? e.touches[0].clientY : e.clientY;
      mx = (px / innerWidth - 0.5);
      my = (py / innerHeight - 0.5);
    }
    function onScroll() {
      const doc = document.scrollingElement || document.documentElement;
      const max = Math.max(1, doc.scrollHeight - innerHeight);
      sTarget = Math.min(1, Math.max(0, doc.scrollTop / max));
    }
    addEventListener('mousemove', onMove, { passive: true });
    addEventListener('touchmove', onMove, { passive: true });
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', size);

    function disposeGroup() {
      if (!built) return;
      built.objects.forEach(o => {
        group.remove(o);
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
          else o.material.dispose();
        }
      });
      built = null;
    }

    // ---------- MODE BUILDERS ----------
    function build(c) {
      const col1 = new THREE.Color(c.c1 || '#888');
      const col2 = new THREE.Color(c.c2 || '#aaa');
      const colA = new THREE.Color(c.accent || '#fff');
      const colP = new THREE.Color(c.particle || c.accent || '#fff');
      const amp = c.amp ?? 1;
      const speed = c.speed ?? 1;
      const dens = c.density ?? 1;
      const objs = [];

      // light tints follow palette
      l1.color = colA; l2.color = col2; l3.color = col1;

      // shared drifting particle cloud (varies by density/color)
      function particleCloud(count, spread, sz) {
        const g = new THREE.BufferGeometry();
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const r = 2.4 + Math.random() * spread;
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          p[i * 3] = r * Math.sin(ph) * Math.cos(th);
          p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
          p[i * 3 + 2] = r * Math.cos(ph);
        }
        g.setAttribute('position', new THREE.BufferAttribute(p, 3));
        const pts = new THREE.Points(g, new THREE.PointsMaterial({
          color: colP, size: sz, transparent: true, opacity: 0.6, depthWrite: false
        }));
        scene.add(pts);
        objs.push(pts);
        return pts;
      }

      if (c.mode === 'blob') {
        const geo = new THREE.IcosahedronGeometry(1.6, 5);
        const original = geo.attributes.position.array.slice(0);
        const vcount = geo.attributes.position.count;
        const mat = new THREE.MeshStandardMaterial({ color: col1, emissive: col2, emissiveIntensity: 0.15, roughness: 0.42, metalness: 0.3 });
        const mesh = new THREE.Mesh(geo, mat); group.add(mesh); objs.push(mesh);
        const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: colA, wireframe: true, transparent: true, opacity: 0.18 }));
        wire.scale.setScalar(1.04); group.add(wire); objs.push(wire);
        const pos = geo.attributes.position;
        const pcloud = particleCloud(Math.round(150 * dens), 2.8, 0.03);
        return {
          objects: objs,
          update(t, s) {
            for (let i = 0; i < vcount; i++) {
              const ix = i * 3;
              const ox = original[ix], oy = original[ix + 1], oz = original[ix + 2];
              const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
              const nx = ox / len, ny = oy / len, nz = oz / len;
              const n = 0.30 * Math.sin(nx * 1.8 + t * 0.7) + 0.30 * Math.sin(ny * 1.9 + t * 0.85) +
                        0.30 * Math.sin(nz * 2.0 + t * 0.6) + 0.16 * Math.sin((nx + ny) * 2.6 - t * 1.05) +
                        0.12 * Math.cos((ny + nz) * 3.2 + t * 0.8);
              const R = 1.6 + n * 0.44 * amp;
              pos.array[ix] = nx * R; pos.array[ix + 1] = ny * R; pos.array[ix + 2] = nz * R;
            }
            pos.needsUpdate = true; geo.computeVertexNormals();
            group.position.set(s * -0.9, s * -3.2, s * -1.1);
            group.rotation.set(ty * 0.5 + s * 0.5, t * 0.16 + tx * 0.6 + s * 2.2, s * 0.35);
            pcloud.position.y = s * -2.2; pcloud.rotation.y = t * 0.04 + s * 1.0;
          }
        };
      }

      if (c.mode === 'lattice') {
        // 3D grid of small nodes + connecting edges — "the signal in the noise"
        const N = 5, gap = 0.72;
        const off = ((N - 1) * gap) / 2;
        const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
        const nodeMat = new THREE.MeshStandardMaterial({ color: colA, emissive: colA, emissiveIntensity: 0.5, roughness: 0.3 });
        const base = [];
        for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) for (let z = 0; z < N; z++) {
          const m = new THREE.Mesh(nodeGeo, nodeMat);
          const bx = x * gap - off, by = y * gap - off, bz = z * gap - off;
          m.position.set(bx, by, bz); base.push([bx, by, bz]);
          group.add(m); objs.push(m);
        }
        // edge lines along grid
        const linePos = [];
        for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) for (let z = 0; z < N; z++) {
          const p = [x * gap - off, y * gap - off, z * gap - off];
          if (x < N - 1) linePos.push(...p, (x + 1) * gap - off, p[1], p[2]);
          if (y < N - 1) linePos.push(...p, p[0], (y + 1) * gap - off, p[2]);
          if (z < N - 1) linePos.push(...p, p[0], p[1], (z + 1) * gap - off);
        }
        const lg = new THREE.BufferGeometry();
        lg.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
        const lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: col1, transparent: true, opacity: 0.22 }));
        group.add(lines); objs.push(lines);
        const meshes = objs.filter(o => o.isMesh);
        return {
          objects: objs,
          update(t, s) {
            for (let i = 0; i < meshes.length; i++) {
              const b = base[i];
              const w = Math.sin(t * 1.1 + (b[0] + b[1] + b[2]) * 1.4) * 0.09 * amp;
              meshes[i].position.set(b[0] + w, b[1] + w * 0.6, b[2] - w);
              meshes[i].scale.setScalar(1 + Math.max(0, Math.sin(t * 1.4 + i)) * 0.9);
            }
            group.position.set(s * -0.4, s * -1.4, s * 1.2);
            group.rotation.set(ty * 0.4 + s * 0.6 + 0.3, t * 0.12 * speed + tx * 0.7 + s * 1.4, 0);
          }
        };
      }

      if (c.mode === 'field') {
        // network of nodes with dynamic proximity links — "customers ask AI / the graph"
        const COUNT = Math.round(90 * dens);
        const pts = [];
        for (let i = 0; i < COUNT; i++) {
          pts.push({
            base: new THREE.Vector3((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 4),
            ph: Math.random() * Math.PI * 2
          });
        }
        const pg = new THREE.BufferGeometry();
        const parr = new Float32Array(COUNT * 3);
        pg.setAttribute('position', new THREE.BufferAttribute(parr, 3));
        const nodes = new THREE.Points(pg, new THREE.PointsMaterial({ color: colA, size: 0.07, transparent: true, opacity: 0.9, depthWrite: false }));
        group.add(nodes); objs.push(nodes);
        const lg = new THREE.BufferGeometry();
        const maxL = COUNT * 6;
        const larr = new Float32Array(maxL * 6);
        lg.setAttribute('position', new THREE.BufferAttribute(larr, 3));
        const lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: col1, transparent: true, opacity: 0.16 }));
        group.add(lines); objs.push(lines);
        const cur = pts.map(() => new THREE.Vector3());
        return {
          objects: objs,
          update(t, s) {
            for (let i = 0; i < COUNT; i++) {
              const p = pts[i];
              cur[i].set(
                p.base.x + Math.sin(t * 0.5 + p.ph) * 0.35 * amp,
                p.base.y + Math.cos(t * 0.45 + p.ph) * 0.35 * amp,
                p.base.z + Math.sin(t * 0.6 + p.ph * 1.3) * 0.35 * amp
              );
              parr[i * 3] = cur[i].x; parr[i * 3 + 1] = cur[i].y; parr[i * 3 + 2] = cur[i].z;
            }
            pg.attributes.position.needsUpdate = true;
            let li = 0;
            for (let i = 0; i < COUNT && li < maxL; i++) {
              for (let j = i + 1; j < COUNT && li < maxL; j++) {
                if (cur[i].distanceTo(cur[j]) < 1.15) {
                  larr[li * 6] = cur[i].x; larr[li * 6 + 1] = cur[i].y; larr[li * 6 + 2] = cur[i].z;
                  larr[li * 6 + 3] = cur[j].x; larr[li * 6 + 4] = cur[j].y; larr[li * 6 + 5] = cur[j].z;
                  li++;
                }
              }
            }
            lg.setDrawRange(0, li * 2);
            lg.attributes.position.needsUpdate = true;
            group.position.set(s * -0.3, s * -2.0, s * 0.8);
            group.rotation.set(ty * 0.3 + s * 0.3, t * 0.06 * speed + tx * 0.5 + s * 0.9, 0);
          }
        };
      }

      if (c.mode === 'wave') {
        // undulating plane — "your suburb / the horizon"
        const SEG = 48, span = 9;
        const geo = new THREE.PlaneGeometry(span, span, SEG, SEG);
        const original = geo.attributes.position.array.slice(0);
        const mat = new THREE.MeshStandardMaterial({ color: col1, emissive: col2, emissiveIntensity: 0.12, wireframe: true, transparent: true, opacity: 0.5, metalness: 0.2, roughness: 0.6 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2.35;
        group.add(mesh); objs.push(mesh);
        const pos = geo.attributes.position;
        const pcloud = particleCloud(Math.round(80 * dens), 3.2, 0.028);
        return {
          objects: objs,
          update(t, s) {
            for (let i = 0; i < pos.count; i++) {
              const ix = i * 3;
              const x = original[ix], y = original[ix + 1];
              pos.array[ix + 2] = (Math.sin(x * 0.9 + t * 1.1) * 0.5 + Math.cos(y * 0.8 + t * 0.9) * 0.5 + Math.sin((x + y) * 0.6 - t)) * 0.42 * amp;
            }
            pos.needsUpdate = true; geo.computeVertexNormals();
            group.position.set(tx * 0.4, -0.6 + s * -1.6, s * 1.4);
            group.rotation.set(ty * 0.25, s * 0.5 + tx * 0.3, 0);
            pcloud.rotation.y = t * 0.03 + s * 0.6; pcloud.position.y = s * -1.4;
          }
        };
      }

      if (c.mode === 'orbit') {
        // concentric orbiting rings + a core — "measure it / precision"
        const rings = [];
        const ringCount = 5;
        for (let i = 0; i < ringCount; i++) {
          const rad = 0.9 + i * 0.42;
          const tg = new THREE.TorusGeometry(rad, 0.006 + i * 0.001, 8, 140);
          const tm = new THREE.MeshBasicMaterial({ color: i % 2 ? colA : col1, transparent: true, opacity: 0.5 - i * 0.05 });
          const tr = new THREE.Mesh(tg, tm);
          tr.rotation.x = Math.PI / 2 + (i * 0.22);
          tr.rotation.y = i * 0.4;
          group.add(tr); objs.push(tr); rings.push(tr);
          // orbiting mote
          const mg = new THREE.SphereGeometry(0.05, 12, 12);
          const mm = new THREE.MeshStandardMaterial({ color: colA, emissive: colA, emissiveIntensity: 0.6 });
          const mote = new THREE.Mesh(mg, mm);
          group.add(mote); objs.push(mote);
          rings.push({ mote, rad, off: i * 1.3, spd: 0.5 + i * 0.12 });
        }
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 2),
          new THREE.MeshStandardMaterial({ color: col1, emissive: colA, emissiveIntensity: 0.4, roughness: 0.3, metalness: 0.5 }));
        group.add(core); objs.push(core);
        const pcloud = particleCloud(Math.round(70 * dens), 3.0, 0.026);
        return {
          objects: objs,
          update(t, s) {
            let ri = 0;
            for (let i = 0; i < objs.length; i++) {
              const o = objs[i];
              if (o.isMesh && o.geometry.type === 'TorusGeometry') { o.rotation.z += 0.002 * (ri + 1); ri++; }
            }
            // motes
            const motes = objs.filter(o => o.isMesh && o.geometry.type === 'SphereGeometry');
            motes.forEach((m, i) => {
              const rad = 0.9 + i * 0.42, spd = 0.5 + i * 0.12, off = i * 1.3;
              m.position.set(Math.cos(t * spd + off) * rad, Math.sin(t * spd * 0.9 + off) * 0.25, Math.sin(t * spd + off) * rad);
            });
            core.rotation.y = t * 0.4; core.rotation.x = t * 0.2;
            group.position.set(s * -0.5, s * -2.4, s * 0.6);
            group.rotation.set(0.35 + ty * 0.4 + s * 0.3, t * 0.1 * speed + tx * 0.6 + s * 1.2, s * 0.2);
            pcloud.rotation.y = -t * 0.03; pcloud.position.y = s * -1.8;
          }
        };
      }

      if (c.mode === 'torus') {
        // twisting torus-knot, metallic — "designed / NOIR"
        const geo = new THREE.TorusKnotGeometry(1.3, 0.34, 220, 32, 2, 3);
        const mat = new THREE.MeshStandardMaterial({ color: col1, emissive: col2, emissiveIntensity: 0.12, metalness: 0.85, roughness: 0.28 });
        const mesh = new THREE.Mesh(geo, mat); group.add(mesh); objs.push(mesh);
        const wire = new THREE.Mesh(new THREE.TorusKnotGeometry(1.3, 0.36, 160, 20, 2, 3),
          new THREE.MeshBasicMaterial({ color: colA, wireframe: true, transparent: true, opacity: 0.1 }));
        group.add(wire); objs.push(wire);
        const pcloud = particleCloud(Math.round(90 * dens), 2.6, 0.025);
        return {
          objects: objs,
          update(t, s) {
            group.position.set(s * -0.8, s * -3.0, s * -0.8);
            group.rotation.set(t * 0.14 + ty * 0.5 + s * 0.8, t * 0.18 * speed + tx * 0.6 + s * 2.0, s * 0.4);
            wire.rotation.copy(group.rotation);
            pcloud.rotation.y = t * 0.03; pcloud.position.y = s * -2.0;
          }
        };
      }

      if (c.mode === 'helix') {
        // golden double helix of motes — "AURUM / value compounding"
        const turns = 3.2, per = 26, total = Math.round(per * turns);
        const g1 = new THREE.SphereGeometry(0.06, 10, 10);
        const m1 = new THREE.MeshStandardMaterial({ color: colA, emissive: colA, emissiveIntensity: 0.5, metalness: 0.6, roughness: 0.3 });
        const m2 = new THREE.MeshStandardMaterial({ color: col1, emissive: col2, emissiveIntensity: 0.3, metalness: 0.5, roughness: 0.35 });
        const beads = [];
        for (let i = 0; i < total; i++) {
          const a = (i / per) * Math.PI * 2;
          const b1 = new THREE.Mesh(g1, m1); const b2 = new THREE.Mesh(g1, m2);
          group.add(b1); group.add(b2); objs.push(b1, b2);
          beads.push({ b1, b2, a, y: (i / total - 0.5) * 5 });
        }
        const pcloud = particleCloud(Math.round(60 * dens), 3.0, 0.024);
        return {
          objects: objs,
          update(t, s) {
            beads.forEach(bd => {
              const a = bd.a + t * 0.4 * speed;
              const R = 1.15;
              bd.b1.position.set(Math.cos(a) * R, bd.y, Math.sin(a) * R);
              bd.b2.position.set(Math.cos(a + Math.PI) * R, bd.y, Math.sin(a + Math.PI) * R);
            });
            group.position.set(s * -0.4, s * -1.5, s * 1.0);
            group.rotation.set(ty * 0.3, tx * 0.5 + s * 0.6, s * 0.15);
            pcloud.rotation.y = t * 0.03; pcloud.position.y = s * -1.6;
          }
        };
      }

      if (c.mode === 'ribbons') {
        // flowing ribbon curves — "stories / GAZETTE"
        const ribbons = [];
        const RC = 6;
        for (let i = 0; i < RC; i++) {
          const pts = [];
          for (let j = 0; j <= 60; j++) pts.push(new THREE.Vector3(0, 0, 0));
          const cg = new THREE.BufferGeometry().setFromPoints(pts);
          const cm = new THREE.LineBasicMaterial({ color: i % 2 ? colA : col1, transparent: true, opacity: 0.5 });
          const line = new THREE.Line(cg, cm);
          group.add(line); objs.push(line);
          ribbons.push({ line, seed: i * 1.7, pts });
        }
        const pcloud = particleCloud(Math.round(70 * dens), 3.2, 0.026);
        return {
          objects: objs,
          update(t, s) {
            ribbons.forEach((rb, ri) => {
              const arr = rb.line.geometry.attributes.position.array;
              for (let j = 0; j <= 60; j++) {
                const u = j / 60;
                const x = (u - 0.5) * 7;
                const y = Math.sin(u * 6 + t * 1.1 + rb.seed) * 1.1 * amp + (ri - RC / 2) * 0.32;
                const z = Math.cos(u * 5 + t * 0.9 + rb.seed) * 1.1 * amp;
                arr[j * 3] = x; arr[j * 3 + 1] = y; arr[j * 3 + 2] = z;
              }
              rb.line.geometry.attributes.position.needsUpdate = true;
            });
            group.position.set(tx * 0.4, s * -1.8, s * 1.2);
            group.rotation.set(ty * 0.2 + 0.1, s * 0.6 + tx * 0.3, 0);
            pcloud.rotation.y = t * 0.03; pcloud.position.y = s * -1.4;
          }
        };
      }

      // fallback = blob
      return build(Object.assign({}, c, { mode: 'blob' }));
    }

    function setConfig(c) {
      config = c;
      disposeGroup();
      // remove any stray particle Points added to scene (not group)
      scene.children.filter(o => o.isPoints).forEach(o => { scene.remove(o); if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      built = build(c);
      size();
    }

    const clock = new THREE.Clock();
    let raf;
    function loop() {
      const t = clock.getElapsedTime();
      tx += (mx - tx) * 0.045;
      ty += (my - ty) * 0.045;
      sEase += (sTarget - sEase) * 0.06;
      if (built) built.update(t, sEase);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }

    size();
    if (cfg) setConfig(cfg);
    onScroll();
    loop();

    return {
      setConfig,
      dispose() {
        cancelAnimationFrame(raf);
        removeEventListener('mousemove', onMove);
        removeEventListener('touchmove', onMove);
        removeEventListener('scroll', onScroll);
        removeEventListener('resize', size);
        disposeGroup();
        renderer.dispose();
      }
    };
  }

  window.NNAIScene = { create, MODES };
})();
