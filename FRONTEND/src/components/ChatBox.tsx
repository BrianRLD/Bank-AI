import { useRef, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import type { Chat, Message } from "../types/types";

interface ChatBoxProps {
  chat: Chat;
  onSendMessage: (text: string) => void;
}

const ChatBox = ({ chat, onSendMessage }: ChatBoxProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <div className="flex flex-col flex-1 h-full w-full max-w-[800px] mx-auto">
        {/* Mensajes */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-4">
          {chat.messages && chat.messages.length > 0 ? (
            chat.messages.map((msg: Message) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-[70%] break-words ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-200 text-black self-start'
                }`}
              >
                {msg.text}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages yet</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 p-4 border-t border-gray-300 flex bg-white">
          <input
            type="text"
            placeholder="write your message..."
            className="flex-1 py-3 px-4 rounded-full bg-gray-100 focus:outline-none text-gray-900"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 flex items-center justify-center"
          >
            <IoMdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
