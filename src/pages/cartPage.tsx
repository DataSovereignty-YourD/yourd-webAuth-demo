import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../state/cart';
import { FaTrashAlt } from 'react-icons/fa';
import { ProductDetails } from '../state/product';
import { Link, useNavigate } from 'react-router-dom';
export default function CartPage() {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const initialQuantities = cartItems.reduce<Record<string, number>>(
      (acc, item) => {
        acc[item.id] = 1; // 기본 수량을 1로 설정합니다.
        return acc;
      },
      {}
    );
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleDelete = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const itemQuantity = quantities[item.id] || 1;
        return total + parseFloat(item.nowPrice) * itemQuantity;
      }, 0)
      .toFixed(2);
  };
  const handleCheckout = () => {
    // calculateTotal 함수는 총 주문 금액을 계산하여 반환합니다.
    const total = calculateTotal();
    navigate('/checkout', { state: { orderTotal: total } });
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div className="flex items-center">
            <img
              src={item.src}
              alt={item.alt}
              className="w-20 h-20 object-cover mr-4"
            />
            <div>
              <div className="font-bold">{item.title}</div>
              <div>$ {item.nowPrice}</div>
              {/* Quantity Selector */}
              <select
                className="border rounded px-2 py-1 text-sm"
                value={quantities[item.id] || 1}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold">
              ${' '}
              {(parseFloat(item.nowPrice) * (quantities[item.id] || 1)).toFixed(
                2
              )}
            </div>

            <FaTrashAlt
              onClick={() => handleDelete(item.id)}
              className="cursor-pointer text-red-500"
            />
          </div>
        </div>
      ))}
      <div className="text-lg font-bold">Subtotal ({cartItems.length} items):</div>
      <div className="text-lg font-bold mt-4">$ {calculateTotal()}</div>
      <button
        onClick={handleCheckout}
        className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
      >
        Proceed to checkout
      </button>
    </div>
  );
}
