import React, { useEffect } from 'react';
import { deviceManager } from '../services/device';

export function Home() {
  useEffect(() => {
    deviceManager.init();
  }, []);
  return <div>home</div>;
}