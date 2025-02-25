import { NextResponse } from "next/server";
import { WebSocketServer, WebSocket } from "ws";

interface Client {
  id: string;
  ws: WebSocket;
}

let wss: WebSocketServer | null = null;
let clients: any = [];

export async function GET() {
  if (!wss) {
    wss = new WebSocketServer({ port: 3001 });

    wss.on("connection", (ws) => {
      console.log("New WebSocket connection");

      clients.push(ws);

      ws.on("message", (message) => {
        console.log("Received message:");

        // 클라이언트에게 JSON 형식으로 메시지를 전송
        clients.forEach((client: any) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            try {
              // 메시지가 Blob이면 이를 ArrayBuffer로 변환 후 JSON으로 보내기
              if (message instanceof Buffer || message instanceof ArrayBuffer) {
                const uint8Array = new Uint8Array(message);
                const fileData = {
                  data: Array.from(uint8Array), // Uint8Array를 배열로 변환하여 전송
                  type: "application/octet-stream", // 예시: 이진 데이터의 MIME 타입
                };
                client.send(JSON.stringify(fileData));
              } else {
                client.send(message); // 일반 메시지 처리
              }
            } catch (err) {
              console.error("Error sending message:", err);
            }
          }
        });
      });

      ws.on("close", () => {
        clients = clients.filter((client: any) => client !== ws);
        console.log("Disconnected");
      });
    });

    console.log("✅ WebSocket 서버 실행 중 (포트: 3001)");
  }

  return NextResponse.json({ message: "WebSocket server is running" });
}
