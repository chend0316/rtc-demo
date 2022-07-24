import React, { useState } from 'react';
import { CameraPreviewer } from '../biz-components/CameraPreviewer';
import { Volume } from '../biz-components/Volume';
import { useDeviceListByType, useInputStream } from '../hooks';
import { DeviceType } from '../services/device';

export function JoinMeeting() {
  const {
    list: cameraList,
    currentId: cameraDeviceId,
    setCurrentId: setCameraDeviceId
  } = useDeviceListByType(DeviceType.camera);

  const {
    list: speakerList,
    currentId: speakerDeviceId,
    setCurrentId: setSpeakerDeviceId,
  } = useDeviceListByType(DeviceType.speaker);

  const {
    list: micList,
    currentId: micDeviceId,
    setCurrentId: setMicDeviceId,
  } = useDeviceListByType(DeviceType.mic);

  const [muteCamera, setMuteCamera] = useState(false);
  const [muteMic, setMuteMic] = useState(false);

  const { stream } = useInputStream({cameraDeviceId, micDeviceId, muteMic, muteCamera});

  return <div>
    <p>
      摄像头
      <button onClick={() => setMuteCamera(!muteCamera)}>{ muteCamera ? '开摄像头' : '关摄像头'}</button>
    </p>
    <select value={cameraDeviceId} onChange={(e) => setCameraDeviceId(e.target.value)}>
      {cameraList.map(camera => <option key={camera.id} value={camera.id}>{camera.name}</option>)}
    </select>
    <p>扬声器</p>
    <select value={speakerDeviceId} onChange={(e) => setSpeakerDeviceId(e.target.value)}>
      {speakerList.map(speaker => <option key={speaker.id} value={speaker.id}>{speaker.name}</option>)}
    </select>
    <p>
      麦克风
      <button onClick={() => setMuteMic(!muteMic)}>{ muteMic ? '开麦' : '闭麦' }</button>
    </p>
    <select value={micDeviceId} onChange={(e) => setMicDeviceId(e.target.value)}>
      {micList.map(mic => <option key={mic.id} value={mic.id}>{mic.name}</option>)}
    </select>
    <Volume stream={stream} />
    {
      stream
        ? <CameraPreviewer stream={stream} />
        : <div>没画面</div>
    }
  </div>;
}