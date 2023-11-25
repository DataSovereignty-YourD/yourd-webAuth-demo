import React, { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../state/loginState";
import  {websocketState} from '../../state/websocketState'

function RedirectPage() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [isLogin,setIsLogin] = useRecoilState(loginState);
  const websocket = useRecoilValue(websocketState).connection;
  useEffect(() => {
    
    // URL에서 인증 코드(authorize_code)와 state 추출
    const urlParams = new URLSearchParams(window.location.search);
    const authorizeCode = urlParams.get("code");
    const receivedState = urlParams.get("state");
    
    // 로컬 스토리지 또는 세션에서 저장된 state 값 로드 (LoginPage에서 저장한 값을 사용)
    const savedState = localStorage.getItem("oauth_state") || null;

    if (!authorizeCode) {
      console.error("Authorization code not found");
      return;
    }

    // 수신된 state와 저장된 state 비교
    if (receivedState !== savedState) {
      console.error("Invalid state value");
      return;
    }

    // token 엔드포인트에 요청을 보내 액세스 토큰 얻기
    fetch("http://localhost:8001/api/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: authorizeCode,
        redirect_uri: "http://localhost:3000/redirect",
        client_id: "305e2d8e-a560-4df8-a382-beb4cd7330fa",
        client_secret:
          "24fed34caea27b064cc6d8c9eb783efadc99ad5ac1150f3a15245703c6db315a",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const decodejwt = jwtDecode(data.id_token);
        const userDID = decodejwt.user_did;
        console.log("did",userDID);
        setIsLogin({state:true,did:userDID});

        setToken(data.access_token);
        console.log("Access Token:", data.access_token);
        // 추가 동작 수행
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error fetching access token:", error);
      });
  }, []);

  return (
    <div className="mt-12">
      
      <h1>Redirect Page</h1>
      {token ? <p>Token: {token}</p> : <p>Token is being fetched...</p>}
    </div>
  );
}

export default RedirectPage;
