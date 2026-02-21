import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const AnimatedBackground: React.FC<{ baseColor?: string }> = ({ baseColor = "#F1D6EB" }) => {
    const frame = useCurrentFrame();

    // Create a continuous, very slow rotation for the gradient meshes to feel organic
    const rotation1 = frame * 0.1;
    const rotation2 = -frame * 0.08;
    const rotation3 = frame * 0.05;

    return (
        <AbsoluteFill style={{ backgroundColor: baseColor, overflow: "hidden" }}>
            {/* 
        We use ultra-smooth large blurry circles that slowly rotate around the screen 
        to create a dynamic gradient mesh that feels premium and "alive" but not distracting.
      */}

            {/* Accent 1: Soft Baby Blue overlay */}
            <div
                className="absolute w-[1400px] h-[1400px] rounded-full opacity-60 mix-blend-multiply"
                style={{
                    background: "radial-gradient(circle, rgba(224,242,254,0.8) 0%, rgba(224,242,254,0) 70%)",
                    top: "-20%",
                    left: "-10%",
                    transform: `rotate(${rotation1}deg) translateY(50px)`,
                    transformOrigin: "center center"
                }}
            />

            {/* Accent 2: Bright White overlay for depth */}
            <div
                className="absolute w-[1600px] h-[1600px] rounded-full opacity-70"
                style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
                    bottom: "-30%",
                    right: "-20%",
                    transform: `rotate(${rotation2}deg) translateX(-100px)`,
                    transformOrigin: "center center"
                }}
            />

            {/* Accent 3: Slight Pink/Lavender movement */}
            <div
                className="absolute w-[1800px] h-[1800px] rounded-full opacity-40 mix-blend-color-burn"
                style={{
                    background: "radial-gradient(circle, rgba(241,214,235,0.5) 0%, rgba(255,255,255,0) 60%)",
                    top: "10%",
                    right: "-10%",
                    transform: `rotate(${rotation3}deg) translateY(-80px) translateX(40px)`,
                    transformOrigin: "40% 60%"
                }}
            />

            {/* Delicate Noise Overlay (SVG filter for premium texture) */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </AbsoluteFill>
    );
};
