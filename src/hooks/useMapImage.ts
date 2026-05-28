import { useMap } from "@vis.gl/react-maplibre";

const useMapImage = (mapId: TMapId) => {
  const { [mapId]: map } = useMap();

  return (url: string, name: string): void => {
    if (map) {
      map.loadImage(url).then(({ data: image }) => {
        if (!map.hasImage(name)) map.addImage(name, image, { sdf: false });
      });
    }
  };
};

export { useMapImage };
