import Image from "next/image";

interface SocialItem {
  icon: any;
  label: string;
  count: string;
}

export default function SocialStats({ items }: { items: SocialItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {items.map((item, index) => (
        <div key={index} className="flex mt-5 gap-4">
          <Image src={item.icon} alt={item.label} width={32} height={32} className="w-8 h-8 object-contain" />
          <div>
            <p className="text-sm font-semibold">{item.count}</p>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
