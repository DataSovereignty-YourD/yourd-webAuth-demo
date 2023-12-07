import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { paymentModalState } from "../state/paymentModalState";

interface TransactionData {
  allocationFee: number;
  amount: number;
  bakerFee: number;
  block: string;
  counter: number;
  gasLimit: number;
  gasUsed: number;
  hasInternals: boolean;
  hash: string;
  id: number;
  level: number;
  parameter: {
    entrypoint: string;
    value: any; // 'value'의 구체적인 타입을 알 수 없으므로 'any' 타입 사용
  };
  sender: {
    address: string;
  };
  status: string;
  storage: string;
  storageFee: number;
  storageLimit: number;
  storageUsed: number;
  target: {
    address: string;
  };
  targetCodeHash: number;
  timestamp: string;
  type: string;
}

 
export function TransactionSuccessModal () {
    const [modal, setModal] = useRecoilState(paymentModalState);
    const [transactionInfo,setTransactionInfo] = useState<TransactionData>();
    const navigate= useNavigate();
    const getTransactions = async()=> { 
      const txInfoRes = await fetch(
        `https://api.ghostnet.tzkt.io/v1/operations/transactions/${modal.hash}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!txInfoRes.ok) {
        throw new Error(`HTTP error! status: ${txInfoRes.status}`);
      }
      const data = await txInfoRes.json();
      
      setTransactionInfo(data[0]);
      
    }
    
    useEffect(()=>{
        if(modal.isVisible) {
            getTransactions();
        }

    },[modal])

    function formatTimestamp(timestamp:any) {
      const date = new Date(timestamp);
      date.setTime(date.getTime() + 9 * 60 * 60 * 1000); // 4시간 추가
      return date.toISOString().replace('T', ' ').slice(0, -5); // ISO 문자열로 변환하고 'T'와 'Z'를 제거
    }

    return (
      <div>
        {modal.isVisible && (
          <div className="w-3/6 left-1/2 -translate-x-1/2 mx-auto bg-white absolute top-[20%] drop-shadow-lg h-3/5 rounded-2xl flex flex-col justify-center items-center z-50">
            <img
              src={require("../assets/img/yellowcheck.png")}
              className="w-32 h-32 mb-10 animate-bounce"
            />
            <div className="text-4xl font-bold mb-10">
              Successfully Compelete
            </div>
            {transactionInfo && (
              <div className="w-full py-5 px-32">
                <div className="flex justify-between">
                  <div>Status</div>
                  <div className="text-blue-500">{transactionInfo.status}</div>
                </div>
                <div className="flex justify-between">
                  <div>Payment amount</div>
                  <div> {transactionInfo.amount / 10 ** 6 ?? 0} XTZ</div>
                </div>
                <div className="flex justify-between">
                  <div> Transaction Fee </div>
                  <div> {transactionInfo.gasUsed / 10 ** 6} XTZ</div>
                </div>
                <div className="flex justify-between">
                  <div> Transaction time </div>
                  <div>
                    {formatTimestamp(transactionInfo.timestamp)}
                  </div>
                </div>
              </div>
            )}
            <div className="flex gap-10">
              <button
                onClick={() => {setModal({ isVisible: false, hash: "" });navigate('/')}}
                className="bg-white font-medium px-20 py-3 border border-gray200 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setModal({ isVisible: false, hash: "" });
                  window.open("https://ghostnet.tzkt.io/KT1Hj4q5qBR49oWw4fpkynLd7qW9TNUfvL87/operations/", "_blank");
                }}
                className="bg-[#fccc00] font-semibold px-20 py-3 border border-gray200 rounded-full"
              >
                See Transactions
              </button>
            </div>
          </div>
        )}
      </div>
    );
}