"use client";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

let newPeer: any = null;

export default function FileShare() {
  const [peer, setPeer] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [receivedFile, setReceivedFile] = useState<{
    name: string;
    url: string;
  } | null>(null);

  const [signalData, setSignalData] = useState<any>(null);

  useEffect(() => {
    // Peer 생성
    newPeer = new Peer({
      initiator: location.hash === "#1", // host가 되면 #1을 URL에 추가
      trickle: false,
    });

    newPeer.on("signal", (data: any) => {
      console.log("📡 Sending signal data:", data);
      setSignalData(JSON.stringify(data)); // signal data를 상태로 설정
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

    return () => {
      newPeer.destroy();
    };
  }, []);

  const connectPeer = () => {
    if (!peer || !signalData) return;

    // 상대방의 signal 데이터를 받아서 연결을 시도
    const data = JSON.parse(signalData);
    peer.signal(data);
  };

  const sendFile = () => {
    if (!fileInputRef.current?.files?.[0]) return;

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
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={connectPeer}
      >
        connect Peer
      </button>
      <p className="text-sm">
        연결 상태: {connected ? "🔗 연결됨" : "❌ 연결 안됨"}
      </p>
      <div>{signalData}</div>

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
