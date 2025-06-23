
# 🧑‍💼 HR Dashboard (Next.js + Bootstrap)

A modern HR Management Dashboard for tracking employee performance, managing bookmarks, viewing analytics, and more — built using **Next.js App Router**, **Zustand**, and **Bootstrap 5**.

---

## 🚀 Features Implemented

- ✅ **Authentication** with login screen (mocked using `localStorage`)
- ✅ **Employee Dashboard** displaying users with:
  - Ratings (star-based)
  - Department tags
  - Bookmark/Promote buttons
- ✅ 🔍 **Search and Filters** by:
  - Name, Email, Department (case-insensitive)
  - Multi-select filters for department & rating
- ✅ 👤 **Dynamic Employee Detail Page**
  - Tabs: Overview, Projects, Feedback
  - Performance history, contact info
- ✅ 📌 **Bookmark Manager**
  - Bookmark/unbookmark users
  - Assign or Promote with UI feedback
  - Pagination for long lists
- ✅ 📊 **Analytics Dashboard**
  - Average rating per department
  - Mocked bookmark trends
- ✅ 🌗 **Dark/Light Mode Toggle** (Bootstrap themed)
- ✅ ➕ **Create User Modal**
  - Validated form for adding new employee
- ✅ 📄 **Pagination**
  - 12 users per page in Home and Bookmarks
- ✅ 💬 **Feedback Form** in user tabs (mock submission)
- ✅ ✨ **Framer Motion Animations** for smooth tab transitions

---

## 📁 Tech Stack

- **Next.js (App Router)**
- **Bootstrap 5** (No Tailwind)
- **Zustand** (for global state)
- **Chart.js + react-chartjs-2**
- **Framer Motion** (tab transitions)
- **JavaScript (ES6)**

---



## 🔐 Login Details

This project uses **mock login** via `localStorage`.

To log in:

-   Enter username/email as "hr@gmail.com" and password as "hr123".
    
-   You’ll be redirected to `/home`.

## 🖼️ Demo Video & Screenshots

Demo video:
https://github.com/user-attachments/assets/f71a43d3-21fb-41b7-98ce-b4be64b780d5

Login Page :
![Image](https://github.com/user-attachments/assets/d9e8b114-e882-4fd1-98a2-787a3cff9b39)

Home Page(Light Mode):
![Image](https://github.com/user-attachments/assets/001143f0-ed0b-4da3-a8b3-b5f004808843)

Home Page(Dark Mode):
![Image](https://github.com/user-attachments/assets/284ea63d-d654-4d96-82d9-b8d10f74cd8f)

Pagination:
![Image](https://github.com/user-attachments/assets/6ce8a930-756a-4e5b-a93a-15f8424ee948)

Create User:
![Image](https://github.com/user-attachments/assets/df7cf1df-1471-435c-90ce-71954030e5a9)

Bookmarks Page:
![Image](https://github.com/user-attachments/assets/7af4eb92-f24c-4778-b2f2-111e98b4ac79)

Analytics page:
![Image](https://github.com/user-attachments/assets/f20ca9ed-a5ed-4761-b21b-8e25793a9aec)

Employee Page:
![Image](https://github.com/user-attachments/assets/934fbb9f-903b-4a90-9d7b-4e3a0666c3ca)

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hr-dashboard.git
cd hr-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Dev server

```bash
npm run dev
```


ℹ️ App runs on `http://localhost:3000`
