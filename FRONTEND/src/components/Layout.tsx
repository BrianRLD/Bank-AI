import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import type { Chat } from '../types/types';

interface LayoutProps {
  children: ReactNode;
  chats: Chat[];
  activeChatId: number;
  onSelectChat: (id: number) => void;
  onNewChat: () => Promise<void>;
  refreshChats: () => Promise<void>;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  refreshChats,
  onLogout,
}) => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={onSelectChat}
        onNewChat={onNewChat}
        refreshChats={refreshChats}
        onLogout={onLogout}
      />
      <div className="flex-1 bg-gray-50 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
