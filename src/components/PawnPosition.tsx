import { FaCat } from "react-icons/fa";
import { TbRobot } from "react-icons/tb";
import { TiPlaneOutline } from "react-icons/ti";
import { IoMdPlanet } from "react-icons/io";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PawnPositionProps {
  path: { x: number; y: number }[];
  fromIndex: number;
  toIndex: number;
  pawnName: string | null;
}

const PawnPosition = ({
  path,
  fromIndex,
  toIndex,
  pawnName,
}: PawnPositionProps) => {
  const [currentStep, setCurrentStep] = useState(fromIndex);

  useEffect(() => {
    if (currentStep === toIndex) return;
    const direction = toIndex > currentStep ? 1 : -1;
    const timeout = setTimeout(() => {
      setCurrentStep((prev) => prev + direction);
    }, 120);
    return () => clearTimeout(timeout);
  }, [currentStep, toIndex]);

  const pos = path[currentStep];
  if (!pos) return null;

  const { x, y } = pos;

  return (
    <motion.div
      className="absolute w-[50px] h-[50px] flex items-center justify-center"
      animate={{ left: x, top: y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ left: x, top: y, position: "absolute" }}
    >
      {pawnName === "Robot" && <TbRobot size={24} />}
      {pawnName === "Plane" && <TiPlaneOutline size={24} />}
      {pawnName === "Cat" && <FaCat size={24} />}
      {pawnName === "Planet" && <IoMdPlanet size={24} />}
    </motion.div>
  );
};

export default PawnPosition;
