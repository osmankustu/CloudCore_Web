import { motion } from "framer-motion";

export const SmoothSpinner = () => {
  return (
    <motion.div
      className="h-5 w-5 rounded-full border-2 border-t-2 border-gray-200 border-t-blue-500"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
    />
  );
};
