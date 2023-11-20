import { IoWalletOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';

interface LoginButtonProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginButton({ setIsOpen }: LoginButtonProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // window 스크롤 위치가 0보다 크면 true, 아니면 false
    const scrolled = window.scrollY > 0;
    setIsScrolled(scrolled);
  };

  const handleClick = () => {
    setIsOpen(true); // Login 컴포넌트를 열기 위해 상태 변경
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 빈 배열은 이 effect가 컴포넌트의 생명주기에 따라 한 번만 실행됨을 의미합니다.

  return (
    <button
      onClick={handleClick}
      className={`${
        isScrolled ? 'bg-[#9caab29d]' : 'bg-transparent'
      } w-[105px] h-[42px] rounded-xl bg-opacity-25 hover:bg-[#7c878d9d]`}
    >
      <div
        className={`${
          isScrolled ? 'text-black' : 'text-white'
        } flex items-center justify-around text-xl font-bold`}
      >
        <IoWalletOutline />
        Auth
      </div>
    </button>
  );
}
