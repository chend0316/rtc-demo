import React, { useEffect, useRef } from 'react';
import { useCameraStream } from '../hooks';


export function JoinMeeting() {
  const cameraEl = useRef<HTMLVideoElement>(null);
  const {stream: cameraStream} = useCameraStream();

  useEffect(() => {
    if (cameraStream) {
      cameraEl.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  return <div>
    {
      cameraStream
        ? <video ref={cameraEl} autoPlay playsInline />
        : <div>没画面</div>
    }
  </div>;
}