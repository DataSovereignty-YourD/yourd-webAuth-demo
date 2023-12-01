import { useSetRecoilState } from 'recoil';
import { cartState } from '../state/cart';
import { ProductDetails } from '../state/product'; // ProductDetails 타입 임포트

export const useAddToCart = () => {
  const setCart = useSetRecoilState(cartState);

  const addToCart = (product: ProductDetails) => { // 타입 지정
    setCart((prevCart) => [...prevCart, product]);
  };

  return addToCart;
};