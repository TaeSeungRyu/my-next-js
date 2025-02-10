import { NextResponse } from "next/server";
import { WebSocketServer, WebSocket } from "ws";

interface Client {
  id: string;
  ws: WebSocket;
}

let wss: WebSocketServer | null = null;
let clients: Client[] = [];

export async function GET() {
  if (!wss) {
    wss = new WebSocketServer({ port: 3001 });

    wss.on("connection", (ws) => {
      const clientId = Math.random().toString(36).substring(7);
      clients.push({ id: clientId, ws });

      ws.send(JSON.stringify({ type: "id", id: clientId }));

      ws.on("message", (message: string) => {
        try {
          const data = JSON.parse(message.toString()); // ✅ Buffer 처리
          console.log("📩 받은 메시지:", data);
          if (data.type === "private") {
            const recipient = clients.find((client) => client.id === data.to);
            if (recipient && recipient.ws.readyState === WebSocket.OPEN) {
              // ✅ 연결된 클라이언트인지 확인
              recipient.ws.send(
                JSON.stringify({
                  type: "private",
                  from: data.from,
                  message: data.message,
                })
              );
            }
          } else if (data.type === "broadcast") {
            console.log("📢 브로드캐스트 메시지 전송");
            clients.forEach((client) => {
              if (client.ws.readyState === WebSocket.OPEN) {
                // ✅ 닫힌 WebSocket 방지
                client.ws.send(
                  JSON.stringify({
                    type: "broadcast",
                    from: data.from,
                    message: data.message,
                  })
                );
              }
            });
          } else {
            console.error("❌ 알 수 없는 메시지 유형:", data);
          }
        } catch (error) {
          console.error("❌ 메시지 처리 중 오류 발생:", error);
        }
      });

      ws.on("close", () => {
        clients = clients.filter((client) => client.ws !== ws);
        console.log(`❌ 클라이언트 연결 종료: ${clientId}`);
      });
    });

    console.log("✅ WebSocket 서버 실행 중 (포트: 3001)");
  }

  return NextResponse.json({ message: "WebSocket server is running" });
}
