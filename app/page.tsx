import Link from "next/link";
import SigninBtn from "./components/SigninBtn";
import { handleSignin } from "./components/HandleBtn";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center">
      hello nextjs
      <div>
        <SigninBtn></SigninBtn>
        <div>
          <Link
            href={{
              pathname: "/board",
              query: { page: "1" },
            }}
          >
            go board page
          </Link>
        </div>
        <div className="mt-[55px]">
          custom signin 영역
          <div>
            <input type="text" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <button type="button" onClick={handleSignin}>
              signin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
