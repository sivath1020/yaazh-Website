import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroOrbProps {
  className?: string;
}

export const HeroOrbCanvas: React.FC<HeroOrbProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 90;
    const height = container.clientHeight || 90;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Sphere Geometry & Material
    // Smooth white pearl material with glossy clearcoat matching image 1
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#fcfcfd'),
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
      transmission: 0.15,
      ior: 1.45,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Subtle inner warm gold glow matching logo
    const innerLight = new THREE.PointLight('#FDD460', 1.3, 5);
    innerLight.position.set(0.5, 0.5, 0.5);
    scene.add(innerLight);

    // Main Key Light
    const mainLight = new THREE.DirectionalLight('#ffffff', 2.4);
    mainLight.position.set(2, 4, 3);
    scene.add(mainLight);

    // Soft Ambient Light
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.0);
    scene.add(ambientLight);

    // Royal / Electric Blue Rim Light for brand accent
    const rimLight = new THREE.DirectionalLight('#0073FE', 1.6);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    // Mouse Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 1.5;
      targetY = (e.clientY / innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Subtle float and rotation
      sphere.position.y = Math.sin(elapsedTime * 1.8) * 0.06;
      sphere.rotation.y = elapsedTime * 0.3 + currentX;
      sphere.rotation.x = currentY * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center cursor-pointer select-none ${className}`}
      title="Interactive 3D Sphere - Move cursor to interact"
    >
      {/* Soft dropshadow underneath */}
      <div className="absolute -bottom-3 w-16 h-4 bg-black/10 rounded-full blur-md pointer-events-none transform scale-90" />
    </div>
  );
};
