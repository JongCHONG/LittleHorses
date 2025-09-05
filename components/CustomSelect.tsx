'use client'

import Select, { type StylesConfig, type GroupBase } from "react-select";
import type { Player } from "../utils/intefaces/player";

interface ColorOption {
  value: string;
  label: string;
  isDisabled: boolean;
  color: string;
}

interface CustomSelectProps {
  tempPlayer: Player;
  setTempPlayer: (player: Player) => void;
  takenColors: string[];
}

const colorOptions: ColorOption[] = [
  {
    value: "tan",
    label: "Tan",
    isDisabled: false,
    color: "#DAB785",
  },
  {
    value: "burntSienna",
    label: "Burnt Sienna",
    isDisabled: false,
    color: "#C65D4D",
  },
  {
    value: "cambridgeBlue",
    label: "Cambridge Blue",
    isDisabled: false,
    color: "#70A288",
  },
  {
    value: "prussianBlue",
    label: "Prussian Blue",
    isDisabled: false,
    color: "#1969a1ff",
  },
];

const CustomSelect = ({
  tempPlayer,
  setTempPlayer,
  takenColors,
}: CustomSelectProps) => {
  const options = colorOptions.map((opt) => ({
    ...opt,
    isDisabled: takenColors.includes(opt.value),
  }));

  const customStyles: StylesConfig<
    ColorOption,
    false,
    GroupBase<ColorOption>
  > = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      borderWidth: '2px',
      borderRadius: '8px',
      borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(99, 102, 241, 0.2)' : 'none',
      fontSize: window.innerWidth < 640 ? '16px' : '14px',
      '&:hover': {
        borderColor: '#6366f1',
      },
      transition: 'all 0.2s ease-in-out',
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '12px 16px',
      color: state.isDisabled ? '#9ca3af' : state.data.color,
      backgroundColor: state.isSelected 
        ? 'rgba(99, 102, 241, 0.1)' 
        : state.isFocused 
        ? 'rgba(99, 102, 241, 0.05)' 
        : state.isDisabled 
        ? '#f9fafb' 
        : 'white',
      textDecoration: state.isDisabled ? "line-through" : "none",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      fontWeight: state.isSelected ? 'bold' : 'normal',
      fontSize: window.innerWidth < 640 ? '16px' : '14px',
      '&:before': state.isSelected ? {
        color: '#6366f1',
        fontWeight: 'bold',
      } : {},
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color,
      fontWeight: 'bold',
      fontSize: window.innerWidth < 640 ? '16px' : '14px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: window.innerWidth < 640 ? '16px' : '14px',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#6b7280',
      '&:hover': {
        color: '#6366f1',
      },
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      marginTop: '4px',
    }),
  };

  return (
    <div className="w-full">
      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
        🎨 Choose your color
      </label>
      <Select<ColorOption, false>
        inputId="color"
        options={options}
        value={options.find((opt) => opt.value === tempPlayer.color) || null}
        onChange={(option) =>
          setTempPlayer({
            ...tempPlayer,
            color: option ? (option.value as Player["color"]) : "none",
          })
        }
        isOptionDisabled={(option) => option.isDisabled}
        placeholder="Select a color..."
        styles={customStyles}
        isSearchable={false}
        menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
        menuPosition="fixed"
        maxMenuHeight={200}
      />
    </div>
  );
};

export default CustomSelect;
