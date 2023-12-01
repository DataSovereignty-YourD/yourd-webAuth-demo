import { Link } from 'react-router-dom';
import Site from '../../assets/img/site.png';
import P1 from '../../assets/img/p1.png';
import P2 from '../../assets/img/p2.png';
import P3 from '../../assets/img/p3.png';
import P4 from '../../assets/img/p4.png';
import P5 from '../../assets/img/p5.png';
import P6 from '../../assets/img/p6.png';
import P7 from '../../assets/img/p7.png';
import P8 from '../../assets/img/p8.png';
import P9 from '../../assets/img/p9.png';
import P10 from '../../assets/img/p10.png';
import P11 from '../../assets/img/p11.png';
import P12 from '../../assets/img/p12.png';
import Deal from '../../assets/img/deal.png';
export default function MainHero() {
  return (
    <div className="w-full min-h-screen px-10 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#243a459d] via-white to-[#243a459d] ">
        <img src={Site} alt="site" className="" />
      </div>
      <div className="relative z-10 grid grid-cols-4 gap-8 pt-80">
        <div className="bg-yellow-50 w-[352px] h-[422px]">
          <div className="font-bold text-xl mt-4 pl-4">Best Deal</div>
          <Link to='/bestdeal'>
            <img
              src={Deal}
              alt="deal"
              className="w-[320px] h-[300px] ml-4 mt-2"
            />
            <button className="text-sm text-green-800 font-bold pt-6 pl-4 hover:text-slate-800">
              Explore more
            </button>
          </Link>
        </div>
        <div className="bg-yellow-50 w-[352px] h-[422px]">
          <div className="font-bold text-xl mt-4 pl-2">
            Fashion trends you like
          </div>
          <div className="grid grid-cols-2 pt-4 pl-4 gap-1">
            <div>
              <img src={P1} alt="p1" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Dresses</h1>
            </div>
            <div>
              <img src={P2} alt="p2" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Knits</h1>
            </div>
            <div>
              <img src={P3} alt="p3" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Jackets</h1>
            </div>
            <div>
              <img src={P4} alt="p4" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Jewelry</h1>
            </div>
          </div>
          <button className="text-sm text-green-800 font-bold pt-10 pl-4 hover:text-slate-800">
            Explore more
          </button>
        </div>
        <div className="bg-yellow-50 w-[352px] h-[422px] ">
          <div className="font-bold text-xl mt-4 pl-4">Refresh your space</div>
          <div className="grid grid-cols-2 pt-4 pl-4 gap-1">
            <div>
              <img src={P5} alt="p5" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Dining</h1>
            </div>
            <div>
              <img src={P6} alt="p6" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Home</h1>
            </div>
            <div>
              <img src={P7} alt="p7" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Kitchen</h1>
            </div>
            <div>
              <img src={P8} alt="p8" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Health and Beauty</h1>
            </div>
          </div>
          <button className="text-sm text-green-800 font-bold pt-10 pl-4 hover:text-slate-800">
            See more
          </button>
        </div>
        <div className="bg-yellow-50 w-[352px] h-[422px] ">
          <div className="font-bold text-xl mt-4 pl-4">
            Easy Updates for elevated spaces
          </div>
          <div className="grid grid-cols-2 pt-4 pl-4 gap-1">
            <div>
              <img src={P9} alt="p9" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Baskets & hampers</h1>
            </div>
            <div>
              <img src={P10} alt="p10" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Hardware</h1>
            </div>
            <div>
              <img src={P11} alt="p11" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Accent furniture</h1>
            </div>
            <div>
              <img src={P12} alt="p12" className="w-[150px] h-[116px]" />
              <h1 className="font-bold text-sm">Wallpaper % paint</h1>
            </div>
          </div>
          <button className="text-sm text-green-800 font-bold pt-10 pl-4 hover:text-slate-800">
            Shop home products
          </button>
        </div>
        <div className="bg-yellow-50 w-[352px] h-[422px] ">
          <div className="font-bold text-xl mt-4 pl-4">
            Beauty steals under $30
          </div>
        </div>
        <div className="bg-yellow-50 w-[352px] h-[422px] ">
          <div className="font-bold text-xl mt-4 pl-2">
            Free international returns
          </div>
        </div>
        <div className="bg-yellow-50 w-[352px] h-[422px] ">
          <div className="font-bold text-xl mt-4 pl-2">
            Shop holday gift guides
          </div>
        </div>
        <div className="bg-yellow-50 w-[352px] h-[422px] ">
          <div className="font-bold text-xl mt-4 pl-2">Toys under $25</div>
        </div>
      </div>
    </div>
  );
}
