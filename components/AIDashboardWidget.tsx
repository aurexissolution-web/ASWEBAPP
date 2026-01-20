import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

type Metrics = {
  queries: string;
  uptime: string;
  velocity: string;
};

interface Props {
  metrics?: Metrics;
}

const defaultMetrics: Metrics = {
  queries: '24k Queries',
  uptime: '98% Uptime',
  velocity: '5x Velocity'
};

const AIDashboardWidget: React.FC<Props> = ({ metrics = defaultMetrics }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const inViewRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(18, 20, 22);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    const resize = () => {
      const target = inViewRef.current;
      const width = Math.min(target?.clientWidth ?? 480, 520);
      renderer.setSize(width, width);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0x6ee7ff, 0.8);
    dir.position.set(10, 15, 10);
    scene.add(dir);

    const cubeGeo = new THREE.BoxGeometry(6, 6, 6);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x203fef,
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0x0f1a4b,
      emissiveIntensity: 0.7
    });
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    scene.add(cube);

    const orbitOrbs = [
      { color: 0x10b981, position: new THREE.Vector3(-11, 4, 0) },
      { color: 0x38bdf8, position: new THREE.Vector3(10, 5, 2) },
      { color: 0xa855f7, position: new THREE.Vector3(0, -4, 11) }
    ];

    orbitOrbs.forEach((orb) => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(2.3, 32, 32),
        new THREE.MeshStandardMaterial({
          color: orb.color,
          emissive: orb.color,
          emissiveIntensity: 0.45,
          transparent: true,
          opacity: 0.9
        })
      );
      sphere.position.copy(orb.position);
      scene.add(sphere);

      const cylinderGeo = new THREE.CylinderGeometry(0.4, 0.4, orb.position.length(), 16, 1, true);
      const cylinder = new THREE.Mesh(
        cylinderGeo,
        new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x0ea5e9, emissiveIntensity: 0.5 })
      );
      cylinder.position.copy(orb.position.clone().multiplyScalar(0.5));
      cylinder.lookAt(cube.position);
      cylinder.rotateX(Math.PI / 2);
      scene.add(cylinder);
    });

    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 250;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 256;
    spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0ea5e9';
      ctx.font = 'bold 26px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('SOC 2 ✓', 128, 40);
    }
    const spriteTexture = new THREE.CanvasTexture(spriteCanvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture, transparent: true });
    const badge = new THREE.Sprite(spriteMaterial);
    badge.position.set(0, 8, -8);
    scene.add(badge);

    let frameId: number;
    const animateScene = () => {
      frameId = requestAnimationFrame(animateScene);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.015;
      particles.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    animateScene();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      scene.clear();
    };
  }, [metrics]);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#050b1c] to-[#0f1a32]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.35),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(120deg,rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px)',
          backgroundSize: '120px 120px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs uppercase tracking-[0.4em] text-cyan-200">
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
            Data Intelligence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Unlock AI Data Mastery</h2>
          <p className="text-lg text-slate-200">
            Transform raw data into predictive power—secure warehouses, neural insights, and 5× business velocity.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold shadow-[0_20px_45px_rgba(59,130,246,0.4)]"
            >
              Launch Demo
            </motion.button>
            <button className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors">
              Book AI Audit
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[metrics.queries, metrics.uptime, metrics.velocity].map((metric, idx) => (
              <motion.div
                key={metric}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-[0_12px_30px_rgba(15,23,42,0.4)]"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  {['Queries', 'Uptime', 'Velocity'][idx]}
                </p>
                <p className="text-2xl font-semibold text-white mt-2">{metric}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div ref={inViewRef} className="relative flex flex-col gap-6 items-center">
          <div className="relative w-full max-w-[420px]">
            <canvas ref={canvasRef} className="hidden md:block mx-auto" />
            <div className="md:hidden rounded-[32px] border border-cyan-400/30 bg-gradient-to-br from-[#041128] to-[#060e20] p-10 text-center text-white">
              Interactive 3D hologram optimized for larger screens.
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="w-full rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Neural Revenue Projection</p>
              <span className="text-xs text-cyan-200">Live</span>
            </div>
            <div className="flex items-end gap-3 h-32">
              {[40, 55, 72, 90, 110].map((height, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${height}%` } : {}}
                  transition={{ delay: idx * 0.1 }}
                  className="flex-1 rounded-full bg-gradient-to-t from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_15px_35px_rgba(88,28,135,0.45)]"
                  style={{ minHeight: '20%' }}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-200">
              <span>Past 5 quarters</span>
              <span className="font-semibold text-white">+64%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIDashboardWidget;
