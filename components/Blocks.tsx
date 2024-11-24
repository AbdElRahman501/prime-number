export const HeaderBlock: React.FC<{ content: string }> = ({ content }) => {
  return (
    <h1
      className="mb-8 text-center text-5xl font-bold text-primary drop-shadow-md"
      id="about-heading"
    >
      {content}
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

const renderTextWithLineBreaksAndStrong = (text: string) => {
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
