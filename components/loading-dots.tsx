const LoadingDots = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex h-full w-full items-center justify-center gap-1 ${className}`}
    >
      <span
        className={`m-0 aspect-square h-fit w-fit animate-bounce overflow-hidden rounded-full bg-current p-0 leading-[0] [animation-delay:-0.3s]`}
      >
        .
      </span>
      <span
        className={`m-0 aspect-square h-fit w-fit animate-bounce overflow-hidden rounded-full bg-current p-0 leading-[0] [animation-delay:-0.15s]`}
      >
        .
      </span>
      <span
        className={`m-0 aspect-square h-fit w-fit animate-bounce overflow-hidden rounded-full bg-current p-0 leading-[0]`}
      >
        .
      </span>
    </div>
  );
};

export default LoadingDots;
