import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nftDetailsState } from '../state/nftState';
import { IoMdClose } from 'react-icons/io';
import { WebSocketMessage, websocketState } from '../state/websocketState';
import parseWebSocketMessage from '../functions/parseMessage';
import { useNavigate, useLocation } from 'react-router-dom';
import { paymentModalState } from '../state/paymentModalState';
interface Modal2Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal2: React.FC<Modal2Props> = ({ isOpen, setIsOpen }) => {
  return <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />;
};


const SpringModal: React.FC<Modal2Props> = ({ isOpen, setIsOpen }) => {
  const websocket = useRecoilValue(websocketState).connection;
  const navigate = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useRecoilState(paymentModalState);
  useEffect(() => {
    if (!websocket) return;

    const handleMessage = (event: any) => {
      const data = event.data;

      try {
        console.log(data);
        const message = parseWebSocketMessage(String(data));
        console.log(message);
        // params가 예상한 형식인지 확인하고, 맞다면 로직 수행
        if (message && !String(message).startsWith('Connected')) {
          const hash = message.opHash;
          if (hash) {
            setModal(true);
            return setIsOpen(false);
          }
          console.log('Received hash:', hash);
        }
      } catch (error) {
        console.error('Error in processing received message:', error);
      }

      // 필요한 추가 처리
    };

    websocket.addEventListener('message', handleMessage);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      websocket.removeEventListener('message', handleMessage);
    };
  }, [websocket]);

  const reSend=()=> {
    const message = {
      type: 'sendMessage',
      clientType: 'Service',
      sessionId: 'asdfasdf',
      msg: {
        to: 'KT1Hj4q5qBR49oWw4fpkynLd7qW9TNUfvL87',
        amount: '0',
        mutez: false,
        parameter: {
          entrypoint: 'double',
          value: {
            prim: 'Unit',
          },
        },
      },
    };

    // 웹소켓 통신 로직 실행
    console.log(message);
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    }
  }

  const orderTotal = location.state?.orderTotal || '0.00';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-slate-900/20 backdrop-blur-sm p-8 fixed inset-0 z-50 grid place-items-center pb-32 overflow-y-scroll"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-black p-6 rounded-xl min-w-[500px] max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10  border-b-2 pb-4">
              <div className="flex justify-between itmes-center pb-10">
                <h3 className="text-2xl font-bold ">Approval purchase</h3>
                <button onClick={() => setIsOpen(false)}>
                  <IoMdClose size={24} className="hover:text-gray-600" />
                </button>
              </div>
              <div className="w-full bg-gray-100 p-4 rounded-md shadow">
                <div className="mb-6">
                  <button onClick={reSend} className="bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400 w-full">
                    Reconnect
                  </button>
                  <p className="text-sm text-gray-600 mt-2">
                    Choose a shipping address to continue checking out. You'll
                    still have a chance to review and edit your order before
                    it's final.
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Items:</span>
                    <span>--</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping & handling:</span>
                    <span>--</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Total before tax:</span>
                    <span>--</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Estimated tax to be collected:</span>
                    <span>--</span>
                  </div>
                  <div className="flex justify-between mt-4">
                    <span className="text-lg font-bold">Order total:</span>
                    <span className="text-lg font-bold text-red-600">
                      ${orderTotal}
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                  How are shipping costs calculated?
                </div>
              </div>
            </div>
            <div className="text-gray400 font-semibold">
              Go to yourd YourD Pass
            </div>
            <div className="text-gray400 font-semibold">
              You'll be asked to approve this purchase from yourd pass
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal2;
