"use client";

import React, { useContext, useEffect, useState } from "react";
import InputField from "./InputComponent";
import { LoginContext } from "./LoginContextProvider";
import { useBoardService } from "../ddd/actions";

const BoardCRUDComponent = () => {
  const { loginData }: any = useContext(LoginContext);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [boardList, setBoardList] = useState([]);

  const fetchData = async () => {
    const { data }: any = await useBoardService.selectDataAll();
    setBoardList(data);
  };

  const requestInsert = async () => {
    if (!confirm("등록하시겠습니까?")) return;
    await useBoardService.insertData({
      title,
      contents,
      username: loginData.username,
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg shadow-md w-1/2 mx-auto">
        <InputField
          label="제목"
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          label="내용"
          type="textarea"
          placeholder="내용"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <button
          className="px-2 py-1 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 "
          onClick={requestInsert}
        >
          등록
        </button>
      </div>
      <div className="overflow-x-auto w-1/2 mx-auto mt-4">
        <h1 className="text-2xl font-semibold text-center">게시판</h1>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                번호
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                제목
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                내용
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                작성자
              </th>
            </tr>
          </thead>
          <tbody>
            {boardList.map((item: any, index: number) => (
              <tr className="hover:bg-gray-100" key={index}>
                <td className="px-4 py-2 border-b border-gray-300">
                  {item.idx}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {item.title}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {item.contents}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {item.username}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BoardCRUDComponent;
