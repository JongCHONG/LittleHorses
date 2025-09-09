'use client'

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
  
  const pawnSize = `min(50px, 5.88vw, 5.88vh)`;
  const iconSize = `min(24px, 2.82vw, 2.82vh)`;

  return (
    <motion.div
      className="absolute flex items-center justify-center z-20"
      animate={{ 
        left: `min(${x}px, ${(x / 850) * 100}%)`, 
        top: `min(${y}px, ${(y / 850) * 100}%)` 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ 
        width: pawnSize,
        height: pawnSize,
        left: `min(${x}px, ${(x / 850) * 100}%)`, 
        top: `min(${y}px, ${(y / 850) * 100}%)`,
        position: "absolute" 
      }}
    >
      <div className="drop-shadow-lg">
        {pawnName === "Robot" && (
          <TbRobot 
            style={{ fontSize: iconSize }} 
            className="text-gray-800"
          />
        )}
        {pawnName === "Plane" && (
          <TiPlaneOutline 
            style={{ fontSize: iconSize }} 
            className="text-gray-800"
          />
        )}
        {pawnName === "Cat" && (
          <FaCat 
            style={{ fontSize: iconSize }} 
            className="text-gray-800"
          />
        )}
        {pawnName === "Planet" && (
          <IoMdPlanet 
            style={{ fontSize: iconSize }} 
            className="text-gray-800"
          />
        )}
      </div>
    </motion.div>
  );
};

export default PawnPosition;
