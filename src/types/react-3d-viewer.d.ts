declare module "react-3d-viewer" {
  interface TGLTFModelProps {
    antialias: boolean;
    background: string;
    height: number;
    onLoad?: () => void;
    onProgress?: () => void;
    src: string;
    width: number;
  }

  const GLTFModel: {
    (props: TGLTFModelProps): React.ReactElement;
  };

  export { GLTFModel };
}
