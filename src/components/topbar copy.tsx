import React, { useState, useEffect } from "react";
import Logo from "../assets/img/YourD-Logo-high.png";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "./loginButton";
import Login from "./login";
import { useRecoilState } from "recoil";
import { loginState } from "../state/loginState";
import { websocketState } from "../state/websocketState";
import { BsPersonFill, BsSearch } from 'react-icons/bs';
import Cart from '../assets/img/cart.png';
export default function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [websocket, setWebsocket] = useRecoilState(websocketState);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = () => {
    console.log('검색어:', searchTerm);
  };
  const closeConnection = () => {
    // if (websocket.connection) {
      console.log("close")
      websocket.connection?.close(); // 웹소켓 연결 종료
      setWebsocket({ ...websocket, connection: null, isConnected: false }); // 상태 업데이트
    // }
  };
  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // window 스크롤 위치가 0보다 크면 true, 아니면 false
    const scrolled = window.scrollY > 0;
    setIsScrolled(scrolled);
  };

  // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너를 추가
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 빈 배열은 이 effect가 컴포넌트의 생명주기에 따라 한 번만 실행됨을 의미합니다.

  return (
    <div
      className={` flex w-full fixed top-0 left-0 z-50 transition-all h-14  items-center px-20 justify-between   ${
        isScrolled ? "bg-white border border-b-1 " : ""
      }`}
    >
      <Link to="/">
        <img src={Logo} alt="logo" className="w-16 " />
      </Link>
      {/* <div className="flex items-center gap-4">
        <div
          className={`${
            isScrolled ? 'text-black' : 'text-white'
          } font-bold text-xl`}
        >
          Drop
        </div>

        <div className="">Drop</div>
        <div className="">Drop</div>
      </div>
      */}
       <div className="flex border-2 rounded ml-32">
        <button
          className="flex items-center justify-center px-4 border-r bg-white"
          onClick={handleSearchSubmit}
        >
        <BsSearch/>
        </button>
        <input
          type="text"
          className="px-4 py-2 w-[700px]"
          placeholder="search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {!isLogin.state ? (
        <div>
          <LoginButton setIsOpen={setIsOpen} />
          {isOpen && (
            <Login initialOpen={isOpen} onClose={() => setIsOpen(false)} />
          )}
        </div>
      ) : (
        <button onClick={closeConnection} className={`text-lg font-bold  ${isScrolled?'text-black':'text-white'}`}>UnLink</button>
      )}
       <button className="flex items-center gap-2 bg-opacity-25 rounded-lg hover:bg-[#7c878d9d]">
        <img src={Cart} alt="cart" />
        <div className="text-lg font-semibold">cart</div>
      </button>
    </div>
  );
}
