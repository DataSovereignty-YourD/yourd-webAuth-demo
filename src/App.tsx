import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage';
import TopBar from './components/topbar';
import RedirectPage from './pages/main/redirectPage';
import WebSocketInitializer from './pages/WebSocketInitializer';
import GlobalWebSocketMessageListener from './pages/GlobalWebSocketMessageListener';
import BestDealPage from './pages/bestDealPage';
import { useSetRecoilState, useRecoilState } from 'recoil';
import WishListPage from './pages/wishListPage';
import { useEffect } from 'react';
import { productsState } from './state/product';
import CartPage from './pages/cartPage';
import CheckOutPage from './pages/checkOutPage';
function App() {
  const setProducts = useSetRecoilState(productsState);

  useEffect(() => {
    // 로컬 스토리지에서 즐겨찾기 상태를 로드
    const storedFavoritedProducts = localStorage.getItem('favoritedProducts');
    if (storedFavoritedProducts) {
      setProducts(JSON.parse(storedFavoritedProducts));
    }
  }, [setProducts]);
  return (
    <>
      <TopBar />
      <WebSocketInitializer />
      <GlobalWebSocketMessageListener />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/redirect" element={<RedirectPage />} />
        <Route path="/bestdeal" element={<BestDealPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element = {<CheckOutPage/>}/>
      </Routes>
    </>
  );
}

export default App;
