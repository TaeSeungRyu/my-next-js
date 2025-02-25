"use client";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

export default function FileShare() {
  const [peer, setPeer] = useState<any>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [receivedFile, setReceivedFile] = useState<{
    name: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    let socket: any = null;
    let newPeer: any = null;

    // WebSocket 연결
    fetch("/api/signal").then((res) => {
      socket = new WebSocket("ws://127.0.0.1:3001/api/signal");
      socket.onopen = () => console.log("✅ WebSocket Connected");

      socket.onmessage = (event: any) => {
        console.log("WebSocket message received:", event);

        // WebSocket에서 Blob 데이터 처리
        if (event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const data = JSON.parse(reader.result as string); // Blob을 텍스트로 읽고 JSON으로 파싱
            console.log("Signal data received:", data);
            console.log("peeeeeeeeeeer", peer);
            console.log("newPeernewPeer", newPeer);

            if (newPeer) {
              console.log("Sending signal data to peer:", data);
              newPeer.signal(data); // 받은 시그널링 데이터를 peer에 전달
            }
          };
          reader.readAsText(event.data); // Blob을 텍스트로 변환하여 읽기
        } else {
          // 일반 메시지 처리
          console.log("Signal data received222:", event.data);
          if (newPeer) {
            console.log(
              "Sending signal data to peer333:",
              JSON.parse(event.data)
            );
            newPeer.signal(JSON.parse(event.data)); // 받은 시그널링 데이터를 peer에 전달
          }
        }
      };

      setWs(socket);

      // Peer 생성
      newPeer = new Peer({
        initiator: location.hash === "#host",
        trickle: false,
      });

      console.log('location.hash === "#host"', location.hash === "#host");

      newPeer.on("signal", (data: any) => {
        console.log("📡 Sending signal data:", data);
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(data)); // WebSocket을 통해 시그널링 데이터 전송
        }
      });

      newPeer.on("connect", () => {
        console.log("🔗 P2P Connected!");
        setConnected(true);
      });

      newPeer.on("data", (data: any) => {
        console.log("📩 Received file data");

        const fileData = JSON.parse(data.toString());
        const blob = new Blob([new Uint8Array(fileData.data)], {
          type: fileData.type,
        });
        const url = URL.createObjectURL(blob);
        setReceivedFile({ name: fileData.name, url });
      });

      setPeer(newPeer);
    });

    return () => {
      newPeer.destroy();
      socket.close();
    };
  }, []);

  const sendFile = () => {
    if (!peer || !fileInputRef.current?.files?.[0]) return;

    const file = fileInputRef.current.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileData = {
        name: file.name,
        type: file.type,
        data: Array.from(new Uint8Array(reader.result as ArrayBuffer)),
      };
      peer.send(JSON.stringify(fileData)); // 파일 데이터를 JSON 형식으로 전송
      console.log("📤 File sent!");
    };

    reader.readAsArrayBuffer(file); // 파일을 ArrayBuffer로 읽기
  };

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-lg font-bold">P2P 파일 공유</h2>
      <p className="text-sm">
        연결 상태: {connected ? "🔗 연결됨" : "❌ 연결 안됨"}
      </p>

      <input type="file" ref={fileInputRef} />
      <button
        onClick={sendFile}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        파일 전송
      </button>

      {receivedFile && (
        <div className="mt-4">
          <p>📥 받은 파일: {receivedFile.name}</p>
          <a
            href={receivedFile.url}
            download={receivedFile.name}
            className="text-blue-600 underline"
          >
            다운로드
          </a>
        </div>
      )}
    </div>
  );
}
