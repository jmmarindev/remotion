import { AbsoluteFill, Series } from "remotion";
import { Intro } from "./scenes/Intro";
import { Problem } from "./scenes/Problem";
import { Solution } from "./scenes/Solution";
import { Outro } from "./scenes/Outro";

// Video dimensions: 1080x1920
// FPS: 30
// Total Duration: 4 scenes * ~5s (150 frames) = ~600 frames

export const SmilebabyVideo: React.FC = () => {
    return (
        <AbsoluteFill className="bg-[#FFFFFF]">
            <Series>
                <Series.Sequence durationInFrames={210}>
                    <Intro />
                </Series.Sequence>
                <Series.Sequence durationInFrames={390}>
                    <Problem />
                </Series.Sequence>
                <Series.Sequence durationInFrames={405}>
                    <Solution />
                </Series.Sequence>
                <Series.Sequence durationInFrames={210}>
                    <Outro />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
