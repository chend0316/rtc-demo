let hasMicPermission = false;
let hasCameraPermission = false;
let cameraStream: MediaStream | undefined = undefined;
async function fetchDevicePermission() {
  try {
    if (!hasMicPermission) {
      await navigator.mediaDevices.getUserMedia({audio: true, video: false});
      hasMicPermission = true;
    }
    console.log('mic permission fetched');
  } catch (err) {

  }

  try {
    if (!hasCameraPermission) {
      cameraStream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
      hasCameraPermission = true;
    }
    console.log('camera permission fetched', cameraStream);
  } catch (err) {

  }
}

export async function getCameraStream() {
  await fetchDevicePermission();
  console.log('get camera stream', cameraStream);
  return cameraStream;
}

export interface Device {
  id: string;
  name: string;
  type: 'speaker' | 'camera' | 'mic';
}

export async function getCameraDeviceList(): Promise<Device[]> {
  await fetchDevicePermission();
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
