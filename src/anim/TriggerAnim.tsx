import React from "react";
import { motion } from "framer-motion";

export default function P2({
  children,
  correct,
}: {
  children: React.ReactNode;
  correct: boolean;
}) {
  return (
    <motion.section>
      <motion.div
        animate={
          correct ? { opacity: 1, scale: 1.2 } : { opacity: 0.9, scale: 1 }
        }
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
