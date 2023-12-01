import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import Visa from '../assets/img/visa.png';
import PayPal from '../assets/img/paypal.png';
import MasterCard from '../assets/img/mastercard.png';
import CryptoPay from '../assets/img/cryptoPay.png';
import { loginState } from '../state/loginState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { websocketState } from '../state/websocketState';
export default function CheckOutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 구매 확인 모달 상태
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const websocket = useRecoilValue(websocketState).connection;
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      // 로그인이 안 되어 있으면 로그인 모달을 표시
      setShowLoginModal(true);
    } else {
      // 로그인이 되어 있으면 Modal2를 표시
      setIsOpen(true);

      const message = {
        type: 'sendMessage',
        clientType: 'Service',
        sessionId: 'asdfasdf',
        msg: {
          to: 'KT1Hj4q5qBR49oWw4fpkynLd7qW9TNUfvL87',
          amount: '0',
          mutez: false,
          parameter: {
            entrypoint: 'double',
            value: {
              prim: 'Unit',
            },
          },
        },
      };

      // 웹소켓 통신 로직 실행
      console.log(message);
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(message));
      }
    }
  };
  const [address, setAddress] = useState({
    country: '',
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const predefinedAddress = {
    country: 'United States',
    fullName: 'John Doe',
    phoneNumber: '123-456-7890',
    addressLine1: '1234 Address Line 1',
    addressLine2: 'Apt 101',
    city: 'City Name',
    state: 'State Name',
    zipCode: '12345',
  };
  const handleAutofill = () => {
    setAddress(predefinedAddress);
  };
  // 장바구니 페이지에서 넘겨진 주문 총액을 상태로부터 가져옵니다
  const orderTotal = location.state?.orderTotal || '0.00';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 주소 양식을 제출하는 로직을 처리합니다
    navigate('/order-confirmation', { state: { ...address, orderTotal } });
  };
  const [currentStep, setCurrentStep] = useState(1);

  // ... other state initializations

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSubmitAddress = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Process address form submission...
    handleNextStep();
  };
  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="mx-auto mt-10 p-6 max-w-7xl">
      {modal && (
        <div className="w-3/6 bg-white absolute top-[20%] drop-shadow-lg h-3/5 rounded-2xl flex flex-col justify-center items-center">
          <img
            src={require('../assets/img/yellowcheck.png')}
            className="w-32 h-32 mb-10 animate-bounce"
          />
          <div className="text-4xl font-bold mb-14">Successfully Compelete</div>
          <div className="flex gap-10">
            <button
              onClick={() => setModal(false)}
              className="bg-white font-medium px-20 py-3 border border-gray200 rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setModal(false);
                window.location.href =
                  'https://ghostnet.tzkt.io/KT1Hj4q5qBR49oWw4fpkynLd7qW9TNUfvL87/operations/';
              }}
              className="bg-[#fccc00] font-semibold px-20 py-3 border border-gray200 rounded-full"
            >
              See Transactions
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {currentStep === 1 && (
          <div className="flex-1 shadow-xl bg-slate-100">
            <h1 className="text-2xl font-bold mb-4">Shipping Address</h1>
            <button
              onClick={handleAutofill}
              className="py-2 px-4 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded transition duration-200 ease-in-out mb-4"
            >
              Save time. Autofill your current location.
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="country" className="text-sm font-semibold">
                  Country/Region
                </label>
                <select
                  id="country"
                  name="country"
                  value={address.country}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                >
                  <option value="United States">United States</option>
                  {/* Add more countries as needed */}
                </select>

                <label htmlFor="fullName" className="text-sm font-semibold">
                  Full name (First and Last name)
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={address.fullName}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                />

                <label htmlFor="phoneNumber" className="text-sm font-semibold">
                  Phone number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  required
                  value={address.phoneNumber}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                />

                <label htmlFor="addressLine1" className="text-sm font-semibold">
                  Street address or P.O. Box
                </label>
                <input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  required
                  value={address.addressLine1}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                />

                <label htmlFor="addressLine2" className="text-sm font-semibold">
                  Apt, suite, unit, building, floor, etc.
                </label>
                <input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  value={address.addressLine2}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                />

                <label htmlFor="city" className="text-sm font-semibold">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={address.city}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                />

                <label htmlFor="state" className="text-sm font-semibold">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={address.state}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                />

                <label htmlFor="zipCode" className="text-sm font-semibold">
                  ZIP Code
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  required
                  value={address.zipCode}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                />

                <div className="flex items-center">
                  <input
                    id="defaultAddress"
                    type="checkbox"
                    className="mr-2"
                    name="defaultAddress"
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="defaultAddress"
                    className="text-sm font-semibold"
                  >
                    Make this my default address
                  </label>
                </div>
              </div>

              <button
                onClick={handleNextStep}
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              >
                Use this address
              </button>
            </form>
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex-1 shadow-xl bg-white p-6">
            <h1 className="text-2xl font-bold mb-4">Choose a Payment Method</h1>

            {/* Discount offer */}
            <div className="bg-blue-100 p-4 rounded-md mb-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold">
                  Pay &nbsp;
                  <span className="text-lg font-bold text-red-600 ">
                    ${orderTotal}
                  </span>{' '}
                  &nbsp; for this order with a{' '}
                  <span className="text-blue-700 cursor-pointer hover:text-blue-900">
                    $60 NFT Gift Card{' '}
                  </span>{' '}
                  instantly upon approval for Amazon Visa.
                </p>
                <a href="#" className="text-blue-800 text-sm hover:underline">
                  Find out how
                </a>
              </div>
              <div className="bg-yellow-300 p-2 rounded-md hover:bg-yellow-500">
                <p className="text-xs font-semibold cursor-pointer">
                  $60 NFT Gift Card
                </p>
              </div>
            </div>

            {/* Payment method options */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Your credit and debit cards
                </h2>
                <button className="text-blue-600 text-sm hover:underline flex items-center">
                  <span className="material-icons-outlined text-base mr-1">
                    add
                  </span>
                  Add a credit or debit card
                </button>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Payment plans</h2>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentPlan"
                    className="h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="paymentPlan"
                    className="ml-2 text-sm font-medium text-gray-700 flex items-center"
                  >
                    <img src={Visa} alt="visa" />
                  </label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentPlan"
                    className="h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="paymentPlan"
                    className="ml-2 text-sm font-medium text-gray-700 flex items-center"
                  >
                    <img src={PayPal} alt="paypal" className="w-8 h-8" />
                  </label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentPlan"
                    className="h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="paymentPlan"
                    className="ml-2 text-sm font-medium text-gray-700 flex items-center"
                  >
                    <img src={MasterCard} alt="visa" />
                  </label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentPlan"
                    className="h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="paymentPlan"
                    className="ml-2 text-sm font-medium text-gray-700 flex items-center"
                  >
                    <img src={CryptoPay} alt="crypto" className="w-12 h-12" />
                  </label>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Your available balance
                </h2>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter a gift card, voucher or promotional code"
                    className="p-2 border border-gray-300 rounded-l-md flex-1"
                  />
                  <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
                    Apply
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Other payment methods
                </h2>
                <div className="space-y-2">
                  <button className="text-blue-600 text-sm hover:underline flex items-center">
                    <span className="material-icons-outlined text-base mr-1">
                      credit_card
                    </span>
                    Learn more about Store Card
                  </button>
                  <button className="text-blue-600 text-sm hover:underline flex items-center">
                    <span className="material-icons-outlined text-base mr-1">
                      account_balance
                    </span>
                    Add a personal checking account
                  </button>
                  <button className="text-blue-600 text-sm hover:underline flex items-center">
                    <span className="material-icons-outlined text-base mr-1">
                      account_balance_wallet
                    </span>
                    Add your Venmo account
                  </button>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="mt-8">
              <button
                onClick={handleBuyNow}
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200 ease-in-out"
              >
                Use this payment method
              </button>
            </div>
          </div>
        )}

        {/* 주문 요약 섹션 */}
        <div className="md:w-1/3 bg-gray-100 p-4 rounded-md shadow">
          <div className="mb-6">
            <button className="bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400 w-full">
              Use this address
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Choose a shipping address to continue checking out. You'll still
              have a chance to review and edit your order before it's final.
            </p>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items:</span>
              <span>--</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping & handling:</span>
              <span>--</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total before tax:</span>
              <span>--</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Estimated tax to be collected:</span>
              <span>--</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-lg font-bold">Order total:</span>
              <span className="text-lg font-bold text-red-600">
                ${orderTotal}
              </span>
            </div>
          </div>

          <div className="mt-6 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
            How are shipping costs calculated?
          </div>
        </div>
      </div>
    </div>
  );
}
