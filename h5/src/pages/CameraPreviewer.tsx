import React, { useEffect, useRef, useState } from 'react';
import { useCameraStream } from '../hooks';
import { Resolution } from './Resolution';

interface CameraPreviewerProps {
  resolution: {
    width: number;
    height: number;
  }
}

export function CameraPreviewer() {
  const videoEl = useRef<HTMLVideoElement>(null);
  const [resolution, setResolution] = useState<any>(); 

  const stream = useCameraStream(resolution);

  useEffect(() => {
    videoEl.current.srcObject = stream;
  }, [stream]);

  // const handleResolutionChange

  return <div>
    <Resolution onChange={setResolution} />
    <video ref={videoEl} autoPlay playsInline />
  </div>;
}