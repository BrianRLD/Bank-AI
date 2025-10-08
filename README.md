# 🤖 Bank Assistant AI

**Author:** Brian Amparo  
**Year:** 2025  
**Tech Stack:** Node.js · Express · React · PostgreSQL · TypeScript · AI (Phi model)

---

## 🧭 Overview

**Bank Assistant AI** is a project designed to demonstrate how artificial intelligence can integrate with modern banking systems.  
Its main goal is to allow users to interact with their financial data using **natural language**, as if they were speaking to a real banking assistant.

The system is built with a **modular architecture** consisting of three core services:
- A **backend** built with **Express**, managing routes, authentication, and database queries.
- A **frontend** built with **React**, providing a clean and interactive chat interface.
- An **AI service** powered by a local Phi model, which processes user prompts and generates smart responses.

---

## 🎯 Project Purpose

This project was created to explore how AI can improve user interaction within financial applications.  
Bank Assistant AI aims to **reduce friction** when accessing banking data, **automate common queries**, and **analyze financial patterns** in a secure and human-like way.

It also serves as a practical example of:
- Communication between multiple microservices.  
- Real-time data handling and AI-driven insights.  
- Implementing local AI inference (without relying on expensive external APIs).

---

## ⚙️ Project Structure
Bank-Assistant/
│
├── backend/ # REST API with Express + PostgreSQL
│ ├── controllers/
│ ├── services/
│ ├── routes/
│ └── prisma/ (or db)
│
├── ai-service/ # Local AI service using Phi model
│ ├── server.js
│ └── routes/
│
├── frontend/ # React + TypeScript client interface
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── api/
│ └── public/
│
└── README.md


---

## 🚀 How to Run the Project

### 1️⃣ Clone the repository

#git clone https://github.com/BrianRLD/Bank-Assistant.git
#cd Bank-Assistant

🧠 Key Features

🗣️ Natural language chat powered by a local AI model

📡 Database integration for real data responses

💾 Chat history per user and session

🔐 Role-based security and authentication

🔄 Seamless microservice communication (backend ↔ AI ↔ frontend)



##💡Future Improvements

Integration with voice commands (Speech-to-Text)

Smart financial recommendations

Dashboard for transaction analytics

Support for multi-language prompts

📄 License

This project is licensed under the MIT License.
You’re free to use, modify, and distribute it — just credit the original author.

**Developed by [Brian Amparo](https://github.com/BrianRLD)** 💼

Educational project demonstrating AI applied to financial systems.


"# Bank-AI" 
