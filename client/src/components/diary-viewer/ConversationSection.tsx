import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import { GoPaperAirplane } from "react-icons/go";
import type { Message } from "../../types/chat";
import { FaRobot } from "react-icons/fa6";
import MessageBubble from "./MessageBubble";

const ConversationSection = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = { role: "user", content: inputValue };

    setChatHistory((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const { data } = await axios.post("http://localhost:4000/api/chat", {
        messages: [...chatHistory, newUserMessage],
      });

      setChatHistory((prev) => [...prev, data.reply]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-full">
      {/* 1. 채팅 기록 표시 영역 */}
      <div className="flex-grow overflow-y-auto p-4">
        {/* 2. map 부분을 MessageBubble 컴포넌트로 교체 */}
        {chatHistory.map((chat, index) => (
          <MessageBubble key={index} chat={chat} />
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4 items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
              <FaRobot className="text-slate-500" />
            </div>
            <div className="bg-slate-200 py-3 px-5 rounded-2xl rounded-bl-none">
              <BeatLoader color={"#64748b"} size={8} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 2. 메시지 입력 폼 (반응형 적용) */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-slate-50 border-t border-slate-200"
      >
        <div className="flex items-center bg-white border border-slate-300 rounded-full px-2 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow bg-transparent p-2 focus:outline-none"
            placeholder="메시지를 입력하세요..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none disabled:bg-slate-300 transition-colors"
            disabled={isLoading || !inputValue.trim()}
          >
            <GoPaperAirplane className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConversationSection;
