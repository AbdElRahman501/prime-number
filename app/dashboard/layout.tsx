import Sidebar from "@/components/Sidebar";
const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default layout;
