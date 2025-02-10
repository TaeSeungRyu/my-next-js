import WebsocketWebWorkerExample from "@/app/components/WebsocketWebWorkerExample";

export default async function WebWorkerPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center">
      <div>웹소켓 + web worker!!!</div>
      <WebsocketWebWorkerExample></WebsocketWebWorkerExample>
    </div>
  );
}
