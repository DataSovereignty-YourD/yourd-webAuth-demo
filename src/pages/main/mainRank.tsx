import { useState } from 'react';
export default function MainRank() {
  const [activeButton, setActiveButton] = useState('popular');

  const handleButtonClick = (button: any) => {
    setActiveButton(button);
    // Update items based on the button clicked if needed
  };

  const items = [
    {
      id: 1,
      image: '/path-to-image-1.png',
      name: 'Item 1',
      price: '0.01 ETH',
      volume: '0.32 ETH',
    },
    {
      id: 2,
      image: '/path-to-image-2.png',
      name: 'Item 2',
      price: '0.77 ETH',
      volume: '88 ETH',
    },
    {
      id: 3,
      image: '/path-to-image-2.png',
      name: 'Item 2',
      price: '0.77 ETH',
      volume: '88 ETH',
    },
    {
      id: 4,
      image: '/path-to-image-2.png',
      name: 'Item 2',
      price: '0.77 ETH',
      volume: '88 ETH',
    },
    {
      id: 5,
      image: '/path-to-image-2.png',
      name: 'Item 2',
      price: '0.77 ETH',
      volume: '88 ETH',
    },
    // 더 많은 아이템들...
  ];

  return (
    <div className="w-full min-h-[800px] bg-white">
      <div>
        <div className="flex justify-start pt-12 pl-10 gap-4">
          <button
            className={`w-[80px] h-12 px-4 py-2 focus:outline-none ${
              activeButton === 'popular'
                ? 'bg-gray-400 text-black'
                : 'bg-slate-200 text-gray-500'
            }`}
            onClick={() => handleButtonClick('popular')}
          >
            인기
          </button>
          <button
            className={`w-[80px] h-12 px-4 py-2 focus:outline-none ${
              activeButton === 'top'
                ? 'bg-gray-400 text-black'
                : 'bg-slate-200 text-gray-500'
            }`}
            onClick={() => handleButtonClick('top')}
          >
            최고
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 border-r-2 space-y-4 p-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <div>{item.id}</div>
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-cover"
              />
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>{item.volume}</div>
            </div>
          ))}
        </div>
        <div className="w-1/2 space-y-4 p-4">
          {/* 여기에 똑같은 구조의 아이템 리스트를 만들거나 다른 내용을 배치할 수 있습니다. */}
        </div>
      </div>
    </div>
  );
}
