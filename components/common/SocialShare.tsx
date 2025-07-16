import Image from "next/image";

interface SocialItem {
  icon: any;
  label: string;
}

export default function SocialShare({ items }: { items: SocialItem[] }) {
  return (
    <div className="flex items-center gap-5">
      <h1 className="text-2xl font-bold">Share:</h1>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <Image src={item.icon} alt={item.label} width={24} height={24} />
        </div>
      ))}
    </div>
  );
}
