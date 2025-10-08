// src/types.ts
export interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

export interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

// Props para el Layout que envuelve ChatPage
export interface LayoutProps {
  chats: Chat[];
  activeChatId: number;
  onSelectChat: (id: number) => void;
  onNewChat: () => void | Promise<void>;
  refreshChats: () => void | Promise<void>;
  onLogout?: () => void;
  children: React.ReactNode;
}
