import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import Visa from '../assets/img/visa.png';
import PayPal from '../assets/img/paypal.png';
import MasterCard from '../assets/img/mastercard.png';
// import CryptoPay from '../assets/img/yourdpassbutton.png';
import { loginState } from '../state/loginState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { websocketState } from '../state/websocketState';
import Modal2 from '../components/Modal2';
import { TransactionSuccessModal } from '../components/transactionModal';

export default function CheckOutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
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
          amount: '45.99',
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
      <TransactionSuccessModal />
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
          <div className="flex-1 shadow-xl bg-white p-6 mt-5">
            <h1 className="text-2xl font-bold mb-4">Choose a Payment Method</h1>

            {/* Discount offer */}
            <div className="bg-blue-100 p-4 rounded-md mb-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold">
                  Pay &nbsp;
                  <span className="text-lg font-bold text-red-600 ">
                    ${orderTotal}
                  </span>{" "}
                  &nbsp; for this order with a{" "}
                  <span className="text-blue-700 cursor-pointer hover:text-blue-900">
                    $60 NFT Gift Card{" "}
                  </span>{" "}
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
                <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
                <div className="flex w-full items-center drop-shadow-md">
                  <div className='flex bg-white w-1/5 items-center justify-center'>
                    {/* <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentPlan"
                      className="h-4 w-4 text-blue-600"
                    /> */}
                    <label
                      htmlFor="paymentPlan"
                      className="ml-2 text-sm font-medium text-gray-700 flex items-center"
                    >
                      <img src={Visa} alt="visa" />
                    </label>
                    {/* <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentPlan"
                      className="h-4 w-4 text-blue-600"
                    /> */}
                    <label
                      htmlFor="paymentPlan"
                      className="ml-2 text-sm font-medium text-gray-700 flex items-center"
                    >
                      <img src={PayPal} alt="paypal" className="w-8 h-8" />
                    </label>
                    {/* <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentPlan"
                      className="h-4 w-4 text-blue-600"
                    /> */}
                    <label
                      htmlFor="paymentPlan"
                      className="ml-2 text-sm font-medium text-gray-700 flex items-center"
                    >
                      <img src={MasterCard} alt="visa" />
                    </label>
                    {/* <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentPlan"
                      className="h-4 w-4 text-blue-600"
                    /> */}
                    {/* <label
                      htmlFor="paymentPlan"
                      className="ml-2 text-sm font-medium text-gray-700 flex items-center"
                    >
                      <img
                        src={CryptoPay}
                        alt="crypto"
                        className="w-14 h-14  object-contain"
                      />
                    </label> */}
                  </div>
                </div>
              </div>
              <div className="">
                <div className="text-lg font-semibold mb-2">
                  Pay with another payment method
                </div>
                
                  <button onClick={handleBuyNow} className='bg-[#fccc00] active:drop-shadow-none w-1/5 py-2 text-xl font-bold text-center  drop-shadow-md pl-4'>Your<span className=''>D</span> Pay</button>
                  {/* <img src={require("../assets/img/yourdpassbutton.png")} className="h-14 object-contain" /> */}
              </div>

              {/* <div>
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
              </div> */}

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

            <div className="mt-8">
              <Modal2 isOpen={isOpen} setIsOpen={setIsOpen} />
              {/* <button
                onClick={handleBuyNow}
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200 ease-in-out"
              >
                Use this payment method
              </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
