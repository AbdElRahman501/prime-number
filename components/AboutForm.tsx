"use client";
import { AboutBlock, BlockFeature, BlockHeader, BlockParagraph } from "@/types";
import TextBlock from "./TextBlock";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import LoadingDots from "./loading-dots";
import { removeIdFromArray } from "@/utils";
import { updateAbout } from "@/lib/actions/about.actions";
import { usePrompt } from "./Notification";

interface AboutFormProps {
  aboutData: AboutBlock[];
}
// add levels to headings

export default function AboutForm({ aboutData }: AboutFormProps) {
  const [data, setData] = useState(aboutData);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  usePrompt("Leave screen?", isDirty);

  useEffect(() => {
    setIsDirty(
      JSON.stringify(removeIdFromArray(data)) !==
        JSON.stringify(removeIdFromArray(aboutData)),
    );
  }, [data, aboutData]);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const result = await updateAbout(removeIdFromArray(data));
    if (result.success) {
      setIsDirty(false);
    } else {
      setError(result.message);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={submitHandler} className="container mx-auto px-6">
      <div
        aria-expanded={isDirty}
        className="group sticky top-[85px] z-10 w-full bg-background p-2"
      >
        <p className="text-sm text-red-500">{error}</p>
        <div className="invisible flex items-center justify-end gap-2 group-aria-expanded:visible">
          <button
            type="submit"
            className="rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {loading ? (
              <div className="h-6">
                <LoadingDots />
              </div>
            ) : (
              "حفظ"
            )}
          </button>
          <button
            onClick={() => {
              setData(aboutData);
              setIsDirty(false);
            }}
            type="reset"
            className="rounded-2xl border border-primary px-4 py-2 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            إلغاء
          </button>
        </div>
      </div>
      <BlockOptions setData={setData} />
      {data.map((block) => {
        switch (block.type) {
          case "header":
            return (
              <HeaderBlock key={block._id} block={block} setData={setData} />
            );
          case "paragraph":
            return (
              <ParagraphBlock key={block._id} block={block} setData={setData} />
            );
          case "features":
            return (
              <FeatureBlock key={block._id} block={block} setData={setData} />
            );
          default:
            return null;
        }
      })}
    </form>
  );
}

export const HeaderBlock: React.FC<{
  block: BlockHeader;
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>;
}> = ({ block, setData }) => {
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;
    setData((prevData) => {
      const newData = prevData.map((b) =>
        b._id === block._id ? { ...b, [name]: value } : b,
      );
      return newData;
    });
  };
  return (
    <>
      <TextBlock
        className="text-center text-5xl font-bold drop-shadow-md"
        id={`${block._id}-heading`}
        name="content"
        value={block.content}
        onChange={changeHandler}
      />
      <BlockOptions block={block} setData={setData} />
    </>
  );
};

export const ParagraphBlock: React.FC<{
  block: BlockParagraph;
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>;
}> = ({ block, setData }) => {
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;
    setData((prevData) => {
      const newData = prevData.map((b) =>
        b._id === block._id ? { ...b, [name]: value } : b,
      );
      return newData;
    });
  };
  return (
    <>
      <TextBlock
        className="text-center text-lg leading-relaxed text-gray-600"
        id={`${block._id}-heading`}
        name="content"
        value={block.content}
        onChange={changeHandler}
      />
      <BlockOptions block={block} setData={setData} />
    </>
  );
};

export const FeatureBlock: React.FC<{
  block: BlockFeature;
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>;
}> = ({ block, setData }) => {
  const limit = 3;
  const changeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;
    setData((pv) => {
      const newFeatures = pv.map((b) => {
        if (b._id === block._id && b.type === "features") {
          b.content[index] = { ...b.content[index], [name]: value };
        }
        return b;
      });
      return newFeatures;
    });
  };

  const addFeature = () => {
    setData((pv) =>
      pv.map((b) =>
        b._id === block._id && b.type === "features"
          ? { ...b, content: [...b.content, { title: "", description: "" }] }
          : b,
      ),
    );
  };
  const removeFeature = () => {
    setData((pv) =>
      pv.map((b) =>
        b._id === block._id && b.type === "features"
          ? { ...b, content: b.content.slice(0, -1) }
          : b,
      ),
    );
  };
  const underLimit = block.content.length < limit;
  return (
    <>
      <div className="group relative flex flex-wrap justify-center gap-5 py-5">
        {block.content.map((feature, index) => (
          <div
            key={index}
            className="min-w-[300px] flex-1 transform rounded-3xl bg-white p-6 shadow-xl transition-transform hover:scale-105"
          >
            <TextBlock
              className="mb-3 text-center text-xl font-semibold text-primary"
              id={`${block._id}-title`}
              name="title"
              value={feature.title}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                changeHandler(e, index)
              }
            />
            <TextBlock
              className="text-center text-gray-600"
              id={`${block._id}-description`}
              name="description"
              value={feature.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                changeHandler(e, index)
              }
            />
          </div>
        ))}
        {block.content.length > 1 ? (
          <div className="absolute right-0 top-0 flex h-full translate-x-1/2 items-center justify-center">
            <button
              type="button"
              onClick={removeFeature}
              className="invisible rounded-full bg-primary p-1 text-white group-hover:visible"
            >
              <Icon icon="bi:dash" className="h-5 w-5" />
            </button>
          </div>
        ) : null}
        {underLimit ? (
          <div className="absolute left-0 top-0 flex h-full -translate-x-1/2 items-center justify-center">
            <button
              type="button"
              onClick={addFeature}
              className="invisible rounded-full bg-primary p-1 text-white group-hover:visible"
            >
              <Icon icon="bi:plus" className="h-5 w-5" />
            </button>
          </div>
        ) : null}
      </div>
      <BlockOptions block={block} setData={setData} />
    </>
  );
};

