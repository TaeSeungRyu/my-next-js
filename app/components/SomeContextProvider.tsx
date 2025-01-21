"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export const SomeContext = createContext({
  someData: "",
  setSomeData: (data: string) => {},
  someLocalStorageData: "",
  setSomeLocalStorageData: (data: string) => {
    localStorage.setItem("someLocalStorageData", data);
  },
});

type Props = { children: ReactNode };

export default function SomeContextProvider({ children }: Props) {
  const [someData, setSomeData] = useState(""); //컨텍스트에 저장할 데이터(일반적인 방법)
  const [someLocalStorageData, setSomeLocalStorageData] = useState(""); //로컬 스토리지에 저장할 데이터

  //로컬 스토리지를 만약 바인딩 한 다면
  useEffect(() => {
    const storedData = localStorage.getItem("someLocalStorageData") || "";
    setSomeLocalStorageData(storedData);
  }, []);

  const updateLocalStorageData = (data: string) => {
    setSomeLocalStorageData(data);
    localStorage.setItem("someLocalStorageData", data);
  };

  return (
    <SomeContext.Provider
      value={{
        someData,
        setSomeData,
        someLocalStorageData,
        setSomeLocalStorageData: updateLocalStorageData,
      }}
    >
      {children}
    </SomeContext.Provider>
  );
}
