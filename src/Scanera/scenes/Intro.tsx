import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';

const SmoothReveal: React.FC<{ text: string; delay: number; className?: string }> = ({ text, delay, className }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const val = spring({
        frame: frame - delay,
        fps,
        config: { damping: 200, mass: 3 }
    });

    const opacity = interpolate(val, [0, 1], [0, 1]);
    const translateY = interpolate(val, [0, 1], [20, 0]);

    return (
        <span
            style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                display: 'inline-block'
            }}
            className={className}
        >
            {text}
        </span>
    );
};

export const Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const logoSpring = spring({
        frame: frame - 5,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const lineWidth = spring({
        frame: frame - 30,
        fps,
        config: { damping: 200 }
    });

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center">
            <div className="relative z-10 flex flex-col items-center">
                {/* App Logo */}
                <div style={{ transform: `scale(${logoSpring})`, opacity: logoSpring }} className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-[0_0_40px_rgba(0,240,255,0.2)]">
                    <Img
                        src={staticFile("assets/scanera/logo.png")}
                        className="w-32 h-32 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    />
                </div>

                <h1 className="text-8xl font-bold tracking-tighter text-white mb-6 mix-blend-difference flex relative">
                    <SmoothReveal text="SCAN" delay={20} />
                    <SmoothReveal text="ERA" delay={35} className="text-[#00F0FF]" />
                </h1>

                <div
                    style={{
                        width: `${lineWidth * 100}%`,
                        opacity: lineWidth
                    }}
                    className="h-0.5 bg-[#00F0FF] shadow-[0_0_20px_#00F0FF] max-w-2xl"
                />

                <h2 className="mt-8 text-3xl font-mono text-slate-400 tracking-[0.5em] uppercase text-center leading-relaxed">
                    <SmoothReveal text="Inteligencia Documental" delay={55} />
                </h2>
            </div>

            {/* Grid Background */}
            <AbsoluteFill className="z-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />
        </AbsoluteFill>
    );
};
