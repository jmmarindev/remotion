import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, staticFile, Img } from 'remotion';

export const IntegrationsLogos: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const connectors = [
        { name: 'SAGE', img: 'sage.png', x: -300, y: -150 },
        { name: 'HOLDED', img: 'holded.png', x: 300, y: -150 },
        { name: 'ODOO', img: 'odoo.png', x: -300, y: 150 },
        { name: 'A3ERP', img: 'logo-a3erp.png', x: 300, y: 150 },
    ];

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center bg-[#030303] overflow-hidden">
            {/* Background Grid */}
            <AbsoluteFill
                className="z-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Central Hub */}
            <div className="relative z-20 w-40 h-40 rounded-full border-2 border-[#00F0FF] flex items-center justify-center shadow-[0_0_60px_rgba(0,240,255,0.5)] bg-black/90 backdrop-blur-sm">
                <Img
                    src={staticFile("assets/scanera/logo.png")}
                    className="w-28 h-28 object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                />
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full border border-[#00F0FF] animate-ping opacity-20" />
            </div>

            {connectors.map((conn, index) => {
                const activation = spring({
                    frame: frame - (index * 15),
                    fps,
                    config: { damping: 12, stiffness: 100 }
                });

                const angle = Math.atan2(conn.y, conn.x);

                return (
                    <div key={conn.name} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Connecting Line */}
                        <div
                            style={{
                                width: `${activation * Math.hypot(conn.x, conn.y)}px`,
                                transform: `rotate(${angle}rad)`,
                                transformOrigin: 'left center',
                                left: '50%',
                                top: '50%',
                                opacity: activation
                            }}
                            className="absolute h-[1px] bg-gradient-to-r from-[#00F0FF] to-transparent overflow-hidden z-10"
                        />

                        {/* Node / Logo Card */}
                        <div
                            style={{
                                transform: `translate(${conn.x}px, ${conn.y}px) scale(${activation})`,
                                opacity: activation
                            }}
                            className="absolute z-20"
                        >
                            <div className="bg-white p-4 rounded-xl flex items-center justify-center w-72 h-36 border-2 border-[#00F0FF] shadow-[0_0_40px_rgba(0,240,255,0.4)]">
                                <Img
                                    src={staticFile(`assets/scanera/integrations/${conn.img}`)}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>

                            {/* Label */}
                            <div className="text-white font-bold font-mono text-lg tracking-[0.2em] text-center mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {conn.name}
                            </div>
                        </div>
                    </div>
                );
            })}

            <h2 className="absolute bottom-16 text-3xl font-light text-white tracking-[0.5em] uppercase opacity-60 z-10">
                SINCRONIZACIÓN ACTIVA
            </h2>
        </AbsoluteFill>
    );
};
