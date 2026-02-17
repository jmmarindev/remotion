import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';

const IntroText: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 20, 60, 80], [0, 1, 1, 0]);

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center bg-[#030303] z-20" style={{ opacity }}>
            <div className="text-center px-12 w-full max-w-5xl">
                <h2 className="text-7xl font-bold text-white mb-8 tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                    DIGITALIZACIÓN AUTOMÁTICA
                </h2>
                <h3 className="text-5xl font-mono text-[#00F0FF] tracking-[0.5em] uppercase drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                    PRECISIÓN ABSOLUTA
                </h3>
            </div>

            {/* Background Grid for Text */}
            <AbsoluteFill
                className="z-[-1] opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(200px) scale(2)'
                }}
            />
        </AbsoluteFill>
    );
};

export const Solution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const transitionFrame = 90;

    // Adjusted frame for the scanner part
    const scannerFrame = Math.max(0, frame - transitionFrame);

    const scanProgress = spring({
        frame: scannerFrame,
        fps,
        config: { damping: 200, mass: 4, stiffness: 50 },
        durationInFrames: 90
    });

    const scanPercent = interpolate(scanProgress, [0, 1], [0, 100]);

    // Scanner Opacity
    const scannerOpacity = interpolate(frame, [transitionFrame, transitionFrame + 20], [0, 1]);

    return (
        <AbsoluteFill className="bg-[#030303]">

            {/* Part 1: Intro Text */}
            <Sequence from={0} durationInFrames={transitionFrame + 10}>
                <IntroText />
            </Sequence>

            {/* Part 2: Scanner (Existing) */}
            <AbsoluteFill
                className="flex flex-col items-center justify-center"
                style={{ opacity: scannerOpacity }}
            >
                {/* Background Grid */}
                <AbsoluteFill
                    className="opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                />

                <h2 className="text-5xl font-mono text-white mb-16 tracking-widest z-10">
                    MOTOR ANÁLISIS IA
                </h2>

                <div className="flex gap-24 items-center z-10">
                    {/* Holographic Document */}
                    <div className="relative w-80 h-[28rem] border border-[#00F0FF]/30 bg-[#00F0FF]/5 backdrop-blur-sm p-6 flex flex-col gap-4 overflow-hidden">
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00F0FF]" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00F0FF]" />

                        {/* Document Content Skeleton */}
                        <div className="h-4 bg-[#00F0FF]/20 w-3/4 mb-4" />
                        <div className="h-32 bg-[#00F0FF]/10 w-full mb-4 border border-[#00F0FF]/10" />
                        <div className="space-y-3">
                            <div className="h-2 bg-[#00F0FF]/20 w-full" />
                            <div className="h-2 bg-[#00F0FF]/20 w-5/6" />
                            <div className="h-2 bg-[#00F0FF]/20 w-4/6" />
                        </div>

                        {/* Laser Scan Line */}
                        <div
                            style={{ top: `${scanPercent}%` }}
                            className="absolute left-0 w-full h-0.5 bg-[#00F0FF] shadow-[0_0_30px_#00F0FF]"
                        />
                        <div
                            style={{ top: `${scanPercent}%`, height: '50px' }}
                            className="absolute left-0 w-full bg-gradient-to-t from-[#00F0FF]/20 to-transparent pointer-events-none"
                        />
                    </div>

                    {/* Data Extraction Cards */}
                    <div className="flex flex-col gap-6 font-mono">
                        <div style={{ opacity: scannerFrame > 30 ? 1 : 0, transform: `translateX(${scannerFrame > 30 ? 0 : 20}px)` }} className="transition-all duration-500">
                            <div className="border-l-2 border-[#00F0FF] pl-6 py-2">
                                <div className="text-[#00F0FF] text-xs mb-1">DATOS: PROVEEDOR</div>
                                <div className="text-2xl text-white">Tech Corp SL</div>
                                <div className="text-green-500 text-xs mt-1">CONFIANZA: 99.9%</div>
                            </div>
                        </div>

                        <div style={{ opacity: scannerFrame > 50 ? 1 : 0, transform: `translateX(${scannerFrame > 50 ? 0 : 20}px)` }} className="transition-all duration-500">
                            <div className="border-l-2 border-[#00F0FF] pl-6 py-2">
                                <div className="text-[#00F0FF] text-xs mb-1">DATOS: TOTAL</div>
                                <div className="text-2xl text-white">€1,250.00</div>
                                <div className="text-green-500 text-xs mt-1">CONFIANZA: 99.8%</div>
                            </div>
                        </div>

                        <div style={{ opacity: scannerFrame > 70 ? 1 : 0, transform: `translateX(${scannerFrame > 70 ? 0 : 20}px)` }} className="transition-all duration-500">
                            <div className="border-l-2 border-[#00F0FF] pl-6 py-2">
                                <div className="text-[#00F0FF] text-xs mb-1">VALIDACIÓN</div>
                                <div className="text-2xl text-white">CORRECTO</div>
                            </div>
                        </div>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
