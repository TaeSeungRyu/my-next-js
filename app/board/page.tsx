import Link from "next/link";
import ZustandText from "../components/ZustandText";

export default function Board() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center">
      <div>im borad</div>
      <ZustandText></ZustandText>
      <div>
        <Link
          href={{
            pathname: "/",
            query: { page: "1" },
          }}
        >
          go first page
        </Link>
      </div>
    </div>
  );
}
