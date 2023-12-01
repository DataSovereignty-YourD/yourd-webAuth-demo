// src/state/favoritedProducts.ts
import { selector } from 'recoil';
import { productsState } from './product'; // 제품 상태를 가져옵니다.

export const favoritedProductsState = selector({
  key: 'favoritedProductsState', // 고유한 키
  get: ({ get }) => {
    const allProducts = get(productsState);
    return allProducts.filter(product => product.isFavorited); // 즐겨찾기된 제품만 필터링
  },
});
