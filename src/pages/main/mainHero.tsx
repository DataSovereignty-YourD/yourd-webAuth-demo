import { useRecoilValue } from 'recoil';
import { nftDetailsState } from '../../state/nftState';
import nft5 from '../../assets/img/img1.png';
import nft6 from '../../assets/img/img3.png';
import nft7 from '../../assets/img/img4.png';
import { Link } from 'react-router-dom';
export default function MainHero() {
  const nfts = useRecoilValue(nftDetailsState);

  return (
    <div className="w-full min-h-[600px] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#243a459d] via-white to-[#243a459d] blur-sm"></div>
      <div className="relative z-10">
        <div className="w-full flex justify-around pt-20">
          {nfts.map((nft) => (
            <Link key={nft.id} to={`/detail/${nft.id}`}>
              <img
                src={nft.src}
                alt={nft.alt}
                className="relative w-[300px] h-[320px] rounded-t-lg"
              />
              <div className="w-[300px] h-[80px] bg-neutral-950  text-white absolute flex flex-col justify-center px-4 rounded-b-lg">
                <span className='font-bold'>{nft.title}</span>
                <span className='text-gray-300'>{nft.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
