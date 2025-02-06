"use client";
import { useEffect, useState } from "react";

export default function WebWorkerExample() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // 서버 환경에서는 실행되지 않도록 방지

    // 웹 워커 생성 (public 폴더의 web-worker.js 사용)
    // 웹 워커는 브라우저 환경에서만 동작하므로 window.Worker로 생성(안그러면 is not statically analyse-able 오류)
    const worker = new window.Worker("/web-worker.js");

    // 웹 워커에서 메시지 수신
    if (worker) {
      worker.onmessage = (event) => {
        if (event.data.success) {
          const imgUrl: any = URL.createObjectURL(event.data.data);
          setImageUrl(imgUrl);
        } else {
          setError(event.data.error);
        }
        worker.terminate(); // 사용이 끝난 웹 워커 종료
      };
      // 웹 워커에 API URL 전달
      worker.postMessage(
        "https://upload.wikimedia.org/wikipedia/commons/7/7d/%22_The_Calutron_Girls%22_Y-12_Oak_Ridge_1944_Large_Format_%2832093954911%29_%282%29.jpg"
      );
    }

    return () => {
      if (worker) {
        return worker.terminate();
      }
    }; // 컴포넌트 언마운트 시 워커 종료
  }, []);

  // 이미지 로딩 완료 후 상태 변경
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div>
      <h1>웹 워커</h1>
      {loading && <p>이미지 로딩중 입니다...!</p>}
      {error && <p>Error: {error}</p>}
      {imageUrl && (
        <img src={imageUrl} alt="web worker example" onLoad={handleImageLoad} />
      )}
    </div>
  );
}
