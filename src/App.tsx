import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage';
import TopBar from './components/topbar';
import DetailPage from './pages/detailPage';
function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:nftId" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
