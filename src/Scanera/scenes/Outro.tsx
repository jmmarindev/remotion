import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, Img, staticFile } from 'remotion';

export const Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const logoSpring = spring({
        frame: frame - 10,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    return (
        <AbsoluteFill className="flex flex-col items-center justify-center bg-[#000] text-white">
            {/* App Logo */}
            <div style={{ transform: `scale(${logoSpring})`, opacity: logoSpring }} className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-[0_0_40px_rgba(0,240,255,0.2)] z-10">
                <Img
                    src={staticFile("assets/scanera/logo.png")}
                    className="w-32 h-32 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
            </div>

            <h2 className="text-[100px] font-bold leading-none tracking-tighter mix-blend-difference z-10">
                SCANERA
            </h2>

            <div className="flex gap-4 items-center mt-12 z-10">
                <div className="h-[1px] w-24 bg-[#00F0FF]" />
                <p className="text-xl font-mono tracking-widest text-[#00F0FF]">
                    AUTOMATIZA AHORA
                </p>
                <div className="h-[1px] w-24 bg-[#00F0FF]" />
            </div>

            {/* CTA Button */}
            <div
                style={{ opacity: (frame % 60) < 30 ? 1 : 0 }}
                className="mt-16 border border-white px-12 py-4 text-2xl font-bold hover:bg-white hover:text-black transition-colors z-10 cursor-pointer"
            >
                PRUEBA AHORA
            </div>

            {/* Background Texture */}
            <AbsoluteFill className="z-0 opacity-30" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #111, #111 10px, #000 10px, #000 20px)'
            }} />
        </AbsoluteFill>
    );
};
