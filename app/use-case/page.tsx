import UseCaseExample from "../components/UseCaseExample";

//[use case] Presentation Layer
export default async function UseCasePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center">
      <div>유스 케이스</div>
      <UseCaseExample />
    </div>
  );
}
