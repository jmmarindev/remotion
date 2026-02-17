import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Integrations: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const connectors = [
        { name: 'SAGE', x: -200, y: -100 },
        { name: 'XERO', x: 200, y: -100 },
        { name: 'HOLDED', x: 0, y: 150 },
    ];

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center bg-[#030303] overflow-hidden">
            {/* Central Hub */}
            <div className="relative z-10 w-24 h-24 rounded-full border-2 border-[#00F0FF] flex items-center justify-center shadow-[0_0_50px_rgba(0,240,255,0.3)] bg-black">
                <span className="text-2xl font-bold text-white">S</span>
            </div>

            {connectors.map((conn, index) => {
                const activation = spring({
                    frame: frame - (index * 10),
                    fps,
                    config: { damping: 12 }
                });

                return (
                    <div key={conn.name} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Connecting Line */}
                        <div
                            style={{
                                width: `${activation * Math.hypot(conn.x, conn.y)}px`,
                                transform: `rotate(${Math.atan2(conn.y, conn.x)}rad)`,
                                transformOrigin: 'left center',
                                left: '50%',
                                top: '50%'
                            }}
                            className="absolute h-0.5 bg-[#00F0FF]/30 overflow-hidden"
                        >
                            <div className="w-full h-full bg-[#00F0FF] animate-pulse" />
                        </div>

                        {/* Node */}
                        <div
                            style={{
                                transform: `translate(${conn.x}px, ${conn.y}px) scale(${activation})`,
                                opacity: activation
                            }}
                            className="absolute bg-black border border-white/20 w-40 h-20 -ml-20 -mt-10 flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-[#00F0FF]/5" />
                            <div className="text-xl font-bold text-white tracking-widest font-mono relative z-10">
                                {conn.name}
                            </div>
                            <div className="absolute top-0 right-0 w-2 h-2 bg-[#00F0FF]" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#00F0FF]" />
                        </div>
                    </div>
                );
            })}

            <h2 className="absolute bottom-12 text-3xl font-light text-white tracking-[0.5em] uppercase opacity-50">
                SINCRONIZACIÓN ACTIVA
            </h2>
        </AbsoluteFill>
    );
};
