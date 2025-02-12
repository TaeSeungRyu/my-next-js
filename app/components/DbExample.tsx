"use client";
import { useEffect, useState } from "react";

//tanstack query를 활용한 캐싱전략 하기 전 모습
export default function DbExample() {
  const [dbDataList, setDbData] = useState<any>();

  const getDbData = async () => {
    try {
      const response = await fetch("/api/db");
      if (response.ok) {
        const { data } = await response.json();
        setDbData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postDbData = async () => {
    try {
      const body = JSON.stringify({
        random_number: Math.floor(Math.random() * 100),
        random_text: Math.random().toString(36).substring(7),
      });
      console.log(body);

      const response = await fetch("/api/db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (response.ok) {
        console.log("Data posted successfully");
        getDbData();
      } else {
        console.error("Failed to post data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDbData();
  }, []);

  return (
    <>
      <div className="flex gap-3 mt-5">
        <button
          onClick={getDbData}
          className="dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded px-4 py-2"
        >
          데이터 가져오기
        </button>
        <button
          onClick={postDbData}
          className="dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded px-4 py-2"
        >
          데이터 추가하기
        </button>
      </div>
      <div className="flex gap-3 mt-5 flex-col">
        {dbDataList &&
          dbDataList?.map((data: any, index: number) => (
            <div className="flex gap-3" key={index}>
              <div>random_number: {data.random_number}</div>
              <div>random_text: {data.random_text}</div>
            </div>
          ))}
      </div>
    </>
  );
}
