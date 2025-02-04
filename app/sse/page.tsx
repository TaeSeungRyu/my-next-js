import SSEClientExample from "../components/SSEClientExample";

export default async function SecurePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center">
      <div>sse page!</div>
      <SSEClientExample></SSEClientExample>
    </div>
  );
}
