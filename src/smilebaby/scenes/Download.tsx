import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Title, Subtitle } from "../components/Typography";
import { AnimatedCard } from "../components/AnimatedCard";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const Download: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

    // Floating animation
    const floatY = Math.sin(frame / 20) * 15;

    // Scale animation for central layout
    const contentScale = spring({
        frame: frame - 10,
        fps,
        config: { damping: 200, stiffness: 100 },
        from: 0.8,
        to: 1
    });

    const ImageButton = ({ src, delay, rotate }: any) => {
        const btnScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15, stiffness: 150 },
            from: 0,
            to: 1
        });

        return (
            <Img
                src={staticFile(src)}
                className="h-[130px] object-contain drop-shadow-[0_20px_40px_rgba(30,54,85,0.4)] transition-transform"
                style={{
                    transform: `scale(${btnScale}) rotate(${rotate}deg)`,
                }}
            />
        );
    };

    return (
        <AbsoluteFill style={{ opacity }}>
            <AnimatedBackground baseColor="#E2E8F0" /> {/* Clean, premium, techy background to end on */}

            <div className="flex flex-col items-center justify-center h-full w-full relative px-12">

                {/* Main Centered Content */}
                <div
                    className="relative z-20 w-full flex flex-col items-center justify-center"
                    style={{
                        transform: `translateY(${floatY}px) scale(${contentScale})`,
                        opacity: interpolate(frame - 5, [0, 15], [0, 1], { extrapolateRight: "clamp" })
                    }}
                >
                    <Img
                        src={staticFile("assets/smilebaby/Group 29.png")}
                        className="h-[350px] object-contain drop-shadow-2xl mb-16"
                    />

                    <AnimatedCard delay={15} className="flex flex-col items-center text-center p-16 w-[900px] mb-16">
                        <Title className="text-[4.2rem] text-[#1E3655] mb-2 leading-tight">Comienza ahora.</Title>
                        <Subtitle className="text-[#1E3655] opacity-80 text-[2.4rem]">
                            Haz tu lista gratis hoy mismo.
                        </Subtitle>
                    </AnimatedCard>

                    {/* Store Buttons Container */}
                    <div className="flex flex-row gap-12 mt-4 justify-center">
                        <ImageButton
                            src="button_app_store.png"
                            delay={35}
                            rotate={-2}
                        />

                        <ImageButton
                            src="button_google_play.png"
                            delay={45}
                            rotate={2}
                        />
                    </div>
                </div>

            </div>
        </AbsoluteFill>
    );
};
