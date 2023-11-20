import logo1 from "../../assets/img/logo1.png";
import logo2 from "../../assets/img/logo2.png";
import logo3 from "../../assets/img/logo3.png";
import logo4 from "../../assets/img/logo4.png";
import logo5 from "../../assets/img/logo5.png";
import logo6 from "../../assets/img/logo6.png";
import logo7 from "../../assets/img/logo9.png";
import logo8 from "../../assets/img/logo8.png";
import logo9 from "../../assets/img/logo7.png";
import logo10 from "../../assets/img/logo10.png";
import logo11 from '../../assets/img/img7.png';
import logo12 from '../../assets/img/img8.png'
import { Link } from "react-router-dom";

export default function MainRank2() {
  const top5Items = [
    {
      number: 1,
      didns: "Cyber.punk",
      open: "#defi",
      img: logo1,
    },
    { number: 2, didns: "Dragomair", open: "#defi", price:'',img: logo2 },
    { number: 3, didns: "Pixelon Dusk", open: "#defi", img: logo11 },
    { number: 4, didns: "Space.zero", open: "#defi", img: logo4 },
    { number: 5, didns: "DruidNatu", open: "#defi", img: logo5 },
  ];
  const top10Items = [
    { number: 6, didns: "YourD 1.yourd", open: "#defi", img: logo6 },
    { number: 7, didns: "YourD 2.yourd", open: "#defi", img: logo7 },
    { number: 8, didns: "YourD 3.yourd", open: "#defi", img: logo8 },
    { number: 9, didns: "YourD 4.yourd", open: "#defi", img: logo9 },
    { number: 10, didns: "YourD 5.yourd", open: "#defi", img: logo10 },
  ];

  const classify = [
    { name: "Most Popular", number: 1 },
    { name: "Recent", number: 2 },
    { name: "Most Viewed", number: 3 },
  ];

  return (
    <div className=" w-full  flex-col flex h-fit px-10 bg-white py-24">
      <div className="flex  items-start justify-start flex-col gap-2 mb-5">
        <div className="text-xl flex flex-row items-center justify-between w-full font-semibold text-slate-400">
          <div className="text-slate-700 font-bold text-4xl mb-6">
            Top Lists of NFT
          </div>
          <div className="flex flex-row gap-8 ">
            {classify.map((classify, index) => (
              <button
                key={index}
                className="hover:text-white hover:bg-orange-400 rounded-md border p-1"
              >
                {classify.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className=" w-full flex flex-row gap-6">
        <div className="w-full  bg-white ">
          <div className=" grid grid-cols-10  border-b-2 border-black w-full text-slate-600 font-bold">
            <div className=" items-center justify-center flex col-span-1 ">
              Rank
            </div>
            <div className=" col-span-4 px-8  font-bold">Collection</div>
            <div className=" col-span-3  items-center justify-center flex">
            lower limit price
            </div>
          </div>
          {top5Items.map((item) => (
            <div
              key={item.number}
              className="items-center justify-center p-2 border-b-2 border-slate-200 grid grid-cols-8 w-full bg-white hover:bg-slate-200  text-black"
            >
              <div className=" items-center justify-center flex col-span-1  font-bold pr-6">
                {item.number}
              </div>
              <div className=" col-span-6 px-2 p-2 ">
                <div className="flex flex-row gap-4 ">
                  <img
                    src={item.img}
                    alt="logoimage"
                    className="w-20 h-20  bg-white rounded-lg border border-border-slate-500"
                  />
                  <div className="flex flex-col gap-1 justify-center font-bold">
                    {item.didns}
                    <div className="flex flex-row gap-4">
                      {/* <div className="bg-yellow-400 p-1 rounded-md text-black font-bold ">
                        #Defi
                      </div>
                      <div className="bg-yellow-400 p-1 rounded-md text-black font-bold ">
                        #Service
                      </div>
                      <div className="bg-yellow-400 p-1 rounded-md text-black font-bold ">
                        #DID
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/didnspage"
                className="mx-4 col-span-1 items-center justify-center flex border border-slate-300 p-1 rounded-lg bg-yellow-50 font-bold hover:bg-orange-400 hover:text-white"
              >
                Go
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full  bg-white ">
        <div className=" grid grid-cols-10  border-b-2 border-black w-full text-slate-600 font-bold">
            <div className=" items-center justify-center flex col-span-1 ">
              Rank
            </div>
            <div className=" col-span-4 px-8  font-bold">Collection</div>
            <div className=" col-span-3  items-center justify-center flex">
            lower limit price
            </div>
          </div>
          {top10Items.map((item) => (
            <div
              key={item.number}
              className="items-center justify-center p-2 border-b-2 border-slate-200 grid grid-cols-8 w-full bg-white hover:bg-slate-200  text-black"
            >
              <div className=" items-center justify-center flex col-span-1  font-bold pr-6">
                {item.number}
              </div>
              <div className=" col-span-6 px-2 p-2 ">
                <div className="flex flex-row gap-4 ">
                  <img
                    src={item.img}
                    alt="logoimage"
                    className="w-20 h-20 bg-white border border-slate-400  rounded-lg "
                  />
                  <div className="flex flex-col gap-1 justify-center font-bold">
                    {item.didns}
                    
                    {/* <div className="flex flex-row gap-4">
                      <div className="bg-yellow-400 p-1 rounded-md text-black font-bold ">
                        #Defi
                      </div>
                      <div className="bg-yellow-400 p-1 rounded-md text-black font-bold ">
                        #Service
                      </div>
                      <div className="bg-yellow-400 p-1 rounded-md text-black font-bold ">
                        #DID
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <Link
                to="/didnspage"
                className="mx-4 col-span-1 items-center justify-center flex border border-slate-300 p-1 rounded-lg bg-yellow-50 font-bold hover:bg-orange-400 hover:text-white"
              >
                Go
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
