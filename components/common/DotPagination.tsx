interface DotPaginationProps {
  total: number;
  activeIndex: number;
  onClick: (index: number) => void;
}

export default function DotPagination({ total, activeIndex, onClick }: DotPaginationProps) {
  return (
    <div className="absolute top-4 right-4 z-10 flex gap-2">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onClick(idx)}
          className={`transition-all h-2 rounded-full ${
            activeIndex === idx ? "w-10 bg-[#00464d]" : "w-2 bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
