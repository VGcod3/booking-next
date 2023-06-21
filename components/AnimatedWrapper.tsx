'use client'
import { motion, AnimationProps, MotionProps, Variants } from "framer-motion";
import { useInView, IntersectionOptions } from "react-intersection-observer";
import React, { ReactNode } from "react";

interface AnimatedWrapperProps extends MotionProps {
    children: ReactNode;
    animation?: AnimationProps & { animate: boolean | string | undefined; };
    options?: IntersectionOptions;
    from?: "left" | "right" | "bottom";
    delay?: number;
    toggleMultiple?: boolean;
}


const variants: Record<string, Variants> = {
    left: {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },
    right: {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },
    bottom: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
};

const animationProps = {
    initial: { opacity: 0, y: 40 },
    animate: (inView: boolean) => ({ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }),
    transition: { duration: 0.6 },
};

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
    children,
    animation = animationProps,
    options = {
        triggerOnce: true,
        threshold: 0.1,
    },
    from = "bottom",
    delay = 0,
    toggleMultiple = false,
    ...rest
}) => {
    const [ref, inView] = useInView({ ...options, triggerOnce: !toggleMultiple });

    // Get the current variant based on 'from' prop, if not found use 'bottom' as default.
    const currentVariant = variants[from] || variants.bottom;

    // Add delay to the transition
    const transition = {
        ...animation.transition,
        delay,
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={currentVariant}
            transition={transition}
            {...rest}
        >
            {children}
        </motion.div>
    );
};


export default AnimatedWrapper;
