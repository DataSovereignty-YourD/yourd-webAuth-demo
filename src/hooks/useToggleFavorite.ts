import { useSetRecoilState } from 'recoil';
import { productsState } from '../state/product';

export const useToggleFavorite = () => {
  const setProducts = useSetRecoilState(productsState);

  const toggleFavorite = (productId: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map(product =>
        product.id === productId ? { ...product, isFavorited: !product.isFavorited } : product
      );

      // 즐겨찾기 상태를 로컬 스토리지에 저장
      localStorage.setItem('favoritedProducts', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  return toggleFavorite;
};