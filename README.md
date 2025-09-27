📝 Blogging Platform

A full-stack MERN-based web application for creating, managing, and sharing blogs. The platform supports user authentication, rich text editing, image uploads, categories/tags, comments, and an admin dashboard for content moderation.

🚀 Live Demo
COMING SOON

🧰 Tech Stack

Frontend:

React.js

Redux Toolkit

Tailwind CSS

React Router

React Quill (for rich text editing)

Backend:

Node.js

Express.js

MongoDB

Multer (for image upload)

JWT (Authentication)

🎯 Key Features

✅ User Authentication (Signup/Login with JWT)
✅ Create, Edit & Delete Blogs
✅ Rich Text Blog Editor with Images
✅ Categories & Tags for Blogs
✅ Comment System
✅ Like & Share Blogs
✅ Search & Filter Blogs
✅ Upload History Dashboard (for users)
✅ Admin Dashboard for Managing Users & Blogs
✅ SEO-Friendly Blog URLs

🗂️ Folder Structure
/backend
 ├── models/
 ├── routes/
 ├── middleware/
 └── server.js

/frontend
 ├── src/
 ├── components/
 ├── pages/
 ├── redux/
 ├── services/
 └── App.js

🛠️ Installation & Setup
Clone the Repository
git clone https://github.com/chandan9648/Blogkaro-blog.git
cd blog-platform

Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
ADMIN_EMAIL=your_admin_email


Run the backend:

npm run dev

Frontend Setup
cd frontend
npm install
npm start

📚 References

React Quill (Rich Text Editor)

Tailwind CSS

MongoDB Docs

Express.js Docs

🙌 Acknowledgements

Inspired by modern blogging platforms like Medium and Dev.to. Built as a full-stack MERN project.

📬 Contact

Developer: Chandan Chaudhary
Email: chandanchaudhary1710@gmail.com

GitHub: github.com/chandan9648
