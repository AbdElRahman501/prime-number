const Modal: React.FC<{ isOpen: boolean; children: React.ReactNode }> = ({
  isOpen,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 top-[76px] z-30 flex h-[calc(100dvh-50px)] w-screen items-center justify-center bg-black/30 p-4 backdrop-blur-sm duration-300">
      <div className="flex flex-col items-center justify-between gap-2 rounded-3xl bg-white p-5">
        {children}
      </div>
    </div>
  );
};

export default Modal;
