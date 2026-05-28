import { useMap } from "@vis.gl/react-maplibre";

import type { TUseMapImage } from "./types";

const useMapImage: TUseMapImage = (mapID) => {
  const { [mapID]: map } = useMap();

  return (url: string, name: string) => {
    if (map) {
      map.loadImage(url).then(({ data: image }) => {
        if (!map.hasImage(name)) map.addImage(name, image, { sdf: false });
      });
    }
  };
};

export { useMapImage };
