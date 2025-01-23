import FirebaseClientExample from "../components/FirebaseClientExample";

export default async function SecurePage() {
  return (
    <div className="grid grid-rows-[40px_1fr_40px] items-center justify-items-center">
      <div>firebase example page</div>
      <FirebaseClientExample />
    </div>
  );
}
