"use client";
import { useContext } from "react";
import React, { useEffect, useState } from "react";
import { LoginContext } from "./LoginContextProvider";

const BoardComponent = () => {
  const [me, setMe] = useState<any>({ username: "", name: "" });
  const { loginData }: any = useContext(LoginContext);
  useEffect(() => {
    if (loginData.username) {
      setMe(loginData);
    }
  }, [loginData]);

  return (
    <>
      <div>기본 내 정보 : {me.username}</div>
      <div>기본 내 이름 : {me.name}</div>
    </>
  );
};

export default BoardComponent;