const BlockOptions: React.FC<{
  block?: AboutBlock;
  setData: React.Dispatch<React.SetStateAction<AboutBlock[]>>;
}> = ({ setData, block }) => {
  const addHeader = () =>
    setData((pv) =>
      addBlock(
        "header",
        block ? pv.findIndex((x) => x._id === block._id) + 1 : 0,
        pv,
      ),
    );
  const addParagraph = () =>
    setData((pv) =>
      addBlock(
        "paragraph",
        block ? pv.findIndex((x) => x._id === block._id) + 1 : 0,

        pv,
      ),
    );
  const addFeature = () =>
    setData((pv) =>
      addBlock(
        "features",
        block ? pv.findIndex((x) => x._id === block._id) + 1 : 0,
        pv,
      ),
    );

  const deleteItem = () =>
    setData((pv) => pv.filter((x) => x._id !== block?._id));
  return (
    <div className="group relative my-3 grid w-full grid-cols-1 place-items-center">
      <hr className="col-start-1 row-start-1 w-full border-2 border-gray-200 group-hover:border-primary" />
      <button
        type="button"
        aria-expanded="true"
        aria-haspopup="true"
        className="invisible col-start-1 row-start-1 rounded-full bg-primary p-2 text-white group-focus-within:visible group-hover:visible"
      >
        <Icon icon="solar:menu-dots-bold" className="h-4 w-4" />
      </button>
      <ul
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
        className="absolute z-10 mt-9 hidden w-72 translate-y-1/2 rounded-2xl border border-gray-300 bg-white p-2 shadow-lg hover:block group-focus-within:block"
      >
        <div className="grid grid-cols-2 gap-2 px-4 py-2 text-center text-sm">
          <button
            type="button"
            onClick={addHeader}
            className="text-nowrap rounded-xl border p-3 hover:bg-indigo-100"
          >
            Heading
            <Icon icon="jam:header-1" className="ml-2 inline text-xl" />
          </button>
          <button
            type="button"
            onClick={addParagraph}
            className="text-nowrap rounded-xl border p-3 hover:bg-indigo-100"
          >
            Paragraph
            <Icon
              icon="carbon:text-long-paragraph"
              className="ml-2 inline h-4 w-4"
            />
          </button>
          <button
            type="button"
            onClick={addFeature}
            className="col-span-2 text-nowrap rounded-xl border p-3 hover:bg-indigo-100"
          >
            Features
            <Icon icon="mi:grid" className="ml-2 inline h-4 w-4" />
          </button>
        </div>
        {block ? (
          <>
            <li
              onClick={deleteItem}
              className="cursor-pointer px-4 py-2 text-pink-600 hover:bg-indigo-100"
            >
              <Icon
                icon="solar:trash-bin-trash-bold"
                className="ml-2 inline h-4 w-4"
              />
              Delete Above
            </li>
            <li className="cursor-pointer px-4 py-2 hover:bg-indigo-100">
              <Icon
                icon="solar:arrow-up-bold"
                className="ml-2 inline h-4 w-4"
              />
              move up
            </li>
            <li className="cursor-pointer px-4 py-2 hover:bg-indigo-100">
              <Icon
                icon="solar:arrow-down-bold"
                className="ml-2 inline h-4 w-4"
              />
              move down
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
};

const addBlock = (
  type: "paragraph" | "features" | "header",
  index: number,
  data: AboutBlock[],
): AboutBlock[] => {
  let object: AboutBlock;
  const newData = [...data];
  switch (type) {
    case "paragraph":
      object = {
        type: "paragraph",
        content: "",
        _id: String(Date.now()),
      } as BlockParagraph;
      break;
    case "features":
      object = {
        type: "features",
        content: [],
        _id: String(Date.now()),
      } as BlockFeature;
      break;
    case "header":
      object = {
        type: "header",
        content: "",
        _id: String(Date.now()),
      } as BlockHeader;
      break;
    default:
      throw new Error(`Invalid block type: ${type}`);
  }

  // Use splice to insert the object into the data array
  newData.splice(index, 0, object);

  // Return the modified data array
  return newData;
};
