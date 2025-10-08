// src/pages/ChatPage.tsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ChatBox from '../components/ChatBox';
import type { Chat, Message } from '../types/types';
import { useNavigate } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Función para obtener el token
  const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado. Inicia sesión primero.');
      navigate('/login');
      return null;
    }
    return token;
  };

  // Cargar todos los chats
  const refreshChats = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${apiUrl}/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al obtener chats');
      const data: Chat[] = await res.json();
      setChats(data);
      if (data.length > 0 && !activeChatId) setActiveChatId(data[0].id);
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    }
  };

  useEffect(() => {
    refreshChats();
  }, []);

  // Crear nuevo chat
  const handleNewChat = async () => {
    const token = getToken();
    if (!token) return;

    const title = prompt('Name of the new chat:');
    if (!title) return;

    try {
      const res = await fetch(`${apiUrl}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Error al crear chat');
      await refreshChats();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  // Seleccionar chat activo
  const handleSelectChat = (id: number) => setActiveChatId(id);

  // Enviar mensaje y respuesta del bot (AI service)
  const handleSendMessage = async (text: string) => {
    const token = getToken();
    if (!token || !activeChatId) return;

    const newMessage: Message = { id: Date.now(), sender: 'user', text };

    // Mostrar mensaje del usuario inmediatamente
    setChats(prev =>
      prev.map(c =>
        c.id === activeChatId
          ? { ...c, messages: [...(c.messages ?? []), newMessage] }
          : c
      )
    );

    try {
      // Llamar al backend AI
      const res = await fetch(`${apiUrl}/chats/${activeChatId}/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await res.json();
      const botMessage: Message = { id: Date.now() + 1, sender: 'bot', text: data.response };

      // Mostrar respuesta del bot
      setChats(prev =>
        prev.map(c =>
          c.id === activeChatId
            ? { ...c, messages: [...(c.messages ?? []), botMessage] }
            : c
        )
      );
    } catch (err) {
      console.error('Error al comunicarse con AI:', err);
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const activeChat = chats.find(c => c.id === activeChatId) ?? null;

  return (
    <Layout
      chats={chats}
      activeChatId={activeChatId ?? 0}
      onSelectChat={handleSelectChat}
      onNewChat={handleNewChat}
      refreshChats={refreshChats}
      onLogout={handleLogout}
    >
      {activeChat ? (
        <ChatBox chat={activeChat} onSendMessage={handleSendMessage} />
      ) : (
        <p className="p-8 text-gray-600">Select a chat to start</p>
      )}
    </Layout>
  );
};

export default ChatPage;
