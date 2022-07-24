import React, { useEffect, useState } from 'react';
import { SoundMeter } from '../services/SoundMeter';

interface VolumeProps {
    stream: MediaStream;
}
export const Volume: React.FC<VolumeProps> = ({stream}) => {
    const [volume, setVolume] = useState(0);

    useEffect(() => {
        if (!stream) { return; }
        const soundMeter = new SoundMeter();
        soundMeter.connectToSource(stream);
        const timerId = setInterval(() => {
            setVolume(Math.floor(soundMeter.instant * 100) / 100);
        }, 200);
        return () => {
            clearInterval(timerId);
            soundMeter.stop();
        };
    }, [stream]);

    return <div>
        <p>音量</p>
        {volume * 100} %
        <div style={{
                width:(volume * 348) + 'px',
                height:'10px',
                backgroundColor:'#8dc63f',
                marginTop:'20px',
            }}/>
    </div>;
};