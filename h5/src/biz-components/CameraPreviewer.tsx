import React, { useEffect, useRef } from 'react';

interface CameraPreviewerProps {
  stream: MediaStream;
  speakerDeviceId?: string;
}

export const CameraPreviewer: React.FC<CameraPreviewerProps> = ({stream, speakerDeviceId}) => {
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoEl.current.srcObject = stream;
    if (speakerDeviceId) {
        (videoEl.current as any).setSinkId(speakerDeviceId);
    }
  }, [stream, speakerDeviceId]);

  return <div>
    <video ref={videoEl} autoPlay playsInline />
  </div>;
};