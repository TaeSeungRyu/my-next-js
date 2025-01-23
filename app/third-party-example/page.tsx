import ThirdPartyExample from "../components/ThirdPartyExample";

export default async function SecurePage() {
  return (
    <div className="grid grid-rows-[40px_1fr_40px] items-center justify-items-center">
      <div>ThirdPartyExample page</div>
      <ThirdPartyExample />
    </div>
  );
}
