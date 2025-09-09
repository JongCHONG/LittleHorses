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
    label: "tan",
    isDisabled: false,
    color: "#DAB785",
  },
  {
    value: "burntSienna",
    label: "burntSienna",
    isDisabled: false,
    color: "#C65D4D",
  },
  {
    value: "cambridgeBlue",
    label: "cambridgeBlue",
    isDisabled: false,
    color: "#70A288",
  },
  {
    value: "prussianBlue",
    label: "prussianBlue",
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
    option: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "#b0b0b0" : state.data.color,
      backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
      textDecoration: state.isDisabled ? "line-through" : "none",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#000",
    }),
  };

  return (
    <div className="shadow-sm rounded">
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
        placeholder="Choose a color"
        styles={{
          ...customStyles,
          control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? "#000" : provided.borderColor,
            boxShadow: state.isFocused ? "0 0 0 1px #000" : provided.boxShadow,
            "&:hover": {
              borderColor: "#000",
            },
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#374151",
          }),
        }}
        isSearchable={false}
      />
    </div>
  );
};

export default CustomSelect;
