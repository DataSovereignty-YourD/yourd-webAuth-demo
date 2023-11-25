// useGlobalWebSocket.ts
import {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import { websocketState } from '../state/websocketState';



const useGlobalWebSocket = (url: string) => {
  const setWebSocketState = useSetRecoilState(websocketState);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setWebSocketState({connection: ws, isConnected: true});
      console.log(ws, ' wswsws');
    };

    ws.onmessage = event => {
      console.log(event, 'eventevent');
      const message = event.data;
      setWebSocketState(state => ({...state, receivedMessage: message}));
    };

    ws.onclose = () => {
      setWebSocketState({
        connection: null,
        isConnected: false,
        receivedMessage: null,
      });
    };
  }, [url, setWebSocketState]);

  return null;
};

export default useGlobalWebSocket;
