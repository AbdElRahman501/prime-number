import { FormElements } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";

export const CustomFormeElement: React.FC<
  React.HTMLProps<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > & { options?: string[] }
> = (props) => {
  switch (props.type as FormElements) {
    case "select":
      return (
        <CustomSelect
          {...(props as React.HTMLProps<HTMLSelectElement>)}
          options={props.options || []}
        />
      );
    case "textarea":
      return (
        <CustomTextArea {...(props as React.HTMLProps<HTMLTextAreaElement>)} />
      );

    case "checkbox":
      return (
        <CustomCheckbox {...(props as React.HTMLProps<HTMLInputElement>)} />
      );
    case "radio":
      return (
        <CustomRadio
          {...(props as React.HTMLProps<HTMLInputElement>)}
          options={props.options || []}
        />
      );
    default:
      return <CustomInput {...(props as React.HTMLProps<HTMLInputElement>)} />;
  }
};

export const CustomSelect: React.FC<
  React.HTMLProps<HTMLSelectElement> & { options: string[] }
> = (props) => {
  return (
    <div className="relative flex w-full flex-col">
      <select
        {...props}
        className=":focus:ring-gray-200 peer h-14 w-full appearance-none rounded-lg border-[1px] border-gray-300 bg-transparent px-4 pt-3 text-base outline-none placeholder-shown:pt-0 invalid:border-pink-500 invalid:text-pink-600 focus:border-2 focus:border-black focus:pt-3 focus:ring-blue-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 placeholder-shown:invalid:focus:border-black enabled:cursor-pointer motion-reduce:transition-none"
      >
        <option value="" disabled className="text-gray-300">
          {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 transition-all duration-200 peer-enabled:peer-hover:text-gray-200">
        <Icon icon="mdi:chevron-down" className="h-6 w-6 fill-current" />
      </div>
      <label
        className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 !overflow-block pointer-events-none absolute left-0 top-2 flex h-full w-full select-none truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent"
        htmlFor={props.name}
      >
        {props.name}
      </label>
    </div>
  );
};

interface CustomInputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const CustomInput: React.FC<CustomInputProps> = (props) => {
  const letterLength: number =
    typeof props.value === "string" ? props.value?.length : 0;
  return (
    <div className="relative w-full">
      <input
        placeholder=" "
        {...props}
        className="focus: peer h-14 w-full rounded-lg border-[1px] border-gray-300 bg-transparent px-4 pt-3 text-base outline-none placeholder-shown:pt-0 invalid:border-pink-500 invalid:text-pink-600 placeholder-shown:invalid:border-gray-300 placeholder-shown:invalid:text-black focus:border-2 focus:border-black focus:pt-3 focus:text-black placeholder-shown:invalid:focus:border-black motion-reduce:transition-none"
      />
      <label
        className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 !overflow-block pointer-events-none absolute left-0 top-2 flex h-full w-full select-none truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent"
        htmlFor={props.name}
      >
        {props.label}
      </label>
      {props.maxLength ? (
        <p className="inline-block px-2 text-sm text-primary peer-invalid:text-pink-600 peer-placeholder-shown:peer-invalid:text-primary">
          {"(" + props.maxLength + "-" + letterLength + ")"}
        </p>
      ) : null}
      <p className="hidden px-2 text-sm text-pink-600 peer-invalid:inline-block peer-placeholder-shown:peer-invalid:hidden peer-focus:hidden">
        {props.error}
      </p>
    </div>
  );
};

export const CustomTextArea: React.FC<
  React.HTMLProps<HTMLTextAreaElement> & { error?: string }
> = (props) => {
  const letterLength: number =
    typeof props.value === "string" ? props.value?.length : 0;
  return (
    <div className="relative flex w-full flex-col">
      <textarea
        {...props}
        placeholder=" "
        className="peer h-20 w-full rounded-lg border-[1px] border-gray-300 bg-transparent px-4 pt-5 text-base outline-none placeholder-shown:pt-0 focus:border-2 focus:border-black focus:pt-5 focus:ring-blue-500 placeholder-shown:invalid:focus:border-black motion-reduce:transition-none"
      />
      <label
        className="peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 !overflow-block pointer-events-none absolute left-0 top-2 flex h-full w-full select-none truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent"
        htmlFor={props.name}
      >
        {props.placeholder}
      </label>
      {props.maxLength ? (
        <p className="inline-block px-2 text-sm text-primary peer-invalid:text-pink-600 peer-placeholder-shown:peer-invalid:text-primary">
          {"(" + props.maxLength + "-" + letterLength + ")"}
        </p>
      ) : null}
      <p className="hidden px-2 text-sm text-pink-600 peer-invalid:inline-block peer-placeholder-shown:peer-invalid:hidden peer-focus:hidden">
        {props.error}
      </p>
    </div>
  );
};

export const CustomRadio: React.FC<
  React.HTMLProps<HTMLInputElement> & { options: string[] }
> = (props) => {
  return (
    <fieldset>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold md:text-2xl">{props.name}</h2>
        {props.options.map((option, index) => (
          <label
            key={index}
            className="peer flex h-14 w-full cursor-pointer items-center justify-between rounded-lg border-[1px] border-gray-300 bg-transparent px-4 text-base outline-none has-[:checked]:border-2 has-[:checked]:border-black"
          >
            {option}
            <input
              {...props}
              type="radio"
              id={option}
              value={option}
              defaultChecked={index === 0}
              className="peer hidden"
            />
            <div className="flex h-6 w-6 min-w-6 items-center justify-center rounded-full text-white outline outline-[1px] outline-gray-200 focus:border-2 peer-checked:bg-black peer-checked:outline-black peer-checked:after:font-bold peer-checked:after:content-['✓']"></div>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export const CustomCheckbox: React.FC<React.HTMLProps<HTMLInputElement>> = (
  props,
) => {
  return (
    <label
      htmlFor={props.name}
      className="flex w-full cursor-pointer items-center gap-2 pb-4"
    >
      <input {...props} className="peer hidden"></input>
      <div className="flex h-6 w-6 min-w-6 items-center justify-center rounded-full text-white outline outline-[1px] outline-gray-300 focus:border-2 peer-checked:bg-black peer-checked:outline-black peer-checked:after:font-bold peer-checked:after:content-['✓']"></div>
      {props.name}
    </label>
  );
};
