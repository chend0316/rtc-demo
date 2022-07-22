import { useEffect, useRef, useState } from 'react';
import { Device, getCameraDeviceList, getCameraStream, getMicStream } from '../services/device';

export function useCameraDeviceList() {
  const [cameraList, setCameraList] = useState<Device[]>([]);

  useEffect(() => {
    getCameraDeviceList().then(setCameraList);
  }, []);

  return {cameraList};
}

// export function useFetchDevicePermission() {
//   useEffect(() => {
//     useFetchDevicePermission();
//   }, []);
// }

export function useMicStream() {
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    getMicStream().then(setStream);
  },[]);

  return stream;
}

export function useCameraStream(resolution?: { width: number, height: number }) {
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    getCameraStream().then(setStream);
  },[]);

  useEffect(() => {
    if (stream && resolution) {
      const track = stream.getVideoTracks()[0];
      const constraints = {width: {exact: resolution.width}, height: {exact: resolution.height}};
      console.log('change resolution to', resolution.width, resolution.height);
      track.applyConstraints(constraints);
    }
  }, [stream, resolution]);

  return stream;
}
