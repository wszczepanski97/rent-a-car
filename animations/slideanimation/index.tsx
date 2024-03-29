import { AnimatePresence, m as motion } from "framer-motion";
import type { FC } from "react";

const SlideAnimation: FC = ({ children }) => {
  return typeof window !== "undefined" ? (
    <AnimatePresence>
      <motion.div
        id="slide-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  ) : null;
};

export default SlideAnimation;
