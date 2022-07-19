import React, { useState } from 'react';

const configList = [
  {
    label: '1080p',
    height: 1080,
    width: 1920
  },
  {
    label: '720p',
    height: 720,
    width: 1280
  },
  {
    label: '480p',
    height: 480,
    width: 640,
  },
  {
    label: '240p',
    height: 240,
    width: 320,
  },
];
const defaultResolution = '720p';

interface ResolutionProps {
  onChange(value: { width: number, height: number}): void;
}

export function Resolution(props: ResolutionProps) {
  const [resolution, setResolution] = useState(defaultResolution);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (a) => {
    setResolution(a.target.value);
    const config = configList.filter(config => config.label === a.target.value)[0];
    props.onChange(config);
  };

  return <div>
    <select onChange={handleChange} value={resolution}>
      {
        configList.map(item => <option key={item.label} value={item.label}>{item.label}</option>)
      }
    </select>
  </div>;
}