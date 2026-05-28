/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  APP_MAPTILER_API_KEY: string;
  APP_ROS_IP: string;
  APP_STREAM_IP: string;
  APP_THUNDERFOREST_API_KEY: string;
  APP_VEHICLE_IP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
