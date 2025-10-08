import React, { useState } from 'react';
import { FiSearch, FiPlus, FiSettings, FiTrash2, FiLogOut, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import type { Chat } from '../types/types';

interface SidebarProps {
  chats: Chat[];
  activeChatId: number;
  onSelectChat: (id: number) => void;
  onNewChat: () => Promise<void>;
  refreshChats: () => Promise<void>;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  refreshChats,
  onLogout,
}) => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteChat = async (id: number) => {
    if (!confirm('Do you want to delete this chat?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chats/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al borrar chat');
      await refreshChats();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleDeleteAllChats = async () => {
    if (!confirm('Do you want to delete all chats?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chats`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al borrar todos los chats');
      await refreshChats();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="w-72 h-screen bg-gray-900 text-white flex flex-col justify-between">
      {/* Parte superior */}
      <div>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-lg font-semibold">Bank AI</h2>
          <button
            onClick={onNewChat}
            className="p-2 bg-blue-600 rounded-full hover:bg-blue-500"
          >
            <FiPlus size={18} />
          </button>
        </div>

        <div className="p-3 border-b border-gray-700 flex items-center">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 text-white w-full rounded px-2 py-1 focus:outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map(chat => (
              <div
                key={chat.id}
                className={`flex justify-between items-center px-4 py-3 border-b border-gray-700 cursor-pointer ${
                  chat.id === activeChatId ? 'bg-gray-800 font-bold' : 'hover:bg-gray-600'
                }`}
              >
                <div onClick={() => onSelectChat(chat.id)} className="flex-1">
                  {chat.title}
                </div>
                <button
                  onClick={() => handleDeleteChat(chat.id)}
                  className="p-1 hover:text-red-400"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 p-4">No chats found</p>
          )}
        </div>
      </div>

      {/* Menú inferior */}
      <div className="border-t border-gray-700 p-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full flex justify-between items-center text-gray-300 hover:text-white"
        >
          <span>Menú</span>
          {menuOpen ? <FiChevronDown /> : <FiChevronUp />}
        </button>

        {menuOpen && (
          <div className="mt-3 space-y-2">
            <button
              onClick={() => alert('Abrir configuración...')}
              className="flex items-center w-full gap-2 hover:bg-gray-800 p-2 rounded"
            >
              <FiSettings /> Configuration
            </button>

            <button
              onClick={handleDeleteAllChats}
              className="flex items-center w-full gap-2 hover:bg-gray-800 p-2 rounded text-red-400 hover:text-red-300"
            >
              <FiTrash2 /> Delete all chats
            </button>

            <button
              onClick={onLogout}
              className="flex items-center w-full gap-2 hover:bg-gray-800 p-2 rounded text-yellow-400 hover:text-yellow-300"
            >
              <FiLogOut /> Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
