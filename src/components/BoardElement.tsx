import EndZone from "./EndZone";
import Circle from "./Circle";
import type { BoardPosition } from "../utils/intefaces/boardPosition";

interface BoardElementProps {
  circlePosition: BoardPosition[];
  endZonePosition: BoardPosition[];
  name: "tan" | "burntSienna" | "cambridgeBlue" | "prussianBlue";
}

const colorMap: Record<
  BoardElementProps["name"],
  string
> = {
  tan: "bg-[#DAB785]",
  burntSienna: "bg-[#C65D4D]",
  cambridgeBlue: "bg-[#70A288]",
  prussianBlue: "bg-[#1969a1ff]",
};

const positionMap: Record<
  BoardElementProps["name"],
  string
> = {
  tan: "",
  burntSienna: "absolute top-0 right-0",
  cambridgeBlue: "absolute bottom-0 right-0",
  prussianBlue: "absolute bottom-0 left-0",
};

const BoardElement = ({
  circlePosition,
  endZonePosition,
  name,
}: BoardElementProps) => {
  const color = colorMap[name];
  const position = positionMap[name];

  return (
    <>
      <div
        className={`w-[350px] h-[350px] ${color} ${position} flex items-center justify-center`}
      >
        <h2 className="text-white font-bold text-xl">{name}</h2>
      </div>
      {circlePosition.map((pos, i) => (
        <Circle key={i} color={color.replace("bg[", "").replace("]", "")} x={pos.x} y={pos.y} />
      ))}
      {endZonePosition.map((pos, i) => (
        <EndZone
          key={i}
          color={color.replace("bg[", "").replace("]", "")}
          x={pos.x}
          y={pos.y}
          num={i + 1}
        />
      ))}
    </>
  );
};

export default BoardElement;
