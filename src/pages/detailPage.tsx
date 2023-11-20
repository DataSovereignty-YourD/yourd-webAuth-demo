import nft1 from '../assets/img/DALL·E 2023-11-14 15.31.49 - A high-quality, detailed character design suitable for an NFT. This character should be intricate and visually striking, with a sophisticated and arti.png';
import { FaLink, FaCartPlus, FaHeart } from 'react-icons/fa6';
import Explain from './detail/explain';
import DropDown from '../components/dropDown';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { SlGraph } from 'react-icons/sl';
import { BsTag } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import { MdMenuOpen } from 'react-icons/md';
import ExplainDropDown from './detail/explainDropDown';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { nftDetailsState } from '../state/nftState';
import { useRecoilState } from 'recoil';
import { loginState } from '../state/loginState';
import Login from '../components/login';
import { InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import Modal from '../components/Modal';
import Modal2 from '../components/Modal2';
export default function DetailPage() {
  const nftDetails = useRecoilValue(nftDetailsState);
  let { nftId } = useParams();
  const nftData = nftDetails.find((nft) => nft.id === nftId);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 모달 상태
  const [isOpen, setIsOpen] = useState(false); // 구매 확인 모달 상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState); // 로그인 상태

  useEffect(() => {
    const newWs = new WebSocket('ws://localhost:3005'); // 서버 URL을 사용하세요.
    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      // 로그인이 안 되어 있으면 로그인 모달을 표시
      setShowLoginModal(true);
    } else {
      // 로그인이 되어 있으면 Modal2를 표시
      setIsOpen(true);

      // 웹소켓 통신 로직 실행
      if (ws && nftData) {
        ws.send(
          JSON.stringify({
            action: 'buy',
            nftId: nftData.id,
            price: nftData.price,
          })
        );
      }
    }
  };

  if (!nftData) {
    return <div>NFT not found</div>;
  }

  return (
    <div className="w-full min-h-screen flex justify-center pt-24 mb-10">
      <div className="flex gap-20">
        <div>
          <div className="w-[500px] h-10 bg-white rounded-t-xl border border-slate-300 flex items-center justify-between px-6">
            <span className="text-blue-500 text-xl">ꜩ</span>
            <span className="font-medium text-gray-500">{nftData.price}</span>
          </div>
          <img
            src={nftData.src}
            alt={nftData.alt}
            className="w-[500px] h-[550px] rounded-b-xl"
          />
          <Explain nftData={nftData} />
          <ExplainDropDown />
        </div>
        <div className="flex-col">
          <h1 className="text-xl">{nftData.artist}</h1>
          <h2 className="text-4xl mt-4 font-bold">{nftData.title}</h2>
          <div className="flex gap-4 mt-6 items-center">
            <span className="font-bold text-2xl">Token ID:</span>
            <span className="font-semibold">{nftData.tokenID}</span>
            <span className="flex items-center gap-1 text-lg">
              <FaLink /> IPFS
            </span>
            <span className="flex items-center gap-1 text-lg">
              <FaLink /> metadata
            </span>
          </div>
          <p className="mt-2">
            StandForRoyalties & pledge your support for the people who have made
            Web3 what it is today.
            <br /> No Speculation. No Utility. Just solidarity.
          </p>
          <div className="w-[700px] h-[300px] border mt-10 px-6">
            <h1 className="mt-4">Current Price</h1>
            <p className="font-bold text-4xl mt-4">{nftData.price}</p>
            <div className="flex justify-between mt-6">
              <Modal2 isOpen={isOpen} setIsOpen={setIsOpen} selectedNftId={nftId || ''}  />
              <button
                className="w-[300px] h-10 bg-yellow-400 hover:bg-yellow-600 flex items-center justify-center"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
              <button className="w-[300px] h-10 bg-gray-200 hover:bg-gray-500">
                More Info
              </button>
            </div>
            <div className="flex mt-8 gap-2">
              <FaHeart className="text-red-600 pt-1" />
              <p className="font-semibold">
                Creator Support: This listing is paying suggested creator
                revenue to the creator of the collection.
              </p>
            </div>
          </div>
          <DropDown
            title={
              <div className="flex items-center gap-2">
                <SlGraph size={24} />
                <span className="font-bold">Price history</span>
              </div>
            }
          >
            <div className="">
              <FaRegClock />
              <span></span>
            </div>
          </DropDown>

          <DropDown
            title={
              <div className="flex items-center gap-2">
                <BsTag size={24} /> <span className="font-bold">Listings</span>
              </div>
            }
          >
            <div>{/* 여기에 드롭 다운 내부에 표시할 내용 */}</div>
          </DropDown>

          <DropDown
            title={
              <div className="flex items-center gap-2">
                <MdMenuOpen size={24} />{' '}
                <span className="font-bold">Offers</span>
              </div>
            }
          >
            <div>{/* 여기에 드롭 다운 내부에 표시할 내용 */}</div>
          </DropDown>
        </div>
      </div>
    </div>
  );
}
