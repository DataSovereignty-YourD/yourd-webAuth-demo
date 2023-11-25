// websocketState.ts
import {atom} from 'recoil';

export interface WebSocketMessage {
  type: string;
  clientType?: string;
  sessionId?: string;
  msg?: any;
}

interface WebSocketState {
  connection: WebSocket | null;
  isConnected: boolean;
  receivedMessage?: WebSocketMessage | null;
}

export const websocketState = atom<WebSocketState>({
  key: 'websocketState',
  default: {
    connection: null,
    isConnected: false,
    receivedMessage: null,
  },
});
