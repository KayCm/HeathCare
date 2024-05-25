import { Inter } from "next/font/google";
import "./globals.css";
import TopNavBar from "@/Component/TopNavBar";
import BottomInfoBar from "@/Component/BottomInfoBar";
import {ReduxProvider} from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JoinCare",
  description: "JoinCare",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider >
          <TopNavBar />
            {children}
          <BottomInfoBar />
      </ReduxProvider>
      </body>
    </html>
  );
}
