import React, { useState, useEffect } from 'react';
import Logo from '../assets/img/YourD-Logo-high.png';
import { Link } from 'react-router-dom';
import LoginButton from './loginButton';
import Login from './login';
export default function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // window 스크롤 위치가 0보다 크면 true, 아니면 false
    const scrolled = window.scrollY > 0;
    setIsScrolled(scrolled);
  };

  // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너를 추가
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 빈 배열은 이 effect가 컴포넌트의 생명주기에 따라 한 번만 실행됨을 의미합니다.

  return (
    <div
      className={` flex w-full fixed top-0 left-0 z-50 transition-all h-14  items-center px-20 justify-between   ${
        isScrolled ? 'bg-white border border-b-1 ' : ''
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
      <div>
        <LoginButton setIsOpen={setIsOpen} />
        {isOpen && (
          <Login initialOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </div>
    </div>
  );
}
