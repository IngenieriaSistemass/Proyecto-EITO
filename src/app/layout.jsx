import { Inter } from "next/font/google";
import "./globals.css";
// Supports weights 300-700


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EITO Next App",
  description: "upload files and compress them for the class of Mitre",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">

      <body className={inter.className}>{children}</body>
    </html>
  );
}
