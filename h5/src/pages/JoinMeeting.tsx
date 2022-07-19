import React, { useEffect, useRef } from 'react';
import { useCameraStream } from '../hooks';


export function JoinMeeting() {
  const cameraEl = useRef<HTMLVideoElement>(null);
  const stream = useCameraStream();

  useEffect(() => {
    if (stream) {
      cameraEl.current.srcObject = stream;
    }
  }, [stream]);

  return <div>
    {
      stream
        ? <video ref={cameraEl} autoPlay playsInline />
        : <div>没画面</div>
    }
  </div>;
}