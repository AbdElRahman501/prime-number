import Sidebar from "@/components/Sidebar";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default layout;
