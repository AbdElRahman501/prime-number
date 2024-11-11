"use client";

import { useEffect, useState } from "react";

interface SwitchProps<T> {
  checked: boolean;
  item: T;
  action?: (item: T) => Promise<void>;
}

export default function Switch<T>({
  checked: initialChecked,
  item,
  action,
}: SwitchProps<T>) {
  const [checked, setChecked] = useState(initialChecked);

  // Update the `checked` state only if `initialChecked` changes and differs from the current `checked` state
  useEffect(() => {
    if (checked !== initialChecked) {
      setChecked(initialChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialChecked]);

  // TODO : make it take update button action not specific action in case there is multiple checkbox so you don't hav to create multiple actions
  return (
    <td className="whitespace-nowrap px-6 py-4">
      <button
        onClick={async () => {
          if (action) {
            setChecked(!checked);
            await action(item);
          }
        }}
        className={`${checked ? "bg-green-500" : "bg-red-500"} h-6 w-12 rounded-full p-1 duration-300`}
      >
        <div
          className={`${checked ? "translate-x-0" : "-translate-x-6"} h-4 w-4 rounded-full bg-white duration-300`}
        ></div>
      </button>
    </td>
  );
}
