"use client";
import { useState } from "react";

//느린 로딩을 위한 예제
export function LazyExample({ onLoad }: { onLoad: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const sampleArray = new Array(55000).fill(Math.random()); //느린 렌더링을 위한 배열
  return (
    <>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/7d/%22_The_Calutron_Girls%22_Y-12_Oak_Ridge_1944_Large_Format_%2832093954911%29_%282%29.jpg"
        alt="big size image example"
        onLoad={() => {
          setLoaded(true);
          onLoad(); // ✅ 부모에게 로딩 완료 신호 전달
        }}
        style={{
          display: loaded ? "block" : "none",
        }}
      />
      {sampleArray.map((_, index) => (
        <div key={index}></div>
      ))}
    </>
  );
}
