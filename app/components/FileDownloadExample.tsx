"use client";
import { useState } from "react";

export default function FileDownloadExample() {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadFile = async () => {
    setIsDownloading(true);
    setProgress(0);

    const response = await fetch(
      "https://upload.wikimedia.org/wikipedia/commons/8/85/%22_Shot_From_The_Sky%22_Army_Show_1945_Oak_Ridge_%2824971013612%29.jpg"
    );
    const reader = response.body?.getReader();
    const contentLength = response.headers.get("Content-Length") ?? "0";
    const totalSize = parseInt(contentLength, 10);

    let receivedLength = 0;
    let chunks = [];

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;
      setProgress(Math.round((receivedLength / totalSize) * 100));
    }

    const blob = new Blob(chunks);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "samole.jpg"; // 원하는 파일명 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsDownloading(false);
  };
  return (
    <div>
      <button onClick={downloadFile} disabled={isDownloading}>
        {isDownloading ? `다운로드 중... ${progress}%` : "파일 다운로드"}
      </button>
      {isDownloading && <progress value={progress} max="100"></progress>}
    </div>
  );
}
