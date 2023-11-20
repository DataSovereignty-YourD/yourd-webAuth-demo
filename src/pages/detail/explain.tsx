import { HiMenuAlt2 } from 'react-icons/hi';
import { useRecoilValue } from 'recoil';
import { nftDetailsState } from '../../state/nftState';
import { NFTDetails } from '../../state/nftState';

type ExplainProps = {
  nftData: NFTDetails;
};


export default function Explain({ nftData }: ExplainProps) {
  return (
    <div className="w-[500px] h-[250px] overflow-scroll  mt-6 border border-gray-300 ">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 w-[500px] h-[50px] bg-white border-b border-gray-300 flex items-center px-4 gap-2">
        <HiMenuAlt2 size={20} />
        <h1 className="font-bold">explanation</h1>
      </div>
      <p className="px-4 py-4">
        <h1 className="flex">
          <span className="text-gray-400 font-medium">producer:&nbsp;</span>
          <span className="font-semibold">{nftData.artist}</span>
        </h1>
       {nftData.description}
      </p>
    </div>
  );
}
