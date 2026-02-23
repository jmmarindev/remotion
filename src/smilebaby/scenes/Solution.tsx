import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile, spring, useVideoConfig } from "remotion";
import { Title, BodyText } from "../components/Typography";
import { AnimatedCard } from "../components/AnimatedCard";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const Solution: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

    // Timing strategy:
    // Each step lasts 75 frames (2.5 seconds at 30fps)
    // 0-105: Intro text: "Pero SmileBaby... lo simplifica." (3.5 seconds)
    // 105-180: Step 1
    // 180-255: Step 2
    // 255-330: Step 3
    // 330-405: Step 4
    const stepDuration = 75;

    const steps = [
        { text: "Crea tu lista de deseos", num: "1", startFrame: 105, transform: "rotate(-1deg)", image: "assets/smilebaby/solution/captura1.png" },
        { text: "Agrega productos favoritos", num: "2", startFrame: 105 + stepDuration, transform: "rotate(2deg)", image: "assets/smilebaby/solution/silletacoche.jpeg" },
        { text: "Comparte con la familia", num: "3", startFrame: 105 + stepDuration * 2, transform: "rotate(-1.5deg)", image: "assets/smilebaby/solution/share-list.png" },
        { text: "Reservan en tiempo real", num: "4", startFrame: 105 + stepDuration * 3, transform: "rotate(1deg)", image: "assets/smilebaby/solution/list.png" }
    ];

    const floatY = Math.sin(frame / 18) * 15;
    const illustrationScale = spring({
        frame: frame - 10,
        fps,
        config: { damping: 200, stiffness: 100 },
        from: 0.9,
        to: 1
    });

    return (
        <AbsoluteFill style={{ opacity }}>
            <AnimatedBackground baseColor="#E0F2FE" /> {/* Calming Baby Blue base */}

            <div className="flex flex-col items-center h-full w-full relative pt-16 px-12">

                <AnimatedCard className="w-[850px] text-center mb-8 relative z-30" delay={5}>
                    <Title className="text-5xl text-[#1E3655] tracking-tight">SmileBaby lo simplifica.</Title>
                </AnimatedCard>

                {/* Ambient Overlapping illustration */}
                <div
                    className="absolute top-[35%] right-[-100px] z-10 opacity-20 saturate-150 mix-blend-multiply"
                    style={{
                        transform: `scale(${illustrationScale}) translateY(${floatY}px)`,
                        opacity: interpolate(frame - 15, [0, 15], [0, 0.4], { extrapolateRight: "clamp" })
                    }}
                >
                    <Img src={staticFile("assets/smilebaby/060.png")} className="h-[700px] object-contain" />
                </div>

                {/* Sequential Steps & Images Display */}
                <div className="flex-1 w-full relative z-20 flex flex-col items-center justify-center -mt-10">
                    {steps.map((step, index) => {
                        const localFrame = frame - step.startFrame;

                        // Calculate opacity to fade in and fade out for exactly `stepDuration` frames
                        const stepOpacity = interpolate(
                            localFrame,
                            [0, 10, stepDuration - 10, stepDuration], // Fade in 10f, hold, fade out 10f
                            [0, 1, 1, 0],
                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                        );

                        // If it's completely transparent, don't render it (performance/overlapping fix)
                        if (stepOpacity === 0) return null;

                        const stepScale = spring({
                            frame: localFrame,
                            fps,
                            config: { damping: 15, stiffness: 100 },
                            from: 0.8,
                            to: 1
                        });

                        return (
                            <div
                                key={`step-${index}`}
                                className="absolute flex flex-col items-center justify-center w-[900px]"
                                style={{
                                    opacity: stepOpacity,
                                    transform: `scale(${stepScale}) ${step.transform}`
                                }}
                            >
                                {/* The large image for the step */}
                                {step.image && (
                                    <Img
                                        src={staticFile(step.image)}
                                        className="object-cover mb-8 drop-shadow-[0_40px_80px_rgba(30,54,85,0.3)] rounded-[50px] border-[14px] border-[#1E3655]"
                                        style={{ width: 608, height: 1322 }} // 1320x2868 aspect ratio (15% larger)
                                    />
                                )}

                                {/* The large glassmorphism text card for the step */}
                                <AnimatedCard
                                    delay={0}
                                    className="w-full flex items-center p-10 backdrop-blur-3xl"
                                    style={{ background: "rgba(255,255,255,0.9)" }}
                                >
                                    <div className="w-20 h-20 rounded-[2.5rem] bg-[#1E3655] text-white flex items-center justify-center text-5xl font-bold mr-8 shadow-[0_15px_30px_rgba(30,54,85,0.25)] flex-shrink-0">
                                        {step.num}
                                    </div>
                                    <BodyText className="text-[2.6rem] leading-tight font-bold text-[#1E3655] m-0">{step.text}</BodyText>
                                </AnimatedCard>
                            </div>
                        );
                    })}
                </div>

            </div>
        </AbsoluteFill>
    );
};
