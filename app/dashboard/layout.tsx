import Sidebar from "@/components/Sidebar";
import { NextAuthProvider } from "@/NextAuthProvider";
import { Suspense } from "react";
const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <NextAuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>
      </NextAuthProvider>

      {/* Main content area */}
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
};

export default layout;
