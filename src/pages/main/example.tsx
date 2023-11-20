import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiMousePointer } from 'react-icons/fi';
import { nftDetailsState } from '../../state/nftState';
import { useRecoilValue } from 'recoil';
import { NFTDetails } from '../../state/nftState';
const Example = () => {
    const nftDetailsArray = useRecoilValue(nftDetailsState);

    // 첫 번째 NFT 상세 정보를 가져옵니다.
    const firstNftDetails = nftDetailsArray[0];
  return (
    <div className="grid w-full place-content-center  px-4 py-12 text-slate-900">
      <TiltCard nftDetails={firstNftDetails}/>
    </div>
  );
};
interface TiltCardProps {
  nftDetails: NFTDetails;
}
const TiltCard = ({ nftDetails }: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ['17.5deg', '-17.5deg']
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ['-17.5deg', '17.5deg']
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-r from-[#243a459d] via-white to-[#243a459d]"
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        {/* <FiMousePointer
          style={{
            transform: 'translateZ(75px)',
          }}
          className="mx-auto text-4xl"
        /> */}
        <img src={nftDetails.src} alt={nftDetails.alt} className='pb-12'/>
        <p
          style={{
            transform: 'translateZ(50px)',
          }}
          className="flex text-2xl font-bold "
        >
          {nftDetails.artist}
          {nftDetails.price}
        </p>
      </div>
    </motion.div>
  );
};

export default Example;
