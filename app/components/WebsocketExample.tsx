"use client";

import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  text: string;
  isSent: boolean;
  from: string;
  to?: string;
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [recipientId, setRecipientId] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      await fetch("/api/ws"); // WebSocket 서버 초기화
      const ws = new WebSocket("ws://localhost:3001");

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "id") {
          setUserId(data.id);
        } else if (data?.type === "private" || data?.type === "broadcast") {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: data.message,
              isSent: false,
              from: data.from,
            },
          ]);
        }
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };
      socketRef.current = ws;
    };
    connectWebSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message && socketRef.current && userId) {
      const messageData = recipientId
        ? { type: "private", from: userId, to: recipientId, message }
        : { type: "broadcast", from: userId, message }; //받는 id가 없으면 all

      socketRef.current.send(JSON.stringify(messageData));
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: message,
          isSent: true,
          from: userId,
          to: recipientId || "all",
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          웹소켓 쳇(어느 이름모를 깃헙에서..)
        </h1>
        {userId && (
          <div className="bg-blue-600 px-3 py-1 rounded">
            접속 랜덤 아이디: <span className="font-bold">{userId}</span>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.isSent
                ? "bg-blue-500 text-white self-end"
                : "bg-white text-gray-800 self-start"
            }`}
          >
            <div className="font-bold">{msg.isSent ? "You" : msg.from}</div>
            <div>{msg.text}</div>
            {msg.to && (
              <div className="text-xs">{msg.isSent ? `To: ${msg.to}` : ""}</div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 bg-white border-t">
        <div className="flex mb-2">
          <input
            type="text"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            className="flex-1 border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Recipient ID (leave empty for broadcast)"
          />
        </div>
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            메시지 발송
          </button>
        </div>
      </form>
    </div>
  );
}
