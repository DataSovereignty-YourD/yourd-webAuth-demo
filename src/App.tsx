import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import TopBar from "./components/topbar";
import DetailPage from "./pages/detailPage";
import RedirectPage from "./pages/main/redirectPage";
import WebSocketInitializer from "./pages/WebSocketInitializer";
import GlobalWebSocketMessageListener from "./pages/GlobalWebSocketMessageListener";

function App() {
  return (
    <>
      <TopBar />
        <WebSocketInitializer/>
        <GlobalWebSocketMessageListener/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:nftId" element={<DetailPage />} />
        <Route path="/redirect" element={<RedirectPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
