import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile, spring, useVideoConfig } from "remotion";
import { Title, Subtitle } from "../components/Typography";
import { AnimatedCard } from "../components/AnimatedCard";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const Outro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

    const floatY = Math.sin(frame / 20) * 20;
    const illustrationScale = spring({
        frame: frame - 25,
        fps,
        config: { damping: 200, stiffness: 100 },
        from: 0.8,
        to: 1
    });

    return (
        <AbsoluteFill style={{ opacity }}>
            <AnimatedBackground baseColor="#F1D6EB" />

            <div className="flex flex-col items-center justify-center h-full w-full relative px-12">

                {/* Hero Final Illustration */}
                <div
                    className="relative z-10 w-full flex justify-center mb-40"
                    style={{
                        transform: `translateY(${floatY}px) scale(${illustrationScale})`,
                        opacity: interpolate(frame - 20, [0, 20], [0, 1], { extrapolateRight: "clamp" })
                    }}
                >
                    <Img src={staticFile("assets/smilebaby/058.png")} className="h-[600px] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.15)]" />
                </div>

                <div className="relative z-20 w-[900px] -mt-84">
                    <AnimatedCard delay={5} className="flex flex-col items-center text-center p-16 w-full">
                        <Title className="mb-10 text-[3.8rem]">Menos decisiones,<br />más tranquilidad.</Title>

                        <Subtitle className="text-[#1E3655] opacity-90 text-[2.2rem]">
                            Tu lista de regalos, simple y organizada.
                        </Subtitle>
                    </AnimatedCard>
                </div>

                {/* Final Logo beneath card (same size as Intro) */}
                <div
                    className="relative z-30 w-full flex justify-center mt-24"
                    style={{
                        opacity: interpolate(frame - 35, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
                        transform: `scale(${spring({ frame: frame - 35, fps, config: { damping: 200 }, from: 0.8, to: 1 })})`
                    }}
                >
                    <Img src={staticFile("assets/smilebaby/Group 29.png")} className="h-[400px] object-contain drop-shadow-lg" />
                </div>

            </div>
        </AbsoluteFill>
    );
};
