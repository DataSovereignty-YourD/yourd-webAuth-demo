import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../state/loginState";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";


import * as uuid from "uuid";

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
  const [state, setState] = useState("");
  const [session, setSession] = useState(null);
  const [width, height] = [500, 600];
  const [left, top] = [
    (window.innerWidth - width) / 2,
    (window.innerHeight - height) / 2,
  ];

  // 팝업에서 인증이 완료되면 호출될 yourdjs 함수를 구현
  useEffect(() => {
    window.yourdjs = (sessionId: any) => {
      console.log("Received session_id:", sessionId);
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
    const handleMessage = (event:any) => {
      // 올바른 출처로부터 오는 메시지인지 확인
      console.log(event.origin);
      if (event.origin !== "http://223.194.43.57:8002") return;

      // 메시지에 포함된 세션 ID와 상태를 확인
      if (event.data.status === "authenticated") {
        const sessionId = event.data.sessionId;
        checkAuthenticationStatus(sessionId); // 세션 ID를 가지고 인증 상태 체크
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("message", handleMessage);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []); // 빈 의존성 배열은 이 useEffect가 컴포넌트 마운트 시에만 실행됨을 의미

  // Function that will be called by the popup window when authentication is complete
  // window.yourdjs = (sessionId: any) => {
  //   console.log("Received session_id:", sessionId);
  //   setSession(sessionId); // Set the session ID received from the popup
  //   checkAuthenticationStatus(sessionId); // Proceed to check the authentication status
  // };

  // 인증 상태를 체크하고, presentation 상태일 때 approve 엔드포인트를 호출하는 함수
  const checkAuthenticationStatus = (sessionId: any) => {
    fetch(`http://localhost:8002/claim/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "presentation") {
          console.log("Authentication complete");
          // 'approve' 엔드포인트로 사용자를 리다이렉션합니다.
          fetch(
            `http://localhost:8001/api/auth/approve?session_id=${sessionId}`
          ).then((res) => {
            console.log(res.url);
            // window.location.href = res.url;
          });
        } else if (data.status === "error") {
          console.error("Authentication error:", data.error);
          // 에러가 발생했을 경우 사용자에게 알리고 적절한 조치를 취합니다.
        }
      })
      .catch((err) => {
        console.error("Error checking authentication status:", err);
        // 여기에서 네트워크 오류 또는 기타 예외 처리를 할 수 있습니다.
      });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직
    const newState = Math.random().toString(36).substring(7);
    setState(newState);
    const params = new URLSearchParams({
      client_id: "305e2d8e-a560-4df8-a382-beb4cd7330fa",
      redirect_uri: "http://localhost:3000/redirect",
      response_type: "code",
      state: uuid.v4(),
      nonce: uuid.v4(),
      scope: "openid vp_mushfarmcredential:vp_token",
      credential_type: "MushFarmCredential",
    });

    // authorize API 호출하여 인증 URL 생성
    const authURL = `http://localhost:8001/api/oauth/authorize?${params.toString()}`;

    window.open(
      authURL,
      "LoginPopup",
      `width=${width}}, height=${height}, left=${left}, top=${top}  `
    );
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
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-white text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="mb-2 text-4xl text-black font-bold grid place-items-center mx-auto">
                Let's get started
              </div>
              <h3 className="text-md font-bold text-center text-gray-400 mb-2">
                로그인/회원가입
              </h3>

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
                  className="flex w-full items-center justify-center text-center gap-2 rounded bg-yellow-400 px-4 py-2 text-lg font-medium text-white transition-colors hover:bg-yellow-600"
                  onClick={handleLogin} // onClick 이벤트에 handleLoginSuccess 함수 연결
                >
                  YourD Pass로 시작하기
                </button>
                <div className="mb-2 mt-3 flex items-center gap-2">
                  <div className="h-[1px] w-full bg-slate-400"></div>
                  <span className="text-slate-400">or</span>
                  <div className="h-[1px] w-full bg-slate-400"></div>
                </div>
                <button className="flex w-full items-center justify-center text-center gap-2 rounded bg-yellow-400 px-4 py-2 text-lg font-medium text-white transition-colors hover:bg-yellow-600">
                  YourD Pass extension으로 시작하기
                </button>
              </>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
