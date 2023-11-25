// GlobalWebSocketMessageListener.tsx
import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import { eventMeassgeTransactionState } from '../state/eventMesaasge';
import {websocketState} from '../state/websocketState';

const GlobalWebSocketMessageListener = () => {
  const websocket = useRecoilValue(websocketState);
  const [meassage,setMessage] = useRecoilState(eventMeassgeTransactionState)

  useEffect(() => {
    const handleTransfer = async () => {
      console.log(websocket.receivedMessage);

      // const signer = new InMemorySigner(
      //   'edskS7WaYA1kg4NNnVByBEJzYH2nD25VVimVq7LDz7zk2bwjQjQTkF7FhzUDCoo1mLHXkiQduo6ax4MR1xT6VzEGh9wHy4p4YZ',
      // );
      // tezos.setProvider({signer});
      // const transferParam = websocket.receivedMessage as any;
      // console.log(transferParam);

      // try {
      //   const op = await tezos.contract.transfer(transferParam);
      //   await op.confirmation(1);
      //   console.log(`Operation injected: https://ghost.tzstats.com/${op.hash}`);
      // } catch (error) {
      //   console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`);
      // }
    };

    if (websocket.receivedMessage) {
      const receivedMessageType = websocket.receivedMessage;
      console.log(receivedMessageType.msg)
      // switch(receivedMessageType) {
      //   case 'sendMessage':
      //     console.log("send")
      //     // handleTransfer();
      //     break;
      //     default:
      //       console.log("hi")
      // }
    }
  }, [websocket.receivedMessage]);

  return null;
};

export default GlobalWebSocketMessageListener;
