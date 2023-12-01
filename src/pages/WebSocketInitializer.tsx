// WebSocketInitializer.tsx
import React from 'react';

import useGlobalWebSocket from '../hooks/useGlobalWebSocket';
// import {network} from '../api';

const WebSocketInitializer = () => {
  useGlobalWebSocket(`ws://192.168.1.100:2000`);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};

export default WebSocketInitializer;
