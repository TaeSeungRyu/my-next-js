"use client";
import { useState } from "react";

//삭제 예정
export default function UseCaseExample() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<
    { id: number; name: string; description: string | null; stars: number }[]
  >([]);

  const handleSearch = async () => {};

  const handleAnimation = () => {};

  return (
    <div>
      <h2>GitHub 레포지토리 검색</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="GitHub 사용자명 입력"
      />
      <button onClick={handleSearch}>검색</button>

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <strong>{repo.name}</strong> - ⭐ {repo.stars}
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>

      <div id="ELEMENT">ELEMENT</div>
      <button onClick={handleAnimation}>에니메이션 실행</button>
    </div>
  );
}
