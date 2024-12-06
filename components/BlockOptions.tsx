"use client";
import { AboutBlock, HeaderLevel } from "@/types";
import { addBlock, moveObjectInArray } from "@/utils";
import { DropDown, DropDownButton, DropDownList } from "./DropDown";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

/**
 * BlockOptions Component
 * Provides controls to manage the structure of blocks (add, delete, move).
 */
export const BlockOptions: React.FC<{
  block?: AboutBlock;
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>;
}> = React.memo(function BlockOptionsComponent({ setData, block }) {
  return (
    <div className="group/main relative my-3 grid w-full grid-cols-1 place-items-center">
      {/* Divider Line */}
      <hr className="col-start-1 row-start-1 w-full border-2 border-gray-200 group-focus-within/main:border-primary group-hover/main:border-primary" />
      {/* Block Option Controls */}
      <BlockOptionControls block={block} setData={setData} />
    </div>
  );
});

/**
 * BlockOptionControls Component
 * Renders the controls for adding and manipulating blocks.
 */
const BlockOptionControls: React.FC<{
  block?: AboutBlock;
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>;
}> = React.memo(function BlockOptionControlsComponent({ block, setData }) {
  return (
    <div className="col-start-1 row-start-1 flex w-full justify-center gap-2">
      <AddBlockDropdown block={block} setData={setData} />
      {block && <BlockManipulationDropdown block={block} setData={setData} />}
    </div>
  );
});

/**
 * AddBlockDropdown Component
 * Provides options to add new blocks (Heading, Paragraph, Features).
 */
const AddBlockDropdown: React.FC<{
  block?: AboutBlock;
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>;
}> = React.memo(function AddBlockDropdownComponent({ block, setData }) {
  const headerLevels: HeaderLevel[] = ["h1", "h2", "h3", "h4", "h5", "h6"];

  const handleAddHeader = (level: HeaderLevel) =>
    setData((prev) => addBlock(prev, "header", block, level));

  const handleAddParagraph = () =>
    setData((prev) => addBlock(prev, "paragraph", block));

  const handleAddFeature = () =>
    setData((prev) => addBlock(prev, "features", block));

  return (
    <DropDown>
      <DropDownButton className="col-start-1 row-start-1 rounded-full bg-primary p-2 text-white opacity-10 group-hover/main:opacity-100">
        <Icon icon="bi:plus" className="h-4 w-4" />
      </DropDownButton>
      <DropDownList className="w-72 rounded-2xl bg-white p-2 text-left shadow-lg">
        {/* Add Heading Options */}
        <li className="group/item border-b-2">
          <button
            className="w-full px-4 py-2 hover:bg-indigo-100"
            type="button"
          >
            <Icon icon="jam:header-1" className="ml-2 inline h-8 w-8" />
            Heading
          </button>
          <ul className="hidden group-focus-within/item:block">
            {headerLevels.map((level) => (
              <li key={level}>
                <button
                  onClick={() => handleAddHeader(level)}
                  className="w-full px-4 py-2 uppercase hover:bg-indigo-100"
                  type="button"
                >
                  {level}
                </button>
              </li>
            ))}
          </ul>
        </li>
        {/* Add Paragraph Option */}
        <li>
          <button
            onClick={handleAddParagraph}
            className="w-full px-4 py-2 hover:bg-indigo-100"
            type="button"
          >
            <Icon
              icon="carbon:text-long-paragraph"
              className="ml-2 inline h-4 w-4"
            />
            Paragraph
          </button>
        </li>
        {/* Add Features Option */}
        <li>
          <button
            onClick={handleAddFeature}
            className="w-full px-4 py-2 hover:bg-indigo-100"
            type="button"
          >
            <Icon icon="mi:grid" className="ml-2 inline h-4 w-4" />
            Features
          </button>
        </li>
      </DropDownList>
    </DropDown>
  );
});

/**
 * BlockManipulationDropdown Component
 * Provides options to delete or move existing blocks.
 */
const BlockManipulationDropdown: React.FC<{
  block?: AboutBlock;
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>;
}> = React.memo(function BlockManipulationDropdownComponent({
  block,
  setData,
}) {
  const handleMoveBlock = (direction: "up" | "down") => {
    if (block) {
      setData((prev) => moveObjectInArray(prev, block._id, direction));
    }
  };

  const handleDeleteBlock = () =>
    setData((prev) => prev.filter((x) => x._id !== block?._id));

  return (
    <DropDown className={block ? "" : "hidden"}>
      <DropDownButton className="col-start-1 row-start-1 rounded-full bg-primary p-2 text-white opacity-10 group-hover/main:opacity-100">
        <Icon icon="solar:menu-dots-bold" className="h-4 w-4" />
      </DropDownButton>
      <DropDownList className="w-72 rounded-2xl bg-white p-2 shadow-lg">
        {/* Delete Block Option */}
        <li>
          <button
            onClick={handleDeleteBlock}
            className="w-full px-4 py-2 text-pink-600 hover:bg-indigo-100"
            type="button"
          >
            <Icon
              icon="solar:trash-bin-trash-bold"
              className="ml-2 inline h-4 w-4"
            />
            Delete Above
          </button>
        </li>
        {/* Move Block Up Option */}
        <li>
          <button
            onClick={() => handleMoveBlock("up")}
            className="w-full px-4 py-2 hover:bg-indigo-100"
            type="button"
          >
            <Icon icon="solar:arrow-up-bold" className="ml-2 inline h-4 w-4" />
            Move Up
          </button>
        </li>
        {/* Move Block Down Option */}
        <li>
          <button
            onClick={() => handleMoveBlock("down")}
            className="w-full px-4 py-2 hover:bg-indigo-100"
            type="button"
          >
            <Icon
              icon="solar:arrow-down-bold"
              className="ml-2 inline h-4 w-4"
            />
            Move Down
          </button>
        </li>
      </DropDownList>
    </DropDown>
  );
});
