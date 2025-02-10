import OpenLayersExample from "../components/OpenLayersExample";

export default async function SecurePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center">
      <div>ol page!</div>
      <OpenLayersExample />
    </div>
  );
}
