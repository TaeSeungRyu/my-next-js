"use client";

import React, { useState } from "react";
import InputField from "./InputComponent";
import { useUserService } from "../ddd/actions";

const SigninPageComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const singinResult = await useUserService.signIn(username, password);
    console.log(singinResult); //여기 코드 DDD로 리해야 한다
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <InputField
        label="아이디"
        type="text"
        placeholder="ID를 입력하여 주세요"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label="비밀번호"
        type="password"
        placeholder="••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        로그인
      </button>
    </form>
  );
};

export default SigninPageComponent;
