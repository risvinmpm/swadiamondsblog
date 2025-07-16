interface NumberPaginationProps {
  total: number;
  activeIndex: number;
  onNavigate: (newIndex: number) => void;
}

export default function NumberPagination({
  total,
  activeIndex,
  onNavigate
}: NumberPaginationProps) {
  return (
    <div className="relative mt-10 flex justify-center items-center text-gray-500 font-light">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200" />
      <div
        className="absolute top-0 h-0.5 bg-[#00464d] transition-all duration-300"
        style={{
          width: "32px",
          left: `calc(50% - ${total * 18}px + ${activeIndex * 36}px)`
        }}
      />
      <button
        onClick={() => onNavigate((activeIndex - 1 + total) % total)}
        className="text-xl text-[#00464d] px-3"
      >
        ←
      </button>
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onNavigate(idx)}
          className={`px-2 py-3 text-lg transition-colors ${
            activeIndex === idx ? "text-[#00464d] font-semibold" : ""
          }`}
        >
          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
        </button>
      ))}
      <button
        onClick={() => onNavigate((activeIndex + 1) % total)}
        className="text-xl text-[#00464d] px-3"
      >
        →
      </button>
    </div>
  );
}
