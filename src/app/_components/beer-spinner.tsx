"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { Silkscreen } from "next/font/google";

const silkscreen = Silkscreen({
  weight: "400",
  subsets: ["latin"],
});

export function BeerSpinner() {
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const modelRef = useRef<THREE.Object3D>();

  useEffect(() => {
    if (!containerRef.current || rendererRef.current) return;

    const scene = new THREE.Scene();
    const light = new THREE.PointLight(0xffffff, 8, 100);
    light.position.set(0, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 8);
    scene.add(ambientLight);
    scene.background = new THREE.Color(0xffffff); // Set white background
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    cameraRef.current = camera;
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    setIsLoading(true);
    const loader = new FBXLoader(
      new THREE.LoadingManager(
        function onLoad() {
          console.log("Loading finished");
        },
        function onProgress(url, loaded, total) {
          console.log(`loaded: ${loaded}, total: ${total}`);
          if (loaded === total) {
            console.log("loaded === total");
            setIsLoading(false);
          }
        },
      ),
    );
    const modelPath = "/beer/source/Beer.fbx"; // Update path to FBX model
    loader.load(modelPath, (fbx) => {
      const model = fbx;
      model.position.set(0, -20, -150);
      model.scale.set(0.5, 0.5, 0.5);
      modelRef.current = model;
      scene.add(model);
    });

    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        // Model updates here
        modelRef.current.rotation.y -= 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      // Dispose other resources
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform">
          <p className="text-3xl">Pouring beer...</p>
        </div>
      )}
      <div
        className="w-100 h-100 fixed"
        ref={containerRef}
        hidden={isLoading}
      />
      <div className="fixed left-0 right-0 top-20 mx-auto">
        <h1
          className={`z-10 text-center text-5xl text-black ${silkscreen.className}`}
        >
          Comming soon!
        </h1>
      </div>
    </>
  );
}
