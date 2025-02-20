"use client";
import React, { useEffect, useState } from "react";
import { useUserService } from "../ddd/actions";

const BoardComponent = () => {
  const [me, setMe] = useState<any>();
  useEffect(() => {
    async function initData() {
      const me = await useUserService.findMe();
      console.log(me);
      setMe(
        JSON.stringify({
          name: me.data.name,
          username: me.data.username,
        })
      );
    }
    initData();
  }, []);
  return (
    <>
      <div>기본 내 정보 : {me}</div>
    </>
  );
};

export default BoardComponent;
