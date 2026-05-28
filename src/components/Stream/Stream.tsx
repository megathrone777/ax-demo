import React, { useRef } from "react";

import { Icon } from "@/ui";

import { videoClass, controlsClass, errorClass, pauseClass } from "./Stream.css";

import type { TConfig, TProps } from "./types";

const config: TConfig = {
  sdpSemantics: "unified-plan",
};

const connection = new RTCPeerConnection(config);

const Stream: React.FC<TProps> = ({ showControls }) => {
  // const [isLoading, toggleLoading] = useState<boolean>(true);
  // const [isError, toggleError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStreamStop = (): void => {
    connection.close();

    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // useEffect((): VoidFunction => {
  //   (async (): Promise<void> => {
  //     connection.addTransceiver("video", { direction: "recvonly" });

  //     try {
  //       const offer = await connection.createOffer();

  //       await connection.setLocalDescription(offer);
  //       await new Promise<void>((resolve): void => {
  //         const checkState = (): void => {
  //           resolve();
  //         };

  //         if (connection.iceGatheringState === "complete") {
  //           connection.removeEventListener("icegatheringstatechange", checkState);

  //           return;
  //         }

  //         connection.addEventListener("icegatheringstatechange", checkState);
  //       });
  //       const { sdp, type }: RTCSessionDescription = connection.localDescription!;

  //       const response = await fetch(
  //         `http://${import.meta.env.APP_STREAM_IP}/stream/${direction}`,
  //         {
  //           body: JSON.stringify({
  //             sdp,
  //             type,
  //           }),
  //           method: "POST",
  //         },
  //       );

  //       if (response.ok) {
  //         const answer = await response.json();

  //         return connection.setRemoteDescription(answer);
  //       }
  //     } catch {
  //       toggleError(true);
  //     } finally {
  //       toggleLoading(false);
  //     }
  //   })();

  //   toggleLoading(true);
  //   connection.addEventListener("track", ({ streams, track }: RTCTrackEvent): void => {
  //     if (videoRef.current && track.kind === "video") {
  //       videoRef.current.srcObject = streams[0];

  //       toggleLoading(false);

  //       return;
  //     }
  //   });

  //   return (): void => {
  //     connection.close();
  //   };
  // }, [direction]);

  return (
    <>
      {/* {isLoading && <Spinner template="small" />} */}
      <p className={errorClass}>No connection.</p>

      <video
        autoPlay
        className={videoClass}
        playsInline
        ref={videoRef}
      />

      {showControls && (
        <div className={controlsClass}>
          <button
            className={pauseClass}
            onClick={handleStreamStop}
            type="button"
          >
            <Icon id="pause" />
          </button>
        </div>
      )}
    </>
  );
};

export { Stream };
