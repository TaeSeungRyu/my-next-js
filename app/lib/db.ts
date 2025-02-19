import Database from "better-sqlite3";
import fs from "fs";
const INIT_FILE = "db_init.lock"; // 초기화 체크 파일

const SqlLiteDB = new Database("sample.db", { verbose: console.log }); //DB 생성

const tableArray = [
  {
    name: "User",
    columns: [
      { name: "username", type: "TEXT", constraint: "NOT NULL" },
      { name: "password", type: "TEXT", constraint: "NOT NULL" },
      { name: "name", type: "TEXT", constraint: "NOT NULL" },
    ],
  },
];

// 초기화 체크 파일이 없으면 아래 코드 동작(저어엉말 db도 쓸꺼면 서버 초기 런타임에 추가하는 방법으로 분리!)
if (!fs.existsSync(INIT_FILE)) {
  tableArray.forEach((table) => {
    const columns = table.columns
      .map((column) => {
        return `${column.name} ${column.type} ${column.constraint}`;
      })
      .join(", ");

    const tableExists: any = SqlLiteDB.prepare(
      "SELECT COUNT(*) as count FROM sqlite_master WHERE type='table' AND name=?"
    ).get(`${table.name}`);

    if (tableExists && tableExists?.count > 0) {
      console.log("");
    } else {
      console.log("테이블이 없습니다.");
      SqlLiteDB.exec(`CREATE TABLE ${table.name} (${columns})`); // 테이블 생성
      SqlLiteDB.exec(
        "INSERT INTO User (username, password, name) VALUES ('admin', 'admin', '관리자')"
      ); // 데이터 삽입
    }
  });
  fs.writeFileSync(INIT_FILE, "initialized");
}

export default SqlLiteDB;
