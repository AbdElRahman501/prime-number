export const DropDown: React.FC<
  { children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">
> = ({ children, ...props }) => {
  return (
    <div {...props} className={"group relative" + props.className}>
      {children}
    </div>
  );
};

export const DropDownButton: React.FC<
  { children: React.ReactNode } & React.ComponentPropsWithoutRef<"button">
> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      aria-expanded="true"
      aria-haspopup="true"
      {...props}
      className={`opacity-20 outline-none group-focus-within:opacity-100 group-focus-within:outline group-focus-within:outline-2 group-focus-within:outline-offset-2 group-focus-within:outline-primary group-hover:outline group-hover:outline-2 group-hover:outline-offset-2 group-hover:outline-primary ${props.className}`}
    >
      {children}
    </button>
  );
};

export const DropDownList: React.FC<
  { children: React.ReactNode } & React.ComponentPropsWithoutRef<"ul">
> = ({ children, ...props }) => {
  return (
    <ul
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
      {...props}
      className={`absolute right-1/2 z-10 mt-1 hidden translate-x-1/2 shadow-lg hover:block group-focus-within:block ${props.className}`}
    >
      {children}
    </ul>
  );
};
