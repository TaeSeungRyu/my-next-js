"use client";

import { useContext } from "react";
import { SomeContext } from "./SomeContextProvider";

export default function SomeContextInjector1() {
  const {
    someData,
    setSomeData,
    someLocalStorageData,
    setSomeLocalStorageData,
  } = useContext(SomeContext);
  return (
    <>
      <div>-----</div>
      <h1>SomeContextInjector1 area</h1>
      <button
        className="bg-slate-50 text-green-950 px-4 py-2 rounded-md"
        onClick={() => setSomeData("some data")}
      >
        Set some data
      </button>
      <p>someData : {someData}</p>
      <button
        className="bg-slate-50 text-blue-500 px-4 py-2 rounded-md"
        onClick={() => setSomeLocalStorageData(Math.random().toString())}
      >
        Set some local storage data
      </button>
      <p>someLocalStorageData : {someLocalStorageData}</p>
      <div>-----</div>
    </>
  );
}
