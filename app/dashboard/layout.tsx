import Sidebar from "@/components/Sidebar";
const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      {children}
    </div>
  );
};

export default layout;
