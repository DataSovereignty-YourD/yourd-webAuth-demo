// DropDown.tsx
import { useState, ReactNode } from 'react';
import { MdArrowDropUp, MdOutlineArrowDropDown } from 'react-icons/md';

interface DropDownProps {
  title: ReactNode;
  children: ReactNode;
}

export default function DropDown2({ title, children }: DropDownProps) {
  const [isDropDown, setIsDropDown] = useState(false);
  const toggleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const containerClass = isDropDown 
    ? "w-[500px] h-14 bg-white border  flex items-center justify-between px-6 border-gray-300"
    : "w-[500px] h-14 bg-white border  flex items-center justify-between px-6 border-gray-300";

  return (
    <div>
      <div className={containerClass}>
        {title}
        <button onClick={toggleDropDown}>
          {isDropDown ? <MdArrowDropUp size={20} /> : <MdOutlineArrowDropDown size={20} />}
        </button>
      </div>
      {isDropDown && (
        <div className="w-[500px] min-h-[200px] bg-white border border-t-0 border-gray-300 rounded-b-xl ">
          {children}
        </div>
      )}
    </div>
  );
}
