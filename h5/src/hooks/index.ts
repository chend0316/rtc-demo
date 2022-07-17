import { useEffect, useState } from "react";
import { Device, getCameraDeviceList, getCameraStream } from "../services/device";

export function useCameraDeviceList() {
  const [cameraList, setCameraList] = useState<Device[]>([]);

  useEffect(() => {
    getCameraDeviceList().then(setCameraList);
  }, []);

  return {cameraList};
}

export function useFetchDevicePermission() {
  useEffect(() => {
    useFetchDevicePermission();
  }, []);
}

export function useCameraStream() {
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    getCameraStream().then(setStream);
  },[]);

  return {stream};
}
