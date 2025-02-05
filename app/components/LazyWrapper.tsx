"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const LazyComponent = dynamic(
  () => import("../components/LazyExample").then((mod) => mod.LazyExample),
  {
    ssr: false,
    loading: () => <p>loading...component</p>, //실제 컴포넌트가 생성중에 보여줄 로딩
  }
);

export default function LazyWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <p>loading...</p>}{" "}
      {/* 상태에 따라 로딩 중일 때 보여줄 UI */}
      <LazyComponent onLoad={() => setIsLoaded(true)} />
    </>
  );
}
