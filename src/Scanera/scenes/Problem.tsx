import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, Sequence } from 'remotion';

const ProblemIntro: React.FC = () => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0, 20, 80, 100], [0, 1, 1, 0]);

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center bg-[#030303] z-30" style={{ opacity }}>
            <div className="text-center px-12 w-full max-w-5xl">
                <h2 className="text-7xl font-bold text-white mb-8 tracking-tight leading-none text-red-500">
                    GESTIÓN MANUAL DE DOCUMENTOS
                </h2>
                <h3 className="text-4xl font-mono text-slate-400 mb-12 tracking-widest uppercase">
                    CAOS • ERRORES • LENTITUD
                </h3>

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

const ChaosWord: React.FC<{ text: string; x: number; y: number; delay: number }> = ({ text, x, y, delay }) => {
    const frame = useCurrentFrame();

    // Deterministic jitter
    const jitterX = Math.sin(frame * 0.5 + delay) * 10;
    const jitterY = Math.cos(frame * 0.3 + delay) * 10;

    // Glitch effect logic
    const glitchTrigger = (frame + delay) % 30; // Faster glitch
    const isGlitch = glitchTrigger > 25;

    return (
        <div
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(${jitterX}px, ${jitterY}px) skew(${isGlitch ? 20 : 0}deg) scale(${isGlitch ? 1.1 : 1})`,
                opacity: 1,
                filter: isGlitch ? 'contrast(1.5)' : 'none'
            }}
            className="absolute font-black font-mono text-white text-4xl tracking-widest border-4 border-white bg-red-600 px-6 py-4 shadow-[10px_10px_0px_rgba(0,0,0,1)] z-20 uppercase rotate-[-2deg]"
        >
            {text}
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

                {/* Chaos Words Overlay */}
                <AbsoluteFill>
                    {/* Floating words appearing over time */}
                    {actionFrame > 10 && <ChaosWord text="FACTURAS" x={20} y={30} delay={0} />}
                    {actionFrame > 20 && <ChaosWord text="TICKETS" x={70} y={25} delay={15} />}
                    {actionFrame > 35 && <ChaosWord text="RECIBOS" x={15} y={60} delay={30} />}
                    {actionFrame > 50 && <ChaosWord text="ALBARANES" x={75} y={70} delay={45} />}
                    {actionFrame > 65 && <ChaosWord text="PAPELES" x={40} y={20} delay={60} />}
                    {actionFrame > 80 && <ChaosWord text="ERRORES" x={50} y={80} delay={75} />}
                </AbsoluteFill>

                <div className="flex flex-col items-center gap-12 z-10 relative mt-12">
                    <div className="flex items-end gap-32">
                        {/* The Operator Context */}
                        <div className="relative">
                            {/* Removed Fatiga Detectada as requested */}
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
