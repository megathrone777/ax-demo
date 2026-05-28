export interface TConfig extends RTCConfiguration {
  sdpSemantics: string;
}

export interface TProps {
  direction: "front" | "reverse";
  showControls: boolean;
  // ip_addr: string;
}
