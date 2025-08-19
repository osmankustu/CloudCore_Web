"use client";
import { useUserStore } from "@/features/account/store/useUserStore";
import { motion } from "framer-motion";
import React from "react";

const UserSayHelloCard = () => {
  const { user } = useUserStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <div className="mb-6 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">
          Hoş geldiniz, {user?.firstName + " " + user?.lastName} 👋
        </h1>
        <p className="mt-2 text-sm opacity-90">Bugün yapacak harika işlerimiz var 🚀</p>
      </div>
    </motion.div>
  );
};

export default UserSayHelloCard;
