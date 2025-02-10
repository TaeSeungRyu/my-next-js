"use client";
import { useEffect, useState, useRef } from "react";

export default function WebsocketWebWorkerExample() {
  const [messageList, setMessageList] = useState([""]);
  let worker: any = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return; // 서버 환경에서는 실행되지 않도록 방지

    // 웹 워커 생성 (public 폴더의 web-worker.js 사용)
    // 웹 워커는 브라우저 환경에서만 동작하므로 window.Worker로 생성(안그러면 is not statically analyse-able 오류)
    worker.current = new window.Worker("/web-socket-worker.js");

    // 웹 워커에서 메시지 수신
    if (worker.current) {
      worker.current.onmessage = (event: any) => {
        if (event.data.type === "message") {
          const message: any = event.data.data;
          setMessageList((prevMessageList) => [
            ...prevMessageList,
            JSON.stringify(message),
          ]);
        } else if (event.data.type === "error" || event.data.type === "close") {
          console.error("end....", event.data);
          worker.current.terminate(); // 사용이 끝난 웹 워커 종료
        }
      };
      worker.current.postMessage({ type: "open", data: "" }); // 웹 워커에 연결 메시지 전송
    }

    return () => {
      if (worker.current) {
        return worker.current.terminate();
      }
    }; // 컴포넌트 언마운트 시 워커 종료
  }, []);
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    worker.current.postMessage({ type: "send", data: "Hello, Web Worker!" });
  };

  return (
    <div>
      <button type="button" onClick={sendMessage}>
        메시지 보내기
      </button>
      <ul>
        {messageList.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
