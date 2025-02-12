import Database from "better-sqlite3";

const SqlLiteDB = new Database(":memory:", { verbose: console.log }); // 메모리 DB 생성

const tableExists: any = SqlLiteDB.prepare(
  "SELECT COUNT(*) as count FROM sqlite_master WHERE type='table' AND name=?"
).get("SampleData");

if (tableExists && tableExists.get && tableExists?.get()?.count > 0) {
  console.log("테이블이 존재합니다.");
} else {
  console.log("테이블이 없습니다.");
  SqlLiteDB.exec(
    "CREATE TABLE SampleData (random_number INTEGER, random_text TEXT)"
  ); // 테이블 생성
}

export default SqlLiteDB;
