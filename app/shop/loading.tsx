import LogoIcon from "@/components/LogoIcon";

const loading = () => {
  return (
    <div className="flex h-[90dvh] w-full items-center justify-center">
      <LogoIcon className="w-24 animate-pulse text-primary" />
    </div>
  );
};

export default loading;
