import React from "react";
import { useCameraDeviceList } from "../hooks";

export function DeviceList() {
  const {cameraList} = useCameraDeviceList();

  return <div>
    {
      cameraList.map(camera => <div key={camera.id}>{camera.name}</div>)
    }
  </div>;
}
