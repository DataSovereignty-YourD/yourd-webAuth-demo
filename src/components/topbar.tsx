import React, { useState, useEffect } from 'react';
import Logo from '../assets/img/YourD-Logo-high.png';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from './loginButton';
import Login from './login';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '../state/cart';
import { loginState } from '../state/loginState';
import { websocketState } from '../state/websocketState';
import { BsPersonFill, BsSearch } from 'react-icons/bs';
import Cart from '../assets/img/cart.png';
import s1 from '../assets/img/s1.png';
import s2 from '../assets/img/s2.png';
export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [websocket, setWebsocket] = useRecoilState(websocketState);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const cart = useRecoilValue(cartState);
  const itemCount = cart.length;
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = () => {
    console.log('검색어:', searchTerm);
  };
  const closeConnection = () => {
    // if (websocket.connection) {
    console.log('close');
    websocket.connection?.close(); // 웹소켓 연결 종료
    setWebsocket({ ...websocket, connection: null, isConnected: false }); // 상태 업데이트
    // }
  };

  const finishConnection = () => {
    // 로그아웃 상태로 설정
    setIsLogin({
      state: false,
      did: '',
      access_token: '',
    });
    // 추가적으로 필요한 로그아웃 처리 로직이 있다면 여기에 추가
  };
  const navigate = useNavigate();
  const moveToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="flex w-full fixed top-0 left-0 z-50 transition-all h-14  items-center px-20 justify-between  bg-white">
      <Link to="/">
        <img src={Logo} alt="logo" className="w-16 " />
      </Link>

      <div className="flex border-2 rounded ml-24">
        <button
          className="flex items-center justify-center px-4 border-r bg-white"
          onClick={handleSearchSubmit}
        >
          <BsSearch />
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
        <button onClick={closeConnection} className="text-black">
          Sign Out
        </button>
      )}
      {isLogin.state && (
        <div
          className="relative hover:bg-gray-200 "
          onMouseEnter={() => setShowModal(true)}
          onMouseLeave={() => setShowModal(false)}
        >
          <div className="flex items-center">
            <BsPersonFill size={36} />
            <div>
              <div>Hello, User</div>
            </div>
          </div>
          {showModal && (
            <div className="absolute bg-white border w-[500px] h-[350px] z-30 transform -translate-x-60">
              <div className="flex flex-col items-center justify-start h-full">
                {/* 버튼을 위로 올리고 중앙 정렬 */}
                <button
                  onClick={finishConnection} //demo 찍을 때 closeConnection로 바꾸면 됨
                  className="mt-4 w-[200px] rounded-xl px-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2"
                >
                  Sign Out
                </button>

                {/* 섹션 구분선 */}
                <div className="w-full border-t border-gray-300 my-4"></div>

                {/* 내용 섹션 */}
                <div className="flex divide-x divide-gray-300 w-full">
                  {/* 왼쪽 섹션 */}
                  <div className="w-1/2 flex flex-col items-start pl-2">
                    <div className="font-bold text-lg mb-2">Your Lists</div>
                    <Link to="/wishlist">
                      <div className="text-sm mb-1 cursor-pointer hover:text-orange-700">
                        Wish List
                      </div>
                    </Link>
                    <div className="text-sm mb-1 cursor-pointer hover:text-orange-700">
                      Create a List
                    </div>
                    <div className="text-sm cursor-pointer hover:text-orange-700">
                      Find a List or Registry
                    </div>
                  </div>

                  {/* 오른쪽 섹션 */}
                  <div className="w-1/2 flex flex-col justify-center items-start pl-2">
                    <div className="font-bold text-lg mb-2">Your Account</div>
                    <div className="text-sm mb-1 cursor-pointer hover:text-orange-700">
                      Account
                    </div>
                    <div className="text-sm mb-1 cursor-pointer hover:text-orange-700">
                      Orders
                    </div>
                    <div className="text-sm mb-1 cursor-pointer hover:text-orange-700">
                      Recommendations
                    </div>
                    <div className="text-sm mb-1 cursor-pointer hover:text-orange-700">
                      Browsing History
                    </div>
                    <div className="text-sm mb-1 cursor-pointer hover:text-orange-700">
                      Watchlists
                    </div>
                    <div className="text-sm mb-1 cursor-pointer hover:text-orange-700">
                      Video Purchases
                    </div>
                    <div className="text-sm mb-1 cursor-pointer hover:text-orange-700">
                      Subscribe
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={moveToCart}
        className="relative flex items-center gap-2 bg-opacity-25 rounded-lg hover:bg-[#7c878d9d]"
      >
        <img src={Cart} alt="cart" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
        <div className="text-lg font-semibold">cart</div>
      </button>
    </div>
  );
}
