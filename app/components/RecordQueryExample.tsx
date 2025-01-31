"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecordQueryExample() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // URL에서 검색어 가져오기
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") || ""; //이런 식으로 기존의 검색했던 조건 데이터 가져와서
    setSearchQuery(query); //원하는 input 필드에 적용!
  }, []);

  const handleSearch = () => {
    window.history.replaceState(
      null,
      "",
      `/record-query/list?q=${searchQuery}`
    ); //검색어를 URL에 추가
    router.push(`/record-query/info`); //검색 했던 조건을 기록한 뒤에 다른 페이지로 이동
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
