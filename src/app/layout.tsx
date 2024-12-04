import type { Metadata } from "next";
import "./globals.css";
import RootLayout from "../components/RootLayout";

export const metadata: Metadata = {
  title: "Mega Blog",
  description: "The project is a modern web application that combines Appwrite, React, Redux Toolkit, React Hook Form, and Tailwind CSS with DaisyUI for a seamless user experience. It features secure authentication, user management, and post management. TinyMCE is used for rich text editing, while html-react-parser renders HTML content in the UI. Articles are styled with @tailwindcss/typography for readability. The app offers efficient backend integration, real-time validation, and a clean, responsive design.",
  icons:"/mega-blog.png"
};

export default RootLayout
