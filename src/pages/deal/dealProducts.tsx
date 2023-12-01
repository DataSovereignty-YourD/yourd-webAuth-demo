import React from 'react';
import { useRecoilValue } from 'recoil';
import { productsState } from '../../state/product';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useToggleFavorite } from '../../hooks/useToggleFavorite';

export default function DealProducts() {
  const products = useRecoilValue(productsState);
  const toggleFavorite = useToggleFavorite();

  return (
    <div className="w-full min-h-screen flex justify-center flex-wrap">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-[315px] h-[355px] bg-white flex flex-col justify-center border"
        >
          <img
            src={product.src}
            alt={product.alt}
            className="w-[315px] h-[260px]"
          />
          <div className="font-semibold mt-3 pl-4">{product.title}</div>
          <div className="flex items-center justify-evenly">
            <span className="text-red-600">{product.rate}</span> 
            ${product.nowPrice}
            <span className="text-sm text-gray-500">
              List Price: $
              <span className="line-through">{product.listPrice}</span>
            </span>
            <button onClick={() => toggleFavorite(product.id)}> {/* 여기를 수정했습니다 */}
              {product.isFavorited ? (
                <FaHeart color="red" size={20} />
              ) : (
                <FaRegHeart size={20} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
