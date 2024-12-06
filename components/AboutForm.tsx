"use client";
import { AboutBlock } from "@/types";
import { useEffect, useState } from "react";
import { hasDataChanged, removeIdFromArray } from "@/utils";
import { updateAbout } from "@/lib/actions/about.actions";
import { usePrompt } from "./Notification";
import { BlockOptions } from "./BlockOptions";
import {
  EditableFeatureBlock,
  EditableHeaderBlock,
  EditableParagraphBlock,
} from "./Blocks";
import LoadingDots from "./loading-dots";

interface AboutFormProps {
  aboutData: AboutBlock[]; // Props to pass the initial data array of `AboutBlock` type.
}

export default function AboutForm({ aboutData }: AboutFormProps) {
  const [data, setData] = useState(aboutData); // State for the current data being edited.
  const [isDirty, setIsDirty] = useState(false); // Tracks if the form has unsaved changes.
  const [loading, setLoading] = useState(false); // Tracks the loading state for form submission.
  const [error, setError] = useState(""); // Tracks any error messages.

  usePrompt("Leave screen?", isDirty); // Prompts the user if they attempt to leave with unsaved changes.

  // Effect to determine if the form data has been modified.
  useEffect(() => {
    setIsDirty(hasDataChanged(aboutData, data));
  }, [data, aboutData]);

  // Handler for form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateAbout(removeIdFromArray(data));
      if (result.success) {
        setIsDirty(false);
      } else {
        setError(result.message);
      }
    } catch (err: unknown) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handler to reset the form data to its initial state.
  const handleReset = () => {
    setData(aboutData); // Reset data state to the original `aboutData`.
    setIsDirty(false); // Reset dirty state.
    setError(""); // Reset error state.
  };

  // Function to render different block types dynamically.
  const renderBlock = (block: AboutBlock) => {
    switch (block.type) {
      case "header":
        return (
          <EditableHeaderBlock
            key={block._id}
            block={block}
            setData={setData}
          />
        );
      case "paragraph":
        return (
          <EditableParagraphBlock
            key={block._id}
            block={block}
            setData={setData}
          />
        );
      case "features":
        return (
          <EditableFeatureBlock
            key={block._id}
            block={block}
            setData={setData}
          />
        );
      default:
        return null; // Render nothing if the block type is unsupported.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-6">
      {/* Sticky header to show save/reset options */}
      <div
        aria-expanded={isDirty} // Accessibility: indicates if there are unsaved changes.
        className="group sticky top-[85px] z-[5] w-full bg-background p-2"
      >
        {/* Display error message if present */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Buttons for saving or resetting changes */}
        <div className="invisible flex items-center justify-end gap-2 group-aria-expanded:visible">
          <button
            type="submit"
            className="rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <div className="h-6">{loading ? <LoadingDots /> : "حفظ"}</div>
          </button>
          <button
            onClick={handleReset}
            type="reset"
            className="rounded-2xl border border-primary px-4 py-2 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            إلغاء
          </button>
        </div>
      </div>

      {/* Component for managing block-level options */}
      <BlockOptions setData={setData} />

      {/* Render each block dynamically */}
      {data.map(renderBlock)}
    </form>
  );
}
