import Image from "next/image";

interface Props {
  image: string;
  text: string;
  index: number;
}

export default function ArticleCard({ image, text, index }: Props) {
  return (
    <div className="relative group rounded-md shadow-md">
      <Image
        src={image}
        alt={`slide-${index}`}
        width={400}
        height={300}
        className="w-full h-[300px] object-cover rounded-md"
      />
     <div className="absolute bottom-0 bg-white px-4 py-7 rounded-md shadow-md transition-transform duration-300 group-hover:translate-y-2 max-w-[85%]">
        <p className="text-lg leading-snug font-semibold text-gray-800">{text}</p>
      </div>
    </div>
  );
}
