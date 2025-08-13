import { motion } from "framer-motion";
import React, { JSX } from "react";
import { FaBox, FaCheckCircle, FaClock, FaFile, FaTools } from "react-icons/fa";
import { RiLoopLeftFill } from "react-icons/ri";

interface Step {
  label: string;
  icon: JSX.Element;
  completed: boolean;
  active?: boolean; // Opsiyonel alan
}

const ServiceDetailIndicator = ({ step }: { step: string }) => {
  const steps: Step[] = [];

  const GetStep = (step: string) => {
    switch (step) {
      case "isCreated":
        steps.push(
          { label: "Kayıt Alındı", icon: <FaFile />, completed: true, active: false },
          { label: "Beklemede", icon: <FaClock />, completed: false, active: false },
          { label: "İşlem Başladı", icon: <FaTools />, completed: false, active: false },
          { label: "Devam Ediyor", icon: <RiLoopLeftFill />, completed: false, active: false },
          { label: "Tamamlandı", icon: <FaBox />, completed: false, active: false },
          { label: "Kapatıldı", icon: <FaCheckCircle />, completed: false, active: false },
        );
        return steps;
      case "isPending":
        steps.push(
          { label: "Kayıt Alındı", icon: <FaFile />, completed: true, active: false },
          { label: "Beklemede", icon: <FaClock />, completed: true, active: true },
          { label: "İşlem Başladı", icon: <FaTools />, completed: false, active: false },
          { label: "Devam Ediyor", icon: <RiLoopLeftFill />, completed: false, active: false },
          { label: "Tamamlandı", icon: <FaBox />, completed: false, active: false },
          { label: "Kapatıldı", icon: <FaCheckCircle />, completed: false, active: false },
        );
        return steps;
      case "isStarted":
        steps.push(
          { label: "Kayıt Alındı", icon: <FaFile />, completed: true, active: false },
          { label: "Beklemede", icon: <FaClock />, completed: true, active: false },
          { label: "İşlem Başladı", icon: <FaTools />, completed: true, active: true },
          { label: "Devam Ediyor", icon: <RiLoopLeftFill />, completed: false, active: false },
          { label: "Tamamlandı", icon: <FaBox />, completed: false, active: false },
          { label: "Kapatıldı", icon: <FaCheckCircle />, completed: false, active: false },
        );
        return steps;
      case "isContinue":
        steps.push(
          { label: "Kayıt Alındı", icon: <FaFile />, completed: true, active: false },
          { label: "Beklemede", icon: <FaClock />, completed: true, active: false },
          { label: "İşlem Başladı", icon: <FaTools />, completed: true, active: false },
          { label: "Devam Ediyor", icon: <RiLoopLeftFill />, completed: true, active: true },
          { label: "Tamamlandı", icon: <FaBox />, completed: false, active: false },
          { label: "Kapatıldı", icon: <FaCheckCircle />, completed: false, active: false },
        );
        return steps;
      case "isComplated":
        steps.push(
          { label: "Kayıt Alındı", icon: <FaFile />, completed: true, active: false },
          { label: "Beklemede", icon: <FaClock />, completed: true, active: false },
          { label: "İşlem Başladı", icon: <FaTools />, completed: true, active: false },
          { label: "Devam Ediyor", icon: <RiLoopLeftFill />, completed: true, active: false },
          { label: "Tamamlandı", icon: <FaBox />, completed: true, active: true },
          { label: "Kapatıldı", icon: <FaCheckCircle />, completed: false, active: false },
        );
        return steps;
      case "isClosed":
        steps.push(
          { label: "Kayıt Alındı", icon: <FaFile />, completed: true, active: false },
          { label: "Beklemede", icon: <FaClock />, completed: true, active: false },
          { label: "İşlem Başladı", icon: <FaTools />, completed: true, active: false },
          { label: "Devam Ediyor", icon: <RiLoopLeftFill />, completed: true, active: false },
          { label: "Tamamlandı", icon: <FaBox />, completed: true, active: false },
          { label: "Kapatıldı", icon: <FaCheckCircle />, completed: true, active: false },
        );
        return steps;
      default:
        return steps;
    }
  };

  return (
    <>
      <div className="relative mb-8 hidden h-22 items-center justify-between rounded-lg bg-white p-6 md:flex dark:bg-gray-900">
        {GetStep(step).map((step, index) => (
          <div key={index} className="relative flex w-1/5 flex-col items-center">
            {index > 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: step.completed ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
                className="absolute top-5 left-[-50%] -z-0 h-1 w-full bg-green-500"
              ></motion.div>
            )}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className={`z-10 flex h-10 w-10 transform items-center justify-center rounded-full shadow-lg transition-all duration-300 ${step.active ? "scale-110 bg-red-500" : step.completed ? "bg-green-500" : "bg-gray-300"}`}
            >
              {step.icon}
            </motion.div>
            <p className="mt-3 text-sm font-medium text-gray-800 dark:text-white">{step.label}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceDetailIndicator;
