"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-border to-transparent"
      />
    </div>
  );
}
