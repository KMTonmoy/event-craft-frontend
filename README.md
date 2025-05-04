# 🎨 EventCraft Frontend

This is the **frontend** for **EventCraft** — a powerful Event Planner & Participation System. Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **ShadCN UI**, it provides users with a modern, responsive, and intuitive interface for creating, exploring, and managing events.

---

## 🚀 Features

- ✨ Beautiful, responsive UI using Tailwind and ShadCN UI  
- 🔐 JWT authentication via HTTP-only cookies  
- 🗓️ Create, update, and delete events  
- 🔍 Toggle Public & Private visibility  
- 💳 Join paid or free events  
- 🙋 Request to join private events  
- ⭐ Leave reviews and ratings  
- 📤 Connects seamlessly with backend REST API  

---

## 🧑‍💻 Tech Stack

- Next.js 14 (App Router)  
- Tailwind CSS  
- ShadCN UI  
- Axios  
- React Hook Form + Zod  
- JWT (stored in HTTP-only cookies)  
- Framer Motion  
- TypeScript  

---

## 🔐 Authentication Flow

- Users login through `/auth/login`
- Backend returns JWT token in HTTP-only cookie
- Frontend uses `useAuth` hook to fetch user from token
- Logout clears the cookie and redirects to login

---

## 💡 Planned Features

- 🎉 Event category & date filtering  
- 📍 Map-based location integration  
- 🔔 Notification system for invites and approvals  
- 📊 Admin analytics dashboard  
- 📱 PWA support and mobile-first enhancements  


## ⚙️ Setup Guide

Follow these steps to get the EventCraft frontend running on your local machine:

### 1. Clone the Repository

```bash
   git clone https://github.com/KMTonmoy/event-craft-frontend.git
   cd event-craft-frontend
   npm install
   npm run dev

```
## 🙋 Author

**Tonmoy Ahamed**  
📞 01731158705  

---

## 📝 License

MIT License
