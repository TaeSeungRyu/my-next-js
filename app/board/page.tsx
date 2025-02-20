import BoardComponent from "../components/BoardComponent";

//[use case] Presentation Layer
export default async function BoardPage() {
  return (
    <div className="grid items-center justify-items-center">
      <div>board</div>
      <BoardComponent></BoardComponent>
    </div>
  );
}
