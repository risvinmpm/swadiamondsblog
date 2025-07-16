import Markdown from "react-markdown";

export default function BlogContent({ content, content2 }: { content: string; content2?: string }) {
  const customComponents = {
    h2: ({ node, ...props }: any) => (
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-teal-700" {...props} />
    ),
    p: ({ node, ...props }: any) => (
      <p className="text-base leading-relaxed mb-4 text-gray-700" {...props} />
    ),
  };

  const customComponents2 = {
    ...customComponents,
    h2: ({ node, ...props }: any) => (
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-indigo-700" {...props} />
    ),
  };

  return (
    <article className="prose prose-lg max-w-none text-gray-800">
      <Markdown components={customComponents}>{content}</Markdown>
      {content2 && <Markdown components={customComponents2}>{content2}</Markdown>}
    </article>
  );
}
