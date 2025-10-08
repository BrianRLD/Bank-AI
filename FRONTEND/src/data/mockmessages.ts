export interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

export const mockMessages: Message[] = [
  { id: 1, sender: 'bot', text: 'Hola, ¿en qué puedo ayudarte hoy?' },
  { id: 2, sender: 'user', text: 'Quiero ver mis últimos estados de cuenta' },
  { id: 3, sender: 'bot', text: 'Claro, aquí tienes los últimos 3 meses de tu cuenta.' },
];
