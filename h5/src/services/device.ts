let _hasMicPermission = false;
let _hasCameraPermission = false;

export async function getCameraStream() {
  try {
    const cameraStream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
    _hasCameraPermission = true;
    console.log('camera permission fetched');
    return cameraStream;
  } catch (err) {
    _hasCameraPermission = false;
    return null;
  }
}

export async function getMicStream() {
  try {
    const micStream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});
    _hasMicPermission = true;
    console.log('camera permission fetched');
    return micStream;
  } catch (err) {
    _hasMicPermission = false;
    return null;
  }
}

export function hasMicPermission() {
  return _hasMicPermission;
}

export function hasCameraPermission() {
  return _hasCameraPermission;
}

export interface Device {
  id: string;
  name: string;
  type: 'speaker' | 'camera' | 'mic';
}

export async function getCameraDeviceList(): Promise<Device[]> {
  const list = await navigator.mediaDevices.enumerateDevices();
  return list.filter(item => item.kind === 'videoinput')
    .map(item => {
      return {
        name: item.label,
        id: item.deviceId,
        type: 'camera',
      };
    });
}
