import Link from "next/link";
import SigninBtn from "./components/SigninBtn";
import { HandleBtn } from "./components/HandleBtn";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div>
        <div>1. next-js에서 제공하는 로그인 버튼</div>
        <SigninBtn></SigninBtn>
        <div className="my-[55px]">
          custom signin 영역
          <div>
            <input type="text" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <HandleBtn></HandleBtn>
          </div>
        </div>
        <div className="mt-[55px] flex flex-col">
          <Link
            href={{
              pathname: "/board",
              query: { page: "1" },
            }}
          >
            board 페이지로 이동
          </Link>
          <Link
            href={{
              pathname: "/secure-page",
            }}
          >
            로그인이 필요한 페이지로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
