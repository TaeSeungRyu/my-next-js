import SomeContextInjector1 from "../components/SomeContextInjector1";
import SomeContextInjector2 from "../components/SomeContextInjector2";
import SomeContextProvider from "../components/SomeContextProvider";

export default async function Page() {
  return (
    <>
      <div>context 사용 샘플 입니다. 의존성을 프로바이더에 의해 제공</div>
      <SomeContextProvider>
        <div className="my-2">
          <SomeContextInjector1 />
        </div>
        <div className="my-2">
          <SomeContextInjector2 />
        </div>
      </SomeContextProvider>
    </>
  );
}
