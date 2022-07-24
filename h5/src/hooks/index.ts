import { useEffect, useState } from 'react';
import { closeInputStream, Device, DeviceType, getDeviceListByType, getInputStream } from '../services/device';

export function useDeviceListByType(type: DeviceType) {
  const [list, setList] = useState<Device[]>([]);
  const [currentId, setCurrentId] = useState<string>('');

  useEffect(() => {
    getDeviceListByType(type).then(val => {
      setList(val);
      if (!currentId && val.length > 0) {
        setCurrentId(val[0].id);
      }
    });
  }, []);

  return {list, currentId, setCurrentId};
}

interface UseInputStreamParams {
  cameraDeviceId: string;
  micDeviceId: string;
  muteCamera?: boolean;
  muteMic?: boolean;
  resolution?: { width: number; height: number };
}
export function useInputStream(params: UseInputStreamParams) {
  const { cameraDeviceId, micDeviceId, muteCamera, muteMic, resolution } = params;
  const [ stream, setStream ] = useState<MediaStream>();

  useEffect(() => {
    getInputStream({
      cameraDeviceId: !muteCamera ? cameraDeviceId : null,
      micDeviceId: !muteMic ? micDeviceId : null
    })
    .then((v) => {
      console.log(`get input stream success, camera mute: ${muteCamera}, mic mute: ${muteMic}`);
      return v;
    })
    .then(setStream);
    return () => {
      closeInputStream();
    };
  }, [cameraDeviceId, micDeviceId, muteMic, muteCamera]);

  useEffect(() => {
    if (stream && resolution) {
      const track = stream.getVideoTracks()[0];
      const constraints = {width: {exact: resolution.width}, height: {exact: resolution.height}};
      console.log('change resolution to', resolution.width, resolution.height);
      track.applyConstraints(constraints); 
    }
  }, [stream, resolution]);

  return { stream };
}
