import { fontSizeMapping } from "@/constants";
import { AboutBlock, BlockFeature, BlockHeader, BlockParagraph } from "@/types";
import React from "react";
import TextBlock from "./TextBlock";
import { BlockOptions } from "./BlockOptions";
import { Icon } from "@iconify/react/dist/iconify.js";

export const HeaderBlock: React.FC<{ block: BlockHeader }> = ({ block }) => {
  return (
    <h1
      className={`${fontSizeMapping[block.level] || "text-5xl"} mb-8 text-center font-bold text-primary drop-shadow-md`}
      id="about-heading"
    >
      {block.content}
    </h1>
  );
};

export const ParagraphBlock: React.FC<{ content: string }> = ({ content }) => {
  return (
    <p className="mb-6 text-center text-lg leading-relaxed text-gray-700">
      {renderTextWithLineBreaksAndStrong(content)}
    </p>
  );
};

export const FeatureBlock: React.FC<{
  content: { title: string; description: string }[];
}> = ({ content }) => {
  return (
    <div className="my-5 flex flex-wrap justify-center gap-5">
      {content.map((feature, index) => (
        <div
          key={index}
          className="min-w-[300px] flex-1 transform rounded-3xl bg-white p-6 text-center shadow-xl transition-transform hover:scale-105"
        >
          <h2 className="mb-3 text-xl font-semibold text-primary">
            {feature.title}
          </h2>
          <p className="text-gray-600">
            {renderTextWithLineBreaksAndStrong(feature.description)}
          </p>
        </div>
      ))}
    </div>
  );
};

