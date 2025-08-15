import React from "react";
import { FcPlus } from "react-icons/fc";

const TableAddButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button
      className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
      onClick={onClick}
    >
      <FcPlus size={20} />
      {text}
    </button>
  );
};

export default TableAddButton;
