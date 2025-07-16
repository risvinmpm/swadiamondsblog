import Image, { StaticImageData } from "next/image";
import Markdown from "react-markdown";

interface Props {
  image: StaticImageData | string;
  alt: string;
  content: string;
  content2?: string;
}

export default function DiamondContent({ image, alt, content, content2 }: Props) {
  return (
    <>
      <div className="overflow-hidden rounded-md shadow-lg">
        <Image
          src={image}
          alt={alt}
          width={800}
          height={400}
          className="w-full h-[300px] lg:h-[600px] object-cover rounded-md"
        />
      </div>

      <article className="prose prose-lg max-w-none text-gray-800">
        <Markdown
          components={{
            h2: (props) => (
              <h2 className="text-2xl font-semibold mt-8 mb-2 text-teal-700" {...props} />
            ),
            p: (props) => (
              <p className="text-base leading-relaxed mb-4 text-gray-700" {...props} />
            ),
          }}
        >
          {content}
        </Markdown>

        {content2 && (
          <Markdown
            components={{
              h2: (props) => (
                <h2 className="text-2xl font-semibold mt-8 mb-2 text-indigo-700" {...props} />
              ),
              p: (props) => (
                <p className="text-base leading-relaxed mb-4 text-gray-700" {...props} />
              ),
            }}
          >
            {content2}
          </Markdown>
        )}
      </article>
    </>
  );
}
