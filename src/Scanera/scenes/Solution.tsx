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

// Document Data Configuration
const DOCUMENTS = [
    { type: "FACTURA", vendor: "Tech Corp SL", amount: "€1,250.00", confidence: "99.9%" },
    { type: "TICKET", vendor: "Restaurante Plaza", amount: "€45.50", confidence: "98.5%" },
    { type: "ALBARÁN", vendor: "Logística Express", amount: "REF-2024-88", confidence: "99.2%" },
];

export const Solution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const transitionFrame = 90;

    // Adjusted frame for the scanner part
    const scannerFrame = Math.max(0, frame - transitionFrame);

    // Carousel Logic
    const docDuration = 80; // Frames per document
    const docIndex = Math.floor(scannerFrame / docDuration) % DOCUMENTS.length;
    const currentDoc = DOCUMENTS[docIndex];

    // Local frame for the current document (0 to 80)
    const localFrame = scannerFrame % docDuration;

    // Scan Laser Animation (Repeats every document)
    const scanProgress = spring({
        frame: localFrame,
        fps,
        config: { damping: 200, mass: 2, stiffness: 80 }, // Faster spring
        durationInFrames: 60
    });
    const scanPercent = interpolate(scanProgress, [0, 1], [0, 100]);

    // Document Switch Animation (Slide/Fade)
    const docOpacity = interpolate(localFrame, [0, 10, 70, 80], [0, 1, 1, 0]);
    const docScale = interpolate(localFrame, [0, 10], [0.9, 1], { extrapolateRight: 'clamp' });

    // Scanner Opacity (Overall scene fade-in)
    const scannerOpacity = interpolate(frame, [transitionFrame, transitionFrame + 20], [0, 1]);

    return (
        <AbsoluteFill className="bg-[#030303]">

            {/* Part 1: Intro Text */}
            <Sequence from={0} durationInFrames={transitionFrame + 10}>
                <IntroText />
            </Sequence>

            {/* Part 2: Dynamic Scanner */}
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

                <h2 className="text-5xl font-mono text-white mb-16 tracking-widest z-10 transition-all duration-300">
                    ANALIZANDO: <span className="text-[#00F0FF] font-bold">{currentDoc.type}</span>
                </h2>

                <div className="flex gap-24 items-center z-10">
                    {/* Dynamic Holographic Document */}
                    <div
                        style={{ opacity: docOpacity, transform: `scale(${docScale})` }}
                        className="relative w-80 h-[28rem] border border-[#00F0FF]/30 bg-[#00F0FF]/5 backdrop-blur-sm p-6 flex flex-col gap-4 overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.1)]"
                    >
                        {/* Corner Markers */}
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00F0FF]" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00F0FF]" />
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00F0FF]" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00F0FF]" />

                        {/* Document Header */}
                        <div className="h-6 w-1/2 bg-[#00F0FF]/20 mb-2" />

                        {/* Document Body (Abstract representation) */}
                        <div className="space-y-4 mt-4">
                            <div className="h-2 bg-white/10 w-full" />
                            <div className="h-2 bg-white/10 w-5/6" />
                            <div className="h-2 bg-white/10 w-full" />
                            <div className="h-16 w-full border border-dashed border-white/20 rounded flex items-center justify-center text-xs text-white/30">
                                {currentDoc.type} IMAGE
                            </div>
                            <div className="h-2 bg-white/10 w-4/6" />
                            <div className="h-2 bg-white/10 w-full" />
                        </div>

                        {/* Laser Scan Line */}
                        <div
                            style={{ top: `${scanPercent}%` }}
                            className="absolute left-0 w-full h-1 bg-[#00F0FF] shadow-[0_0_20px_#00F0FF] z-20"
                        />
                        <div
                            style={{ top: `${scanPercent}%`, height: '60px', transform: 'translateY(-100%)' }}
                            className="absolute left-0 w-full bg-gradient-to-t from-[#00F0FF]/30 to-transparent pointer-events-none z-10"
                        />
                    </div>

                    {/* Data Extraction Cards (Dynamic) */}
                    <div className="flex flex-col gap-8 font-mono w-64">
                        {/* Card 1: Vendor */}
                        <div style={{ opacity: localFrame > 20 ? 1 : 0, transform: `translateX(${localFrame > 20 ? 0 : 20}px)` }} className="transition-all duration-300">
                            <div className="border-l-4 border-[#00F0FF] pl-6 py-2 bg-black/40 backdrop-blur-md">
                                <div className="text-[#00F0FF] text-xs mb-1 tracking-widest">PROVEEDOR</div>
                                <div className="text-xl text-white font-bold truncate">{currentDoc.vendor}</div>
                            </div>
                        </div>

                        {/* Card 2: Amount */}
                        <div style={{ opacity: localFrame > 40 ? 1 : 0, transform: `translateX(${localFrame > 40 ? 0 : 20}px)` }} className="transition-all duration-300">
                            <div className="border-l-4 border-[#00F0FF] pl-6 py-2 bg-black/40 backdrop-blur-md">
                                <div className="text-[#00F0FF] text-xs mb-1 tracking-widest">TOTAL</div>
                                <div className="text-3xl text-white font-bold tracking-tighter">{currentDoc.amount}</div>
                            </div>
                        </div>

                        {/* Card 3: Validation */}
                        <div style={{ opacity: localFrame > 60 ? 1 : 0, transform: `translateX(${localFrame > 60 ? 0 : 20}px)` }} className="transition-all duration-300">
                            <div className="border-l-4 border-green-500 pl-6 py-2 bg-black/40 backdrop-blur-md">
                                <div className="text-green-500 text-xs mb-1 tracking-widest">ESTADO</div>
                                <div className="text-lg text-white font-bold flex items-center gap-2">
                                    VERIFICADO <span className="text-green-500">✓</span>
                                </div>
                                <div className="text-slate-500 text-[10px] mt-1">CONF: {currentDoc.confidence}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
