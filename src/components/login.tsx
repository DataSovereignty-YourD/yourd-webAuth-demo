import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '../state/loginState';
import { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
// import { useWebSocket } from "../hook/useWebSocket";
import google from '../assets/img/google.png';
import * as uuid from 'uuid';
import { WebSocketMessage, websocketState } from '../state/websocketState';

export default function Login({
  initialOpen,
  onClose,
}: {
  initialOpen: boolean;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const [isEyeClick, setIsEyeClick] = useState(false);

  useEffect(() => {
    setIsOpen(initialOpen);
  }, [initialOpen]);

  return (
    <div className=" grid place-content-center">
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} onClose={onClose} />
    </div>
  );
}

const SpringModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
}> = ({ isOpen, setIsOpen, onClose }) => {
  const navigate = useNavigate(); // React Router v6의 useNavigate 훅
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [state, setState] = useState('');
  const [session, setSession] = useState();
  const [width, height] = [500, 600];
  // const { connect, sendMessage, messages } = useWebSocket();
  const [left, top] = [
    (window.innerWidth - width) / 2,
    (window.innerHeight - height) / 2,
  ];
  const newState = uuid.v4();
  const websocket = useRecoilValue(websocketState).connection;
  // 팝업에서 인증이 완료되면 호출될 yourdjs 함수를 구현
  useEffect(() => {
    window.yourdjs = (sessionId) => {
      console.log('Received session_id:', sessionId);
      setSession(sessionId); // Set the session ID received from the popup
      checkAuthenticationStatus(sessionId); // Proceed to check the authentication status
    };

    // 컴포넌트가 언마운트될 때 yourdjs 함수를 정리
    return () => {
      delete window.yourdjs;
    };
  }, []);

  useEffect(() => {
    // 메시지 리스너 추가
    const handleMessage = async (event: any) => {
      // 올바른 출처로부터 오는 메시지인지 확인
      if (event.origin !== 'http://192.168.1.100:8002') return;
      console.log(event.origin);

      // 메시지에 포함된 세션 ID와 상태를 확인
      if (event.data.status === 'authenticated') {
        const sessionId = event.data.sessionId;
        checkAuthenticationStatus(sessionId); // 세션 ID를 가지고 인증 상태 체크
      }

      if (event.data.status === 'popupLoaded') {
        const sessionId = event.data.sessionId;
        console.log(sessionId, 'id');

        await fetch(`http://localhost:8002/wallet/connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ws_session_id: 'asdfasdf',
            session_id: sessionId,
            state: newState,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            if (data.state === newState) {
              console.log('Good');
            }
          })
          .catch((error) => {
            console.error(
              'There was a problem with the fetch operation:',
              error
            );
          });
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('message', handleMessage);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []); // 빈 의존성 배열은 이 useEffect가 컴포넌트 마운트 시에만 실행됨을 의미

  // 인증 상태를 체크하고, presentation 상태일 때 approve 엔드포인트를 호출하는 함수
  const checkAuthenticationStatus = async (sessionId: any) => {
    fetch(`http://localhost:8002/claim/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'presentation') {
          console.log('Authentication complete');
          // 'approve' 엔드포인트로 사용자를 리다이렉션합니다.
          fetch(
            `http://localhost:8001/api/auth/approve?session_id=${sessionId}`
          )
            .then((response) => {
              // 여기서 응답을 처리합니다. 예를 들어, response.url을 사용할 수 있습니다.
              const redirectUrl = response.url.split('3000')[1]; // 이 부분은 실제 응답 형식에 따라 달라질 수 있습니다.
              console.log(redirectUrl);
              setIsOpen(false);
              navigate(redirectUrl); // 응답으로 받은 URL로 네비게이션
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          // window.location.href = `http://localhost:8001/api/auth/approve?session_id=${sessionId}`;
        } else if (data.status === 'error') {
          console.error('Authentication error:', data.error);
          // 에러가 발생했을 경우 사용자에게 알리고 적절한 조치를 취합니다.
        }
      })
      .catch((err) => {
        console.error('Error checking authentication status:', err);
        // 여기에서 네트워크 오류 또는 기타 예외 처리를 할 수 있습니다.
      });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직
    const newSessionID = 'asdfasdf';

    setState(newState);
    localStorage.setItem('oauth_state', newState);
    const message: WebSocketMessage = {
      type: 'pairing',
      clientType: 'Service',
      sessionId: newSessionID,
    };

    // 웹소켓 메시지 전송
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    }

    const params = new URLSearchParams({
      client_id: '305e2d8e-a560-4df8-a382-beb4cd7330fa',
      redirect_uri: 'http://localhost:3000/redirect',
      response_type: 'code',
      state: newState,
      nonce: uuid.v4(),
      scope: 'openid vp_akaswap:vp_authtoken',
      credential_type: 'AKASwap',
    });

    // authorize API 호출하여 인증 URL 생성
    const authURL = `http://localhost:8001/api/oauth/authorize?${params.toString()}`;

    window.open(
      authURL,
      'LoginPopup',
      `width=${width}}, height=${height}, left=${left}, top=${top}  `
    );
    // });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="bg-slate-400/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-white text-black px-6 py-20 rounded-lg w-full max-w-sm shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col justify-center items-center">
              <div className="mb-20 text-2xl text-black font-bold grid place-items-center mx-auto">
                Authentication
              </div>
              <div className="text-black mb-8 font-semibold">Continue with</div>

              <>
                {/* <button className="flex w-full items-center justify-center text-center gap-2 rounded bg-yellow-400 px-4 py-2 text-lg font-medium text-white transition-colors hover:bg-yellow-600">
                    YourD Login으로 시작하기
                  </button>
                  <div className="mb-2 mt-3 flex items-center gap-2">
                    <div className="h-[1px] w-full bg-slate-400"></div>
                    <span className="text-slate-400">or</span>
                    <div className="h-[1px] w-full bg-slate-400"></div>
                  </div> */}
                {/* <button className="flex w-full items-center justify-center text-center gap-2 rounded bg-yellow-400 px-4 py-2 text-lg font-medium text-white transition-colors hover:bg-yellow-600">
                    YourD Pass로 시작하기    ====== 일단은 주석처리 해둔 부분 ***지우지 말것
                  </button> */}
                <button
                  className="flex w-5/6 items-center justify-center text-center gap-4 rounded-full bg-yellow-400 mb-12 text-md font-medium text-black transition-colors hover:bg-yellow-300"
                  onClick={handleLogin} // onClick 이벤트에 handleLoginSuccess 함수 연결
                >
                  <img
                    src={require('../assets/img/YourD_Logo_Dwhite.png')}
                    className="w-12 h-12 object-contain mr-8"
                  />{' '}
                  YourD Pass
                </button>
                <button className="flex w-5/6 h-[48px] items-center justify-center text-center gap-10 rounded-full bg-gray-200 mb-24 text-md font-medium  text-black transition-colors hover:bg-gray-500">
                  <img src={google} className="w-10 h-10 ml-4" /> Sign in with
                  Google
                </button>
                {/* <div className="mb-2 mt-3 flex items-center gap-2">
                  <div className="h-[1px] w-full bg-slate-400"></div>
                  <span className="text-slate-400">or</span>
                  <div className="h-[1px] w-full bg-slate-400"></div>
                </div>
                <button
                  onClick={async () => {
                  }}
                  className="flex w-full items-center justify-center text-center gap-2 rounded bg-yellow-400 px-4 py-2 text-lg font-medium text-white transition-colors hover:bg-yellow-600"
                >
                  YourD Pass extension으로 시작하기
                </button> */}
                <div className="text-sm text-gray-500">
                  Term & Conditions and Privacy Policy
                </div>
              </>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
