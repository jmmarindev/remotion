import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Title, Subtitle } from "../components/Typography";
import { AnimatedCard } from "../components/AnimatedCard";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

    // Floating animation for the illustration
    const floatY = Math.sin(frame / 15) * 15;
    const illustrationScale = spring({
        frame: frame - 10,
        fps,
        config: { damping: 200, stiffness: 100 },
        from: 0.8,
        to: 1
    });

    return (
        <AbsoluteFill style={{ opacity }}>
            <AnimatedBackground baseColor="#Fdf2f8" /> {/* a very light pink base */}

            <div className="flex flex-col items-center justify-center h-full w-full relative pt-12">

                <div
                    className="relative z-10 w-full flex justify-center mt-10 mb-10"
                    style={{
                        transform: `translateY(${floatY}px) scale(${illustrationScale})`,
                        opacity: interpolate(frame - 10, [0, 15], [0, 1], { extrapolateRight: "clamp" })
                    }}
                >
                    <Img src={staticFile("assets/smilebaby/Group 29.png")} className="h-[400px] object-contain drop-shadow-lg" />
                </div>

                {/* Content Card overlapping the illustration for depth */}
                <div className="relative z-20 w-[900px]">
                    <AnimatedCard className="flex flex-col items-center text-center w-full" delay={25}>

                        <Title className="mb-6">¿Viene un bebé en camino?</Title>
                        <Subtitle className="text-[#1E3655] opacity-80 max-w-[80%]">
                            Organiza tus regalos de forma simple y sin estrés.
                        </Subtitle>
                    </AnimatedCard>
                </div>

            </div>
        </AbsoluteFill>
    );
};
