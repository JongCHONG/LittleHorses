import { FaCat } from "react-icons/fa";
import { TbRobot } from "react-icons/tb";
import { TiPlaneOutline } from "react-icons/ti";
import { IoMdPlanet } from "react-icons/io";

interface PawnPositionProps {
  x: number;
  y: number;
  pawnName: string | null;
}

const PawnPosition = ({ x, y, pawnName }: PawnPositionProps) => {
  return (
    <div
      className="absolute  w-[50px] h-[50px] flex items-center justify-center"
      style={{ left: x, top: y }}
    >
     {pawnName === "Robot" && <TbRobot size={24} />}
     {pawnName === "Plane" && <TiPlaneOutline size={24} />}
     {pawnName === "Cat" && <FaCat size={24} />}
     {pawnName === "Planet" && <IoMdPlanet size={24} />}
    </div>
  );
};

export default PawnPosition;
