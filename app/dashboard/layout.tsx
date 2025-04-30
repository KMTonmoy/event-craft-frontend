import "../../app/globals.css";
import Sidebar from "../../components/Sidebar";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex justify-center w-full">{children}</main>
    </div>
  );
}
