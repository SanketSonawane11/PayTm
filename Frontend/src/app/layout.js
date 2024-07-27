import { Inter } from "next/font/google";
import "./globals.css";
import RecoilContextProvider from "./lib/recoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Recoil and Backend",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      <body className={inter.className}>
        <RecoilContextProvider>{children}</RecoilContextProvider>
      </body>
    </html>
  );
}
