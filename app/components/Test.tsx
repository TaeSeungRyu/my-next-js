"use client";

export default function Test() {
  const gogogo = () => {
    console.log(12121212);
    fetch("http://localhost:3000/api-server/login", {
      //API 서버에 로그인 요청
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "aasdf",
        password: "asdf",
      }),
    }).catch((e) => {
      console.log(e);
    });
  };
  return (
    <>
      <button onClick={() => gogogo()}>gogogo</button>
    </>
  );
}
