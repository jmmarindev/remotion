import React from "react";

// Google Fonts injected directly for the Remotion context
const fonts = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Quicksand:wght@500;600;700&display=swap');
`;

export const Title: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = "", style }) => {
    return (
        <>
            <style>{fonts}</style>
            <h1
                className={`text-6xl font-bold text-[#1E3655] leading-[1.1] tracking-tight ${className}`}
                style={{
                    fontFamily: "'Quicksand', sans-serif",
                    ...style,
                }}
            >
                {children}
            </h1>
        </>
    );
};

export const Subtitle: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = "", style }) => {
    return (
        <h2
            className={`text-4xl font-semibold text-[#1E3655] leading-snug tracking-tight ${className}`}
            style={{
                fontFamily: "'Quicksand', sans-serif",
                ...style,
            }}
        >
            {children}
        </h2>
    );
};

export const BodyText: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = "", style }) => {
    return (
        <p
            className={`text-2xl text-[#212F2F] leading-relaxed ${className}`}
            style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                ...style,
            }}
        >
            {children}
        </p>
    );
};
