import aaf2
import os

filepath = os.path.expanduser(
    "/Users/juanmiguelmarinberbell/Documents/Development/remotion/"
    "ElevenLabs_\u00bfVelocidad_o_Calidad_El_Dilema_de_la_Innovaci\u00f3n_Actual.aaf"
)

print(f"Opening: {filepath}")
print(f"File exists: {os.path.exists(filepath)}")

with aaf2.open(filepath, "r") as f:
    all_mobs = list(f.content.mobs)
    print(f"\nTotal mobs: {len(all_mobs)}")

    for i, mob in enumerate(all_mobs):
        print(f"\n=== Mob {i}: {mob.__class__.__name__} | name={getattr(mob, 'name', '?')}")
        for slot in mob.slots:
            print(f"  Slot '{slot.name}' media_kind={slot.media_kind}")
            seg = slot.segment
            seg_type = seg.__class__.__name__
            seg_len = getattr(seg, 'length', '?')
            print(f"    Segment: {seg_type} length={seg_len}")

            if hasattr(seg, 'components'):
                comps = list(seg.components)
                print(f"    Components: {len(comps)}")
                for j, c in enumerate(comps[:10]):
                    ctype = c.__class__.__name__
                    length = getattr(c, 'length', '?')
                    start = getattr(c, 'start_time', '?')
                    mob_ref = None
                    if hasattr(c, 'mob'):
                        try:
                            mob_ref = c.mob.name
                        except Exception:
                            mob_ref = "?"
                    print(f"      [{j}] {ctype} len={length} start={start} ref={mob_ref}")
