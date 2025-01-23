"use client";
import { useEffect, useRef } from "react";
import "../../public/thridparty/perfect-scrollbar.css";

export default function ThirdPartyExample() {
  const sampleDataArray = [];
  const perfectScrollElement = useRef<HTMLDivElement>(null);
  let ps = null;

  for (let i = 0; i < 50; i++) {
    sampleDataArray.push(i);
  }
  useEffect(() => {
    const loadScript = async () => {
      const script = document.createElement("script");
      script.src = "/thridparty/perfect-scrollbar.js"; // public 폴더 기준 경로
      script.onload = () => {
        console.log("Script loaded successfully.");
        const PerfectScrollbar = (window as any).PerfectScrollbar;
        if (perfectScrollElement.current) {
          ps = new PerfectScrollbar(perfectScrollElement.current);
        }
      };
      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  return (
    <div>
      <div>서드파티(외부) 형식 라이브러리 추가 샘플</div>

      <div
        className="bg-gray-200 h-[555px] relative"
        ref={perfectScrollElement}
      >
        {sampleDataArray.map((data) => (
          <div className="h-60 w-60 bg-gray-300" key={data}>
            {data}
          </div>
        ))}
      </div>
    </div>
  );
}
