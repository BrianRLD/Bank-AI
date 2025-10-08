-- ===========================
--  USERS
-- ===========================


SET client_encoding = 'UTF8';

INSERT INTO users (name, email, password_hash, role)
VALUES
('Admin User', 'admin@bank.com', 'hash_admin', 'admin'),
('Sofía Ramírez', 'sofia@bank.com', 'hash_emp1', 'employee'),
('Carlos Medina', 'carlos@bank.com', 'hash_emp2', 'employee'),
('Laura Gómez', 'laura@client.com', 'hash_client1', 'client'),
('Miguel Torres', 'miguel@client.com', 'hash_client2', 'client'),
('Ana Rodríguez', 'ana@client.com', 'hash_client3', 'client'),
('Diego Herrera', 'diego@client.com', 'hash_client4', 'client'),
('Paula Sánchez', 'paula@client.com', 'hash_client5', 'client'),
('José Pérez', 'jose@client.com', 'hash_client6', 'client'),
('Mariana López', 'mariana@client.com', 'hash_client7', 'client');

-- ===========================
--  ACCOUNTS
-- ===========================
INSERT INTO accounts (user_id, account_number, account_type, balance)
VALUES
(4, 'CHK1001', 'checking', 2850.75),
(4, 'SAV1002', 'savings', 5000.00),
(5, 'CHK2001', 'checking', 1200.50),
(6, 'CHK3001', 'checking', 980.00),
(6, 'SAV3002', 'savings', 3500.25),
(7, 'CHK4001', 'checking', 450.00),
(8, 'CHK5001', 'checking', 6200.00),
(9, 'SAV6001', 'savings', 830.90),
(10, 'CHK7001', 'checking', 4100.30),
(10, 'SAV7002', 'savings', 9600.75);

-- ===========================
--  TRANSACTIONS
-- ===========================
INSERT INTO transactions (account_id, amount, type, description, date)
VALUES
(1, 1000.00, 'deposit', 'Depósito inicial', '2025-09-15'),
(1, -200.00, 'payment', 'Pago de electricidad', '2025-09-18'),
(1, -150.50, 'withdrawal', 'Retiro en cajero', '2025-09-20'),
(2, 500.00, 'deposit', 'Intereses mensuales', '2025-09-30'),
(3, 300.00, 'deposit', 'Transferencia recibida', '2025-09-19'),
(3, -50.00, 'payment', 'Compra en línea', '2025-09-20'),
(4, -100.00, 'withdrawal', 'Retiro en cajero', '2025-09-25'),
(5, 2000.00, 'deposit', 'Depósito nómina', '2025-09-15'),
(6, -80.00, 'payment', 'Pago supermercado', '2025-09-17'),
(7, 1000.00, 'deposit', 'Venta de producto', '2025-09-20'),
(7, -300.00, 'payment', 'Pago tarjeta crédito', '2025-09-21'),
(8, 250.00, 'deposit', 'Transferencia familiar', '2025-09-18'),
(9, -500.00, 'withdrawal', 'Giro a otro banco', '2025-09-28'),
(10, 700.00, 'deposit', 'Intereses ahorro', '2025-09-30');

-- ===========================
--  CHATS
-- ===========================
INSERT INTO chats (user_id, title)
VALUES
(4, 'Consulta de saldo'),
(4, 'Transferencias recientes'),
(5, 'Bloqueo de cuenta'),
(6, 'Depósito pendiente'),
(7, 'Revisión de movimientos'),
(8, 'Problema con transferencia'),
(9, 'Ayuda con app móvil'),
(10, 'Solicitar préstamo personal'),
(4, 'Cambio de contraseña'),
(5, 'Asistente IA - Análisis financiero');

-- ===========================
--  MESSAGES
-- ===========================
INSERT INTO messages (chat_id, sender, text)
VALUES
(1, 'user', '¿Cuál es mi saldo actual?'),
(1, 'bot', 'Tu saldo actual es de $2,850.75 en tu cuenta corriente.'),
(2, 'user', 'Muéstrame las últimas transferencias'),
(2, 'bot', 'Aquí están tus últimas transferencias del mes de septiembre.'),
(3, 'user', 'Perdí mi tarjeta, necesito bloquear la cuenta.'),
(3, 'employee', 'Tu cuenta ha sido bloqueada temporalmente por seguridad.'),
(4, 'user', 'No veo mi depósito del viernes.'),
(4, 'bot', 'Revisando... se registró el depósito el día 15 de septiembre.'),
(5, 'user', '¿Puedo ver todos mis movimientos del mes?'),
(5, 'bot', 'Claro, aquí tienes tu resumen mensual.'),
(6, 'user', 'Mi transferencia fue rechazada, ¿por qué?'),
(6, 'bot', 'El rechazo fue por fondos insuficientes.'),
(7, 'user', 'No puedo entrar a la app del banco.'),
(7, 'employee', 'Estamos trabajando en una actualización, prueba más tarde.'),
(8, 'user', '¿Qué necesito para solicitar un préstamo personal?'),
(8, 'bot', 'Debes tener ingresos estables y cuenta activa por más de 6 meses.'),
(9, 'user', 'Quiero cambiar mi contraseña.'),
(9, 'bot', 'Puedes hacerlo desde Configuración > Seguridad.'),
(10, 'user', 'Analiza mis gastos este mes.'),
(10, 'bot', 'Tu gasto promedio fue de $830 con énfasis en pagos de servicios.');

-- ===========================
--  PERMISSIONS
-- ===========================
INSERT INTO permissions (user_id, can_view_clients, can_manage_transactions, can_access_ai)
VALUES
(1, true, true, true),
(2, true, true, true),
(3, true, false, true);
