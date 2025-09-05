type SelectionGridProps = {
  selected: number;
  onSelect: (num: number) => void;
  selectedColor: string;
};

const SelectionGrid = ({
  selected,
  onSelect,
  selectedColor,
}: SelectionGridProps) => {
  return (
    <>
      {[1, 2, 3, 4].map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onSelect(num)}
          className={`h-12 rounded-lg border-2 font-semibold transition-all duration-200 ${
            selected === num
              ? `bg-${selectedColor}-500 text-white border-${selectedColor}-500 shadow-md scale-105`
              : `bg-white text-gray-700 border-gray-300 hover:border-${selectedColor}-300 hover:bg-${selectedColor}-50`
          }`}
        >
          {num}
        </button>
      ))}
    </>
  );
};

export default SelectionGrid;