export const renderTextWithLineBreaksAndStrong = (text: string) => {
  return text.split("\n").map((str, index) => {
    // Use a regex to find text between ** and wrap it in <strong>
    const formattedText = str.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        // Remove the ** and wrap in <strong>
        return (
          <strong key={`strong-${index}-${i}`} className="text-black">
            {part.slice(2, -2)}
          </strong>
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

const updateBlockContent = (
  blocks: AboutBlock[],
  blockId: string,
  fieldName: string,
  fieldValue: string,
): AboutBlock[] => {
  return blocks.map((block) =>
    block._id === blockId ? { ...block, [fieldName]: fieldValue } : block,
  );
};

interface HeaderBlockProps {
  block: BlockHeader; // The current header block being rendered.
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>; // State setter for updating blocks.
}

export const EditableHeaderBlock: React.FC<HeaderBlockProps> = React.memo(
  function EditableHeaderBlockComponent({ block, setData }) {
    /**
     * Handles changes to the content of the block.
     * Updates the corresponding block in the state.
     */
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target; // Destructure the field name and value from the event target.
      setData((prevBlocks) =>
        updateBlockContent(prevBlocks, block._id, name, value),
      ); // Update the block content using the utility function.
    };

    return (
      <div>
        {/* TextBlock for editing the header content */}
        <TextBlock
          className={`${fontSizeMapping[block.level] || "text-5xl"} text-center font-bold drop-shadow-md`}
          id={`${block._id}-heading`} // Ensures unique IDs for accessibility.
          name="content" // Field name corresponding to the block content.
          placeholder="...قم بكتابة عنوان" // Placeholder text in Arabic.
          value={block.content} // Current value of the header content.
          required // Makes this field mandatory.
          onChange={handleContentChange} // Change handler to update the state.
        />

        {/* Options for managing the block (e.g., deleting or moving it) */}
        <BlockOptions block={block} setData={setData} />
      </div>
    );
  },
);

interface ParagraphBlockProps {
  block: BlockParagraph; // The paragraph block data being rendered.
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>; // State setter for updating blocks.
}

export const EditableParagraphBlock: React.FC<ParagraphBlockProps> = React.memo(
  function EditableParagraphBlockComponent({ block, setData }) {
    /**
     * Handles changes to the paragraph content.
     * Updates the corresponding block in the state.
     */
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target; // Destructure the field name and value from the event target.
      setData((prevBlocks) =>
        updateBlockContent(prevBlocks, block._id, name, value),
      ); // Update the block content using the utility function.
    };

    return (
      <div>
        {/* TextBlock for editing the paragraph content */}
        <TextBlock
          className="text-center text-lg leading-relaxed text-gray-600" // Tailwind classes for styling.
          id={`${block._id}-paragraph`} // Ensures unique IDs for accessibility.
          name="content" // Field name corresponding to the block content.
          value={block.content} // Current value of the paragraph content.
          placeholder="...قم بكتابة النص" // Placeholder text in Arabic.
          onChange={handleContentChange} // Change handler to update the state.
          required // Makes this field mandatory.
        />

        {/* Options for managing the block (e.g., deleting or moving it) */}
        <BlockOptions block={block} setData={setData} />
      </div>
    );
  },
);

const FEATURE_LIMIT = 3; // Maximum number of features allowed.

// Utility function to update a specific feature in the block content.
const updateFeatureContent = (
  blocks: AboutBlock[],
  blockId: string,
  index: number,
  fieldName: string,
  fieldValue: string,
): AboutBlock[] => {
  return blocks.map((block) => {
    if (block._id === blockId && block.type === "features") {
      const updatedContent = block.content.map((feature, i) =>
        i === index ? { ...feature, [fieldName]: fieldValue } : feature,
      );
      return { ...block, content: updatedContent };
    }
    return block;
  });
};

// Component Props
interface FeatureBlockProps {
  block: BlockFeature; // The feature block data.
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>; // State setter for blocks.
}

// FeatureBlock Component
export const EditableFeatureBlock: React.FC<FeatureBlockProps> = React.memo(
  function EditableFeatureBlockComponent({ block, setData }) {
    // Handles changes to feature content (title or description).
    const handleFeatureChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>,
      index: number,
    ) => {
      const { name, value } = e.target; // Extract field name and value.
      setData((prevBlocks) =>
        updateFeatureContent(prevBlocks, block._id, index, name, value),
      );
    };

    // Adds a new feature to the block.
    const addFeature = () => {
      setData((prevBlocks) =>
        prevBlocks.map((b) =>
          b._id === block._id && b.type === "features"
            ? { ...b, content: [...b.content, { title: "", description: "" }] }
            : b,
        ),
      );
    };

    // Removes the last feature from the block.
    const removeFeature = () => {
      setData((prevBlocks) =>
        prevBlocks.map((b) =>
          b._id === block._id && b.type === "features"
            ? { ...b, content: b.content.slice(0, -1) }
            : b,
        ),
      );
    };

    const underLimit = block.content.length < FEATURE_LIMIT; // Checks if feature limit is not exceeded.

    return (
      <div>
        <div className="group relative flex flex-wrap justify-center gap-5 py-5">
          {block.content.map((feature, index) => (
            <div
              key={index}
              className="min-w-[300px] flex-1 transform rounded-3xl bg-white p-6 shadow-xl transition-transform hover:scale-105"
            >
              {/* TextBlock for Feature Title */}
              <TextBlock
                className="mb-3 text-center text-xl font-semibold text-primary"
                id={`${block._id}-title-${index}`}
                name="title"
                placeholder="...قم بكتابة العنوان"
                required
                value={feature.title}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleFeatureChange(e, index)
                }
              />
              {/* TextBlock for Feature Description */}
              <TextBlock
                className="text-center text-gray-600"
                id={`${block._id}-description-${index}`}
                name="description"
                placeholder="...قم بكتابة الوصف"
                required
                value={feature.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleFeatureChange(e, index)
                }
              />
            </div>
          ))}
          {/* Remove Feature Button */}
          {block.content.length > 1 && (
            <div className="absolute right-0 top-0 flex h-full translate-x-1/2 items-center justify-center">
              <button
                type="button"
                onClick={removeFeature}
                className="invisible rounded-full bg-primary p-1 text-white group-hover:visible"
              >
                <Icon icon="bi:dash" className="h-5 w-5" />
              </button>
            </div>
          )}
          {/* Add Feature Button */}
          {underLimit && (
            <div className="absolute left-0 top-0 flex h-full -translate-x-1/2 items-center justify-center">
              <button
                type="button"
                onClick={addFeature}
                className="invisible rounded-full bg-primary p-1 text-white group-hover:visible"
              >
                <Icon icon="bi:plus" className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        {/* Block Options */}
        <BlockOptions block={block} setData={setData} />
      </div>
    );
  },
);
