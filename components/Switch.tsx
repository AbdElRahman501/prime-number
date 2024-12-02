"use client";

import { useEffect, useState } from "react";
import Notification from "./Notification";
import { Result } from "@/types";

interface SwitchProps<T> {
  checkKey: keyof T;
  item: T;
  action?: (item: T) => Promise<Result>;
}

export default function Switch<T>({ checkKey, item, action }: SwitchProps<T>) {
  const initialChecked = item[checkKey] as boolean;
  const [error, setError] = useState<string>("");
  const [checked, setChecked] = useState(initialChecked);

  // Update the `checked` state only if `initialChecked` changes and differs from the current `checked` state
  useEffect(() => {
    if (checked !== initialChecked) {
      setChecked(initialChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialChecked]);

  return (
    <td className="whitespace-nowrap px-6 py-4">
      <button
        onClick={async () => {
          if (action) {
            setChecked((pv) => !pv);
            const result = await action({ ...item, [checkKey]: !checked });
            if (result.success) {
              setError("");
            } else {
              setChecked((pv) => !pv);
              setError(result.message);
            }
          }
        }}
        className={` ${action ? "" : "pointer-events-none"} ${checked ? "bg-green-500" : "bg-red-500"} h-6 w-12 rounded-full p-1 duration-300`}
      >
        <div
          className={`${checked ? "translate-x-0" : "-translate-x-6"} h-4 w-4 rounded-full bg-white duration-300`}
        ></div>
      </button>
      {error ? (
        <Notification
          message={error}
          title="لا يمكن تغير هذه الحاله :"
          key={new Date().getTime()}
          time={8000}
          type="error"
          onClose={() => setError("")}
        />
      ) : null}
    </td>
  );
}
