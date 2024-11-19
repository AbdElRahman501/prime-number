"use client";
import React, { useState } from "react";

interface CompactTextProps {
  content: string;
}

const CompactText: React.FC<CompactTextProps> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="text-gray-800">
      <p
        className={`${isExpanded ? "" : "line-clamp-2"} break-words" min-w-40 overflow-hidden text-ellipsis`}
      >
        {content}
      </p>
      <button
        onClick={toggleExpanded}
        className="mt-1 inline text-xs text-blue-500 hover:underline focus:outline-none"
      >
        {isExpanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
};

export default CompactText;
