import { useRecoilValue } from 'recoil';
import { favoritedProductsState } from '../state/favoritedProducts';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { useToggleFavorite } from '../hooks/useToggleFavorite';
import { Link } from 'react-router-dom';
import { useAddToCart } from '../hooks/useAddToCart';
// 위시리스트 컴포넌트
export default function WishListPage() {
  const favoritedProducts = useRecoilValue(favoritedProductsState);
  const addToCart = useAddToCart();
  const toggleFavorite = useToggleFavorite();
  const [isSelect, setIsSelect] = useState(false);
  const selectBox = () => {
    setIsSelect(!isSelect);
  };
  return (
    <div className="pt-32 flex flex-col items-center">
      <div className="flex gap-2 mr-[750px] items-center">
        <FaHeart size={32} color="red" />
        <span className="text-4xl font-bold">Wish List</span>
      </div>
      <div className="mt-24  w-full px-72">
        {favoritedProducts.map((product) => (
          <div key={product.id} className="flex border justify-between ">
            <img src={product.src} alt={product.alt} className="w-52 h-52" />
            <div className="py-12 mb-4 ">
              <div className="text-2xl font-bold">{product.title}</div>
              <div className="text-xl font-semibold">
                Price: <span className="text-lg">{product.nowPrice}</span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => toggleFavorite(product.id)} // 즐겨찾기 상태 토글
                  className="w-[120px] h-[40px] bg-white border-t-2 border-t-blue-400 border-2 hover:bg-gray-300"
                >
                  Remove
                </button>
                <button
                  onClick={() => addToCart(product)} // 카트에 제품 추가
                  className="w-[120px] h-[40px] bg-white border-t-2 border-t-blue-400 border-2 hover:bg-gray-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
