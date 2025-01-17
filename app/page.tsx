import Link from "next/link";
import SigninBtn from "./components/SigninBtn";
import { HandleBtn } from "./components/HandleBtn";
import DarkModeBtn from "./components/DarkModeBtn";

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
        <div className="mt-[55px] flex flex-col hover:text-blue-500">
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
          <Link
            href={{
              pathname: "/fetching",
            }}
          >
            패칭 연습
          </Link>
          <Link
            href={{
              pathname: "/dynamic-route/원하는값",
            }}
          >
            동적 라우팅
          </Link>
          <Link
            href={{
              pathname: "/test1",
            }}
          >
            test1 페이지 이동(라우트 그룹)
          </Link>
          <Link
            href={{
              pathname: "/test2",
            }}
          >
            test2 페이지 이동(라우트 그룹)
          </Link>
          <Link
            href={{
              pathname: "/hydrate-dehydrate",
            }}
          >
            tanstack query를 활용한 hydrate / dehydrate
          </Link>
        </div>
        <DarkModeBtn></DarkModeBtn>
      </div>
    </div>
  );
}
