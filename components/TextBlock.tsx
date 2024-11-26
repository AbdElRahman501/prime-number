"use client";
import { useRef } from "react";

const renderTextWithLineBreaksAndStrong = (text: string) => {
  return text.split("\n").map((str, index) => {
    // Use a regex to find text between ** and wrap it in <strong>
    const formattedText = str.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        // Remove the ** and wrap in <strong>
        return (
          <span
            style={{ letterSpacing: "-0.019em" }}
            key={`strong-${index}-${i}`}
          >
            <span className="opacity-20">**</span>
            <span className="font-semibold text-black">
              {part.slice(2, -2)}
            </span>
            <span className="opacity-20">**</span>
          </span>
        );
      }
      return part;
    });
    return (
      <span key={index}>
        {formattedText}
        <br />
      </span>
    );
  });
};

const TextBlock: React.FC<React.HTMLProps<HTMLTextAreaElement>> = (props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const element = textareaRef.current;
    if (element) {
      element.style.height = "auto"; // Reset height
      element.style.height = `${element.scrollHeight}px`; // Adjust height based on scrollHeight
    }
  };

  return (
    <div dir="rtl" className="grid grid-cols-1">
      <textarea
        {...props}
        ref={textareaRef}
        rows={1}
        onInput={adjustHeight}
        className={`col-start-1 row-start-1 resize-none overflow-hidden border border-none bg-transparent text-transparent caret-black outline-none selection:bg-blue-200 selection:text-transparent ${props.className}`}
      />
      <p
        className={`pointer-events-none col-start-1 row-start-1 h-full w-full whitespace-pre-wrap break-words border border-none outline-none selection:text-white ${props.className}`}
      >
        {renderTextWithLineBreaksAndStrong(
          String(props.value || props.defaultValue || ""),
        )}
      </p>
    </div>
  );
};

export default TextBlock;
