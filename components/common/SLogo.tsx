"use client"
import { motion } from 'framer-motion';

const SLogo = ({ ...props }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    {...props}
  >
    <motion.path
      d="M 50,10 C 20,10 20,40 50,40 C 80,40 80,70 50,70 C 20,70 20,100 50,100"
      stroke="#3FB0AE"
      strokeWidth="10"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  </motion.svg>
);

export default SLogo;