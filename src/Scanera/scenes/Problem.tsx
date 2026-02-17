import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, Sequence } from 'remotion';

const ProblemIntro: React.FC = () => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0, 20, 80, 100], [0, 1, 1, 0]);
    // const translateY = interpolate(frame, [0, 100], [20, 0]); // Removed to prevent jitter

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center bg-[#030303] z-30" style={{ opacity }}>
            <div className="text-center px-12 w-full max-w-5xl">
                <h2 className="text-7xl font-bold text-white mb-8 tracking-tight leading-none text-red-500">
                    ENTRADA DE DATOS MANUAL
                </h2>
                <h3 className="text-4xl font-mono text-slate-400 mb-12 tracking-widest uppercase">
                    LENTO • COSTOSO • ERROR
                </h3>

                {/* The instruction implies replacing the previous span group with this new text */}
                <p className="text-4xl text-white font-light tracking-[0.2em] border-t-2 border-slate-800 pt-10 inline-block">
                    TIEMPO PERDIDO
                </p>
            </div>

            {/* Background Grid - Red Tint */}
            <AbsoluteFill
                className="z-[-1] opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(200px) scale(2)'
                }}
            />
        </AbsoluteFill>
    );
};

const Clock: React.FC<{ frame: number }> = ({ frame }) => {
    const hours = Math.floor(frame / 10) % 12;
    const rotation = frame * 15; // Fast rotation

    return (
        <div className="relative w-24 h-24 rounded-full border-2 border-slate-700 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
            {/* Hour Hand */}
            <div
                style={{ transform: `rotate(${rotation / 12}deg)` }}
                className="absolute w-1 h-6 bg-slate-500 origin-bottom bottom-1/2"
            />
            {/* Minute Hand */}
            <div
                style={{ transform: `rotate(${rotation}deg)` }}
                className="absolute w-0.5 h-8 bg-[#00F0FF] origin-bottom bottom-1/2"
            />
        </div>
    );
};

export const Problem: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();
    const transitionFrame = 100;

    // Adjusted frame for the action part
    const actionFrame = Math.max(0, frame - transitionFrame);

    // Accumulated Cost
    const moneyBurn = Math.floor(actionFrame * 250); // €250/frame (High burn for "Hours")

    // Ken Burns Effect (Slow Zoom) - starts after transition
    const scale = interpolate(actionFrame, [0, durationInFrames - transitionFrame], [1, 1.1]);

    // Action Opacity
    const actionOpacity = interpolate(frame, [transitionFrame, transitionFrame + 20], [0, 1]);

    return (
        <AbsoluteFill className="bg-[#030303] overflow-hidden">

            {/* Part 1: Intro Text */}
            <Sequence from={0} durationInFrames={transitionFrame + 10}>
                <ProblemIntro />
            </Sequence>

            {/* Part 2: Action Scene (Existing) */}
            <AbsoluteFill
                className="flex flex-col items-center justify-center"
                style={{ opacity: actionOpacity }}
            >
                {/* Background Image with Zoom */}
                <AbsoluteFill>
                    <Img
                        src={staticFile("assets/problem-operator.png")}
                        className="w-full h-full object-cover opacity-60"
                        style={{ transform: `scale(${scale})` }}
                    />
                    {/* Vignette Overlay */}
                    <AbsoluteFill style={{ background: 'radial-gradient(circle, transparent 20%, #030303 90%)' }} />
                </AbsoluteFill>

                <div className="flex flex-col items-center gap-12 z-10 relative mt-12">
                    <div className="flex items-end gap-32">
                        {/* The Operator Context */}
                        <div className="relative">
                            {/* Exhaustion effect - now floating over image */}
                            <div style={{ opacity: actionFrame > 90 ? 1 : 0 }} className="absolute -top-20 left-1/2 -translate-x-1/2 text-red-500 text-3xl font-mono font-bold animate-bounce bg-black/60 px-6 py-3 rounded-lg border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)] whitespace-nowrap">
                                FATIGA DETECTADA
                            </div>
                        </div>

                        {/* Time Passing */}
                        <div className="flex flex-col items-center gap-2">
                            <Clock frame={actionFrame} />
                            <div className="font-mono text-slate-400 text-sm tracking-widest uppercase bg-black/50 px-2 rounded">
                                HORAS PERDIDAS
                            </div>
                        </div>
                    </div>

                    {/* The Cost */}
                    <div className="text-center bg-red-950/20 border border-red-900/50 p-8 rounded-xl w-full max-w-2xl backdrop-blur-md">
                        <h2 className="text-slate-300 tracking-[0.3em] uppercase mb-4 text-sm font-bold">
                            COSTE OPERATIVO
                        </h2>
                        <div className="text-7xl font-bold font-mono text-white tabular-nums tracking-tighter drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                            -€{moneyBurn.toLocaleString()}
                        </div>
                    </div>
                </div>

            </AbsoluteFill>
        </AbsoluteFill>
    );
};
