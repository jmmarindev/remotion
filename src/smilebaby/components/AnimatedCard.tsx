import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const AnimatedCard: React.FC<{
    children: React.ReactNode;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}> = ({ children, delay = 0, className = "", style }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Premium soft fade in (15 frames)
    const opacity = interpolate(
        frame - delay,
        [0, 15],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Elegant upward float
    const translateY = interpolate(
        frame - delay,
        [0, 20],
        [40, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Buttery scale effect without bounce (damping: 200)
    const scale = spring({
        frame: frame - delay,
        fps,
        config: {
            damping: 200,
            stiffness: 150,
            mass: 0.8
        },
        from: 0.95,
        to: 1, // Fix: spring only has 'to', 'from' isn't natively supported like this in some older remotion versions, wait 'from' is supported.
    });

    return (
        <div
            className={`rounded-[40px] p-10 ${className}`}
            style={{
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                // Premium Glassmorphism
                background: "rgba(255, 255, 255, 0.65)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "2px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 40px 80px rgba(30, 54, 85, 0.06), inset 0 2px 20px rgba(255, 255, 255, 0.5)",
                ...style,
            }}
        >
            {children}
        </div>
    );
};
