import aaf2
import os
from fractions import Fraction

filepath = (
    "/Users/juanmiguelmarinberbell/Documents/Development/remotion/"
    "ElevenLabs_\u00bfVelocidad_o_Calidad_El_Dilema_de_la_Innovaci\u00f3n_Actual.aaf"
)

def samples_to_timecode(samples, sample_rate):
    seconds = samples / sample_rate
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int(round((seconds % 1) * 1000))
    return f"{h:02}:{m:02}:{s:02},{ms:03}"

with aaf2.open(filepath, "r") as f:
    all_mobs = list(f.content.mobs)

    # Get sample rate from edit rate of composition slots
    comp = next(m for m in all_mobs if m.__class__.__name__ == "CompositionMob")

    print("=== COMPOSITION TRACKS ===")
    for slot in comp.slots:
        er = slot["EditRate"].value
        if isinstance(er, Fraction):
            sample_rate = float(er)
        else:
            try:
                sample_rate = er.numerator / er.denominator
            except Exception:
                sample_rate = float(er)
        print(f"\nTrack: {slot.name!r}  EditRate={er} ({sample_rate:.0f} Hz)")

        comps = list(slot.segment.components)
        print(f"Components: {len(comps)}")

        cursor = 0
        segments = []
        for c in comps:
            length = c.length
            ctype = c.__class__.__name__
            if ctype == "SourceClip":
                start_tc = samples_to_timecode(cursor, sample_rate)
                end_tc   = samples_to_timecode(cursor + length, sample_rate)
                segments.append((start_tc, end_tc, cursor, cursor + length))
            cursor += length

        for seg in segments:
            print(f"  {seg[0]} --> {seg[1]}  ({seg[2]}-{seg[3]} samples)")

    print("\n\n=== FULL TIMELINE (interleaved, speaker labeled) ===")
    tracks = list(comp.slots)
    track_names = [t.name for t in tracks]

    # Collect all clips per track
    timeline_events = []
    for speaker_id, slot in enumerate(tracks):
        er = slot["EditRate"].value
        try:
            sample_rate = er.numerator / er.denominator
        except Exception:
            sample_rate = float(er)

        cursor = 0
        for c in slot.segment.components:
            if c.__class__.__name__ == "SourceClip":
                start_s = cursor / sample_rate
                end_s = (cursor + c.length) / sample_rate
                timeline_events.append((start_s, end_s, speaker_id, slot.name))
            cursor += c.length

    timeline_events.sort(key=lambda x: x[0])

    speaker_labels = {0: "Speaker 0 (Leo?)", 1: "Speaker 1 (Lola?)"}
    print(f"\n{'Start':>12}  {'End':>12}  {'Duration':>10}  Speaker")
    print("-" * 60)
    for start_s, end_s, spk, track in timeline_events:
        dur = end_s - start_s
        start_tc = samples_to_timecode(int(start_s * sample_rate), sample_rate)
        end_tc   = samples_to_timecode(int(end_s * sample_rate), sample_rate)
        print(f"  {start_tc}  {end_tc}  {dur:8.2f}s  {speaker_labels[spk]}")
        print(f"    track_id: {track}")

    total = max(e[1] for e in timeline_events)
    print(f"\nTotal duration: {total:.2f}s ({samples_to_timecode(int(total * sample_rate), sample_rate)})")
    print(f"\nTrack 0: {track_names[0]}")
    print(f"Track 1: {track_names[1]}")
