"use client";

import { fireStoreClient } from "../firebase/Init";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { useEffect, useState } from "react";

export default function FirebaseClientExample() {
  const [apiCallResult, setApiCallResult] = useState("");
  const [firebaseResult, setFirebaseResult] = useState("");
  const collectionRef = collection(fireStoreClient, "collectionName");
  const queryResult = query(
    collectionRef,
    where("number", "!=", 0),
    orderBy("number", "asc")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(queryResult, (snapshot) => {
      const sampleResultArray: any = [];
      snapshot.forEach((doc) => {
        sampleResultArray.push(doc.data());
      });
      if (sampleResultArray)
        setFirebaseResult(JSON.stringify(sampleResultArray));
    });
    return () => {
      unsubscribe(); // cleanup
    };
  }, []);

  const requestFirebaseSample = async () => {
    const origin = window.location.origin;
    const apiCallResult = await fetch(`${origin}/api/firebaseSample`, {});
    const result = await apiCallResult.json();
    setApiCallResult(`${JSON.stringify(result)}`);
  };

  return (
    <>
      <div>
        firebase 사용 샘플 입니다. 아래는 구독중인 데이터, 파이어스토어 이벤트를
        감지하여 데이터를 실시간 반영
      </div>
      <div>firebase 실시간 subscribe : {firebaseResult}</div>
      <button
        className="px-4 py-2 my-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
        onClick={requestFirebaseSample}
      >
        firebase sample 받아오기 버튼
      </button>
      <div>api 호출을 통한 데이터 받아오기 결과 : {apiCallResult}</div>
    </>
  );
}
