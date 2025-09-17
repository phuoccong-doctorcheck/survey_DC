/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { motion, AnimatePresence } from "framer-motion"

interface FramerMotionProps {
    children: React.ReactNode;
}

const FramerMotionCollapse: React.FC<FramerMotionProps> = ({ children }) => {
    return (
        <div className="m-framer_motion">
            <AnimatePresence mode="sync">
                <motion.div
                    layout
                    layoutRoot
                    initial={{ y: '-100%' }}
                    animate={{ y: '0%'}}
                    exit={{ y: '-100%'  }}
                    transition={{ duration: 0.2, }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

FramerMotionCollapse.defaultProps = {
    children: undefined,
};

export default FramerMotionCollapse;
