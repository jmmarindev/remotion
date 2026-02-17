import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Intro } from './scenes/Intro';
import { Problem } from './scenes/Problem';
import { Solution } from './scenes/Solution';
import { IntegrationsLogos } from './scenes/IntegrationsLogos';
import { Outro } from './scenes/Outro';

const Black = () => <AbsoluteFill style={{ backgroundColor: '#030303' }} />;

export const ScaneraPromo: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#030303' }} className="font-sans text-white">
            <Audio src={staticFile("assets/scanera/voiceover.mp3")} />
            <Audio src={staticFile("assets/scanera/music.mp3")} volume={0.30} />

            <TransitionSeries>
                <TransitionSeries.Sequence durationInFrames={120}>
                    <Intro />
                </TransitionSeries.Sequence>

                {/* Intro -> Black -> Problem */}

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 20 })}
                />
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Black />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 20 })}
                />

                <TransitionSeries.Sequence durationInFrames={220}>
                    <Problem />
                </TransitionSeries.Sequence>

                {/* Problem -> Black -> Solution */}

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 20 })}
                />
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Black />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 20 })}
                />

                <TransitionSeries.Sequence durationInFrames={300}>
                    <Solution />
                </TransitionSeries.Sequence>

                {/* Solution -> Black -> Integrations */}
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 20 })}
                />
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Black />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 20 })}
                />

                <TransitionSeries.Sequence durationInFrames={160}>
                    <IntegrationsLogos />
                </TransitionSeries.Sequence>

                {/* Integrations -> Black -> Outro */}

                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 20 })}
                />
                <TransitionSeries.Sequence durationInFrames={60}>
                    <Black />
                </TransitionSeries.Sequence>
                <TransitionSeries.Transition
                    presentation={fade()}
                    timing={linearTiming({ durationInFrames: 20 })}
                />

                <TransitionSeries.Sequence durationInFrames={300}>
                    <Outro />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};
