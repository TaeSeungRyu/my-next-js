import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      console.log("SSE connection opened");

      // 💡 클라이언트에 이벤트 전송
      let count = 0;
      const interval = setInterval(() => {
        count++;
        const message = `data: ${JSON.stringify({
          message: `Event ${count}`,
          timestamp: Date.now(),
        })}\n\n`;
        controller.enqueue(encoder.encode(message));
        if (count >= 10) {
          clearInterval(interval);
          controller.close(); // 💡 안전하게 연결 종료
          console.log("SSE connection closed");
        }
      }, 1000);

      // 💡 클라이언트가 연결을 끊으면 실행
      req.signal.onabort = () => {
        console.log("SSE connection aborted");
        clearInterval(interval);
        controller.close();
      };
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
