import React, { useEffect, useRef, useState } from "react";
import { GLTFModel } from "react-3d-viewer";

import { useTheme } from "@/hooks";
import { Spinner } from "@/ui";

import { wrapperClass, statusClass } from "./Preview.css";

import type { TProps } from "./Preview.types";

const Preview: React.FC<TProps> = ({ isOnline }) => {
  const { colors } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const [dimensions, setDimensions] = useState<{
    height: number;
    width: number;
  }>({
    height: 0,
    width: 0,
  });

  const handleModelLoaded = (): void => {
    toggleLoading(false);
  };

  const onResize: ResizeObserverCallback = (entries): void => {
    const { height, width } = entries[0]!.contentRect;

    setDimensions({
      height,
      width,
    });
  };

  useEffect((): VoidFunction => {
    const observer = new ResizeObserver(onResize);

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return (): void => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, [wrapperRef.current]);

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <p className={statusClass[isOnline ? "online" : "offline"]}>{isOnline ? "Online" : "Offline"}</p>

      {wrapperRef.current && (
        <GLTFModel
          antialias
          background={colors.blackDarker}
          height={dimensions.height}
          onLoad={handleModelLoaded}
          src="model.gltf"
          width={dimensions.width}
        />
      )}

      {isLoading && <Spinner />}
    </div>
  );
};

export { Preview };
