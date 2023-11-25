import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { nftDetailsState } from '../state/nftState';
import { IoMdClose } from 'react-icons/io';
import { WebSocketMessage, websocketState } from '../state/websocketState';
import parseWebSocketMessage from '../functions/parseMessage';

interface Modal2Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedNftId?: string; // 선택적 속성으로 변경
}

const Modal2: React.FC<Modal2Props> = ({
  isOpen,
  setIsOpen,
  selectedNftId,
}) => {
  return (
    <SpringModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      selectedNftId={selectedNftId}
    />
  );
};

const SpringModal: React.FC<Modal2Props> = ({
  isOpen,
  setIsOpen,
  selectedNftId,
}) => {
  const nftDetails = useRecoilValue(nftDetailsState);
  const websocket = useRecoilValue(websocketState).connection;
  const selectedNft = selectedNftId
    ? nftDetails.find((nft) => nft.id === selectedNftId)
    : null;

    useEffect(() => {
      if (!websocket) return;
  
      const handleMessage = (event:any) => {
        const data = event.data;
        
        try {
          console.log(data);
          const message = parseWebSocketMessage(String(data));
          console.log(message);
          // params가 예상한 형식인지 확인하고, 맞다면 로직 수행
          if (message && !String(message).startsWith("Connected")) {
            const hash = message.opHash;
            if(hash) return setIsOpen(false);
            console.log("Received hash:", hash);
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
                  <IoMdClose size={24} className='hover:text-gray-600'/>
                </button>
              </div>
              {selectedNft && (
                <div className="flex gap-6 ">
                  <img
                    src={selectedNft.src}
                    alt={selectedNft.alt}
                    className="w-24 h-24"
                  />

                  <div className="flex justify-between w-full ">
                    <div>
                      <div className="text-lg font-bold">
                        {selectedNft.title}
                      </div>
                      <div className="text-md text-gray-600 "> {selectedNft.artist}</div>
                      <div className="text-md text-gray-600">
                        <span>Chain:</span>tezos
                      </div>
                    </div>
                    <p className="text-lg font-bold mb-4 ">
                      {selectedNft.price}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className='text-gray400 font-semibold'>Go to yourd YourD Pass</div>
            <div className='text-gray400 font-semibold'>You'll be asked to approve this purchase from yourd pass</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal2;
