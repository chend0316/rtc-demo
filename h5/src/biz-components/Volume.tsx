import React, { useEffect, useState } from 'react';
import { useMicStream } from '../hooks';
import { SoundMeter } from '../services/SoundMeter';

export function Volume() {
    const stream = useMicStream();
    const [volume, setVolume] = useState(0);

    useEffect(() => {
        if (!stream) { return; }
        const soundMeter = new SoundMeter();
        soundMeter.connectToSource(stream);
        const timerId = setInterval(() => {
            const val = soundMeter.instant * 348 + 1;
            setVolume(Math.floor(val * 100) / 100);
        }, 100);
        return () => {
            clearInterval(timerId);
            soundMeter.stop();
        };
    }, [stream]);

    return <div>
        <p>音量</p>
        {volume} %
        <div style={{
                width:volume + 'px',
                height:'10px',
                backgroundColor:'#8dc63f',
                marginTop:'20px',
            }}/>
    </div>;
}