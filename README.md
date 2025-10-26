# 📰 NewsPortal – Next.js News App
A responsive news web app built with **Next.js (App Router)** and **TypeScript**, where users can explore the latest headlines, filter by category, search articles, view full details, and save favourites — all powered by **NewsAPI**.
## 🚀 Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/newsportal.git
   cd newsportal
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```
5. **Open in browser**
   ```bash
   http://localhost:3000
   ```
## 🧰 Tech Stack Used
- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **NewsAPI.org** (for real-time news)
- **Framer Motion** (animations)
- **LocalStorage** (manage favourites)
## ✨ Features Implemented
### 🔹 Core Pages
- **Home Page:** Latest headlines, search bar, and category list.
- **Category Page:** Filter and display articles by category (General, Business, Technology, Science, Health, Sports, Entertainment).
- **News Details Page:** Full article content, image, share buttons (Twitter, Facebook, LinkedIn, Copy Link), and favourite toggle.
- **Favourites Page:** Lists all saved articles from localStorage.
### 🔹 Functional Features
- 🔍 Search articles by keyword  
- 🧭 Dynamic routing for detailed view  
- 🏷️ Category-based news listing  
- ❤️ Save/remove favourites  
- 📤 Social media share options  
- 🌓 Dark/Light mode toggle  
- 📱 Fully responsive (desktop, tablet, mobile)  
- 🔄 Pagination for smooth browsing  
## ⚙️ Challenges Faced
- **NewsAPI limitations** — handled by conditional URLs for search/category queries.  
- **Dynamic route typing** — solved `ParamValue` TypeScript errors with safe `Array.isArray()` casting.  
- **Image loading failures** — managed fallback styling and safe rendering.  
- **Theme & UI responsiveness** — ensured consistent dark/light styling across all components.  
- **LocalStorage sync** — handled real-time updates between favourites and details pages.  
## 📸 Preview
A clean, modern UI that adapts beautifully across devices — featuring category tabs, article cards, and smooth transitions using Framer Motion.
## 🧑‍💻 Author
Developed by **Shuvajit Pal**  
📧 Email: shuvajitpal103@gmail.comn
🔗 API Source: [https://newsapi.org](https://newsapi.org)