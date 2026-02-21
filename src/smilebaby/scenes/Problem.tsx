import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, Img, staticFile, spring, useVideoConfig } from "remotion";
import { Title, BodyText } from "../components/Typography";
import { AnimatedCard } from "../components/AnimatedCard";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const Problem: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

    // Floating chaotic positions representing overload
    const points = [
        { text: "Regalos duplicados", delay: 20, top: "25vh", left: "5%", rotation: -6 },
        { text: "Cosas innecesarias", delay: 40, top: "40vh", right: "5%", rotation: 8 },
        { text: "Sobrecarga mental", delay: 60, top: "55vh", left: "12%", rotation: -4 },
        { text: "Regalos de múltiples tiendas", delay: 80, top: "75vh", right: "8%", rotation: 5 }
    ];

    const illustrationScale = spring({
        frame: frame - 10,
        fps,
        config: { damping: 200, stiffness: 100 },
        from: 0.8,
        to: 1
    });

    const floatY = Math.sin(frame / 20) * 10;

    return (
        <AbsoluteFill style={{ opacity }}>
            {/* Darker, moodier background to represent the problem/chaos */}
            <AnimatedBackground baseColor="#E2E8F0" />

            {/* Dark vignette to focus attention and increase dramatic effect */}
            <div
                className="absolute inset-0 opacity-60 mix-blend-multiply"
                style={{
                    background: "radial-gradient(circle at center, rgba(30,54,85,0) 20%, rgba(30,54,85,0.9) 100%)",
                }}
            />

            <div className="flex flex-col items-center w-full h-full relative py-20 px-10">

                {/* Massive Typography */}
                <AnimatedCard className="w-[900px] text-center mb-10 relative z-30" delay={5}>
                    <Title className="text-[#1E3655] text-[3.8rem] leading-[1.1] text-center">
                        Sin coordinación,<br />
                        <span className="text-[#E11D48]">esto puede ser un caos...</span>
                    </Title>
                </AnimatedCard>

                {/* Hero Illustration centered but floating gently behind the chaotic cards */}
                <div
                    className="absolute top-[35%] z-10 w-full flex justify-center"
                    style={{
                        transform: `scale(${illustrationScale}) translateY(${floatY}px)`,
                        opacity: interpolate(frame - 15, [0, 15], [0, 1], { extrapolateRight: "clamp" })
                    }}
                >
                    <Img src={staticFile("assets/smilebaby/044.png")} className="h-[600px] object-contain drop-shadow-[0_20px_40px_rgba(30,54,85,0.4)] saturate-50" />
                </div>

                {/* Chaotic overflowing cards */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {points.map((point, index) => {
                        // Individual card pop-in animation
                        const cardScale = spring({
                            frame: frame - point.delay,
                            fps,
                            config: { damping: 12, stiffness: 150, mass: 1 }, // Bounce effect for the chaos cards
                            from: 0,
                            to: 1
                        });

                        return (
                            <Sequence key={index} from={point.delay} layout="none">
                                <div
                                    className="absolute"
                                    style={{
                                        top: point.top,
                                        left: point.left,
                                        right: point.right,
                                        transform: `scale(${cardScale}) rotate(${point.rotation}deg)`,
                                    }}
                                >
                                    <div
                                        className="bg-[rgba(255,255,255,0.95)] backdrop-blur-3xl rounded-[32px] p-10 shadow-[0_30px_60px_rgba(30,54,85,0.3)] border-2 border-white flex items-center gap-6"
                                        style={{ pointerEvents: 'auto' }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#E11D48] flex-shrink-0 animate-pulse" />
                                        <BodyText className="font-bold text-[2.8rem] m-0 text-[#1E3655] whitespace-nowrap">{point.text}</BodyText>
                                    </div>
                                </div>
                            </Sequence>
                        );
                    })}
                </div>

            </div>
        </AbsoluteFill>
    );
};
