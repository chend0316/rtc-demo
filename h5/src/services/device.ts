let prevInputStream: MediaStream | undefined;
export async function getInputStream(params: { cameraDeviceId?: string; micDeviceId?: string }) {
  const {micDeviceId, cameraDeviceId} = params;

  closeInputStream();

  if (!micDeviceId && !cameraDeviceId) return null;
  console.log('start get input stream', cameraDeviceId, micDeviceId);
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: micDeviceId ? { deviceId: micDeviceId } : false,
    video: cameraDeviceId ? { deviceId: cameraDeviceId } : false,
  });
  prevInputStream = stream;
  return stream;
}

export function closeInputStream() {
  if (prevInputStream) {
    prevInputStream.getVideoTracks().forEach(track => track.stop());
    prevInputStream.getAudioTracks().forEach(track => track.stop());
  }
}

export enum DeviceType {
  speaker,
  camera,
  mic
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
}

const deviceKind2Type = {
  videoinput: DeviceType.camera,
  audioinput: DeviceType.mic,
  audiooutput: DeviceType.speaker,
};

const deviceType2Kind: Record<DeviceType, MediaDeviceKind> = {
  [DeviceType.camera]: 'videoinput',
  [DeviceType.mic]: 'audioinput',
  [DeviceType.speaker]: 'audiooutput',
};

async function getDeviceList(): Promise<Device[]> {
  const list = await navigator.mediaDevices.enumerateDevices();
  return list.map(item => ({name: item.label, id: item.deviceId, type: deviceKind2Type[item.kind]}));
}

export async function getDeviceListByType(type: DeviceType) {
  console.log(`get ${type} device list start`);
  const list = await getDeviceList();
  const ret: Device[] = list.filter(item => item.type === type);
  console.log(`get ${type} device list end, length: ${ret.length}`);
  return ret;
}

export class DeviceManager {
  deviceList: Record<DeviceType, Device[]> = {
    [DeviceType.camera]: [],
    [DeviceType.mic]: [],
    [DeviceType.speaker]: [],
  };

  private deviceId: Record<DeviceType, string> = {
    [DeviceType.camera]: '',
    [DeviceType.mic]: '',
    [DeviceType.speaker]: '',
  };

  // get deviceIdList(): Record<DeviceType, string[]> {
  //   return this.deviceIdList.
  // }

  async init() {
    const list = await getDeviceList();
    list.forEach(item => {
      this.deviceList[item.type].push(item);
    });
  }

  changeDevice(type: DeviceType, id: string) {
    this.deviceId[type] = id;
    this.setStoreDeviceId(type, id);
  }

  private setStoreDeviceId(type: DeviceType, id: string) {
    localStorage.setItem(`device_id_${type}`, id);
  }

  private getStoreDeviceId(type: DeviceType) {
    return localStorage.getItem(`device_id_${type}`) || '';
  }

  getCurrentDeviceId(type: DeviceType) {
    const storedId = this.getStoreDeviceId(type);
    if (this.deviceList[type].some(item => item.id === storedId)) {
      return storedId;
    }
    const id = this.deviceId[type];
    if (id) {
      return id;
    }
    return this.deviceId[type].length > 0 ? this.deviceId[type][0] : '';
  }

  getAudioVideoInputStream() {}
}

export const deviceManager = new DeviceManager();
