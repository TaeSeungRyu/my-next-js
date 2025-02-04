"use client";
import { useEffect, useState } from "react";

export default function SSEClientExample() {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");

    eventSource.onmessage = (event) => {
      console.log("📩 받은 이벤트:", event.data);
      setEvents((prev) => [...prev, event.data]);
    };

    eventSource.onerror = () => {
      console.error("❌ SSE 연결 종료됨");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>📡 SSE 이벤트 수신</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
}
