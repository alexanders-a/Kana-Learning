import React from "react";
import { motion } from "framer-motion";


export default function P1({ children, isEven }: {children: React.ReactNode, isEven: boolean}) {
  return (
    <motion.section>
      <motion.div initial={{ x: isEven ? -3 : 3 }} whileInView={{ x: 0 }}>
        {children}
      </motion.div>
    </motion.section>
  );
}
