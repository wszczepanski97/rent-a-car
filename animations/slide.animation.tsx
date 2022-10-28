import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

const SlideAnimation: FC = ({ children }) => {
  return typeof window !== "undefined" ? (
    <AnimatePresence>
      <motion.div
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
