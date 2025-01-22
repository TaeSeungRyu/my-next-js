import { collection, getDocs } from "firebase/firestore/lite";
import { fireStore } from "../../firebase/Init";

export async function GET(request: Request) {
  const col = collection(fireStore, "collectionName");
  const result: any = [];
  const docSnap = await getDocs(col);
  docSnap.forEach((doc) => {
    result.push(doc.data());
  });
  return Response.json({ result });
}
