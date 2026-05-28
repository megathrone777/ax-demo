import React, { Suspense } from "react";
import { Bounds, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Spinner } from "@/ui";

import { wrapperClass, statusClass } from "./Preview.css";

import type { TProps } from "./Preview.types";

const VehicleModel: React.FC = () => {
  const { scene } = useGLTF("model.gltf");

  return <primitive object={scene} />;
};

const Preview: React.FC<TProps> = ({ isOnline }) => (
  <div className={wrapperClass}>
    <p className={statusClass[isOnline ? "online" : "offline"]}>
      {isOnline ? "Online" : "Offline"}
    </p>

    <Suspense fallback={<Spinner />}>
      <Canvas camera={{ fov: 45, position: [5, 3, 5] }}>
        <ambientLight intensity={1} />

        <directionalLight
          intensity={1}
          position={[5, 10, 5]}
        />

        <Bounds
          clip
          fit
          observe
        >
          <VehicleModel />
        </Bounds>

        <OrbitControls makeDefault />
      </Canvas>
    </Suspense>
  </div>
);

export { Preview };
