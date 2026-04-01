import json, os

src = "src/Podcats-production/vibe-coding/assets/ElevenLabs_\u00bfVelocidad_o_Calidad_El_Dilema_de_la_Innovaci\u00f3n_Actual.mp3.json"
with open(src) as f:
    data = json.load(f)

def s_to_tc(sec):
    h = int(sec // 3600)
    m = int((sec % 3600) // 60)
    s = int(sec % 60)
    ms = int(round((sec % 1) * 1000))
    return f"{h:02}:{m:02}:{s:02},{ms:03}"

segs = data["segments"]

SPEAKER_MAP = {"speaker_0": 0, "speaker_1": 1}

# Editorial headlines / quotes / tags — curated per segment
EDITORIAL = [
    # [0] Leo intro
    {"headline": "El Antídoto", "key_quote": "La velocidad sin criterio no es innovación, es ruleta rusa con código.", "fun_tags": ["💊 Píldora Activada", "🎙️ Debate Encendido"]},
    # [1] Lola intro
    {"headline": "Dos Frentes", "key_quote": "Velocidad o calidad: elige tu veneno.", "fun_tags": ["⚔️ Dos Frentes", "🧠 Alta Tensión"]},
    # [2] Leo — la mentira de la industria
    {"headline": "La Gran Mentira", "key_quote": "Ejecutar rápido sin saber por qué es el new normal que nadie nombra como problema.", "fun_tags": ["🕵️ La Mentira", "🚀 Velocidad Máxima"]},
    # [3] Lola — obsesión por velocidad
    {"headline": "Obsesión Tóxica", "key_quote": "Cuando la velocidad se convierte en dogma, la calidad pasa a ser el enemigo.", "fun_tags": ["☠️ Dogma Tóxico", "📉 Deuda Técnica"]},
    # [4] Leo — mercado competitivo
    {"headline": "Mercado Darwinista", "key_quote": "Sin velocidad no hay mercado que validar. El perfecto que llega tarde no llega.", "fun_tags": ["🏎️ Velocidad Gana", "🎯 Validar Primero"]},
    # [5] Lola — democratización sin dirección
    {"headline": "Democracia Peligrosa", "key_quote": "Democratizar sin educar es darle un bisturí a alguien que no sabe anatomía.", "fun_tags": ["🔪 Bisturí Sin Mano", "⚠️ Peligro Oculto"]},
    # [6] Lola — base sólida
    {"headline": "Sin Cimientos", "key_quote": "Construir rápido sobre base frágil no es agilidad, es incompetencia disfrazada.", "fun_tags": ["🏚️ Casa de Naipes", "📐 Sin Fundamentos"]},
    # [7] Leo — el mercado filtra
    {"headline": "Darwin Digital", "key_quote": "El mercado es brutalmente honesto: lo que no funciona muere rápido.", "fun_tags": ["🧬 Selección Natural", "💀 Survival of Fittest"]},
    # [8] Lola — sensibilización del consumidor
    {"headline": "Anestesiados", "key_quote": "El consumidor no filtra lo malo cuando está bombardeado de mediocridad.", "fun_tags": ["🧟 Zombies Digitales", "📦 Slop en Producción"]},
    # [9] Leo — iterar rápido
    {"headline": "Iterar o Morir", "key_quote": "Fallar rápido y barato vale más que fallar perfecto y caro.", "fun_tags": ["🔄 Loop de Mejora", "💸 Fail Cheap"]},
    # [10] Lola — el costo de la rapidez
    {"headline": "El Precio Oculto", "key_quote": "La rapidez tiene una factura diferida que siempre terminas pagando con intereses.", "fun_tags": ["💳 Deuda Diferida", "🧾 Factura Técnica"]},
    # [11] Leo — parte del proceso
    {"headline": "El Caos Necesario", "key_quote": "La innovación nunca fue limpia. Siempre hubo fase de caos antes del orden.", "fun_tags": ["🌪️ Caos Creativo", "🔬 Proceso Real"]},
    # [12] Lola — acceso sin responsabilidad
    {"headline": "Acceso ≠ Criterio", "key_quote": "Tener acceso a la herramienta no te da el criterio para usarla bien.", "fun_tags": ["🔑 Acceso Sin Mapa", "🎭 Responsabilidad Cero"]},
    # [13] Leo — velocidad esencial
    {"headline": "Velocidad = Oxígeno", "key_quote": "En un mundo que no espera, la velocidad no es ventaja, es supervivencia.", "fun_tags": ["🌊 No Para el Mar", "⏱️ Oxígeno Digital"]},
    # [14] Lola — sólido antes que rápido
    {"headline": "Sólido o Rápido", "key_quote": "Prefiero llegar segunda con algo que dure que llegar primera con algo que se rompe.", "fun_tags": ["🏛️ Construir Para Durar", "🥈 Segundo Sólido"]},
    # [15] Leo — poder de la IA
    {"headline": "IA Multiplicadora", "key_quote": "La IA no es un atajo, es un multiplicador. La dirección la pones tú.", "fun_tags": ["✖️ Efecto Multiplicador", "🤖 IA Como Palanca"]},
    # [16] Lola — IA no puede sola
    {"headline": "IA No Basta", "key_quote": "Sin fundamentos, la IA amplifica tu incompetencia tan bien como amplifica tu talento.", "fun_tags": ["🔊 Amplificador de Errores", "📡 Sin Señal Propia"]},
    # [17] Leo — meollo del asunto
    {"headline": "El Dilema Real", "key_quote": "¿Qué es más importante: llegar o llegar bien?", "fun_tags": ["⚖️ La Pregunta Clave", "🧩 El Meollo"]},
    # [18] Lola — calidad primero
    {"headline": "Calidad Primero", "key_quote": "La velocidad sin calidad es solo ruido. El mercado no necesita más ruido.", "fun_tags": ["🔇 Silencio de Calidad", "🎯 Solo Lo Necesario"]},
    # [19] Leo — velocidad al mercado
    {"headline": "Llegar Importa", "key_quote": "La calidad que no llega al mercado no existe para nadie.", "fun_tags": ["📦 No Existe en Caja", "🚪 Llegar es Ganar"]},
    # [20] Lola — no hay acuerdo
    {"headline": "Impasse Intelectual", "key_quote": "El desacuerdo productivo vale más que el consenso vacío.", "fun_tags": ["🤝 Desacuerdo Sano", "💡 Tensión Útil"]},
    # [21] Leo — turno audiencia
    {"headline": "Tu Turno", "key_quote": "¿Eres de los que ejecutan rápido o de los que construyen para durar?", "fun_tags": ["🗳️ Vota Tu Bando", "🎮 Elige Lado"]},
    # [22] Lola — código duradero
    {"headline": "¿Código Eterno?", "key_quote": "¿Tu código sobrevive un mes? Si la respuesta te incomoda, ya tienes la respuesta.", "fun_tags": ["🧟 Código Zombie", "📅 Test del Mes"]},
    # [23] Leo — cierre El Antídoto
    {"headline": "No Alquiles Tu Lógica", "key_quote": "Alquilar tu lógica a una IA sin entenderla es el nuevo analfabetismo.", "fun_tags": ["🧠 Lógica Propia", "📵 No Delegar Todo"]},
    # [24] Lola — hasta la próxima
    {"headline": "Hasta la Próxima", "key_quote": "El debate sigue. La próxima píldora también duele.", "fun_tags": ["👋 Fin del Round", "💊 Próxima Dosis"]},
]

lines = []
lines.append('import type { PodcastDebateData } from "../../episode-schema";')
lines.append("")
lines.append("export const debateData: PodcastDebateData = {")
lines.append("  metadata: {")
lines.append('    episode_slug: "velocidad-o-calidad",')
lines.append('    episode_title: "¿Velocidad o Calidad? El Dilema de la Innovación Actual",')
lines.append('    audio_file: "podcasts/velocidad-o-calidad/audio.mp3",')
lines.append('    channel_name: "El Antídoto",')
lines.append('    channel_tagline: "Tu píldora contra la pereza intelectual.",')
lines.append('    editorial_pillar: "Modelos Mentales y Estrategia",')
lines.append("    distribution_targets: {")
lines.append('      linkedin_start: "00:02:05,485",  // Seg 10 — el coste oculto de la rapidez')
lines.append('      linkedin_hook: "¿Tienes claro cuánto te está costando realmente ir rápido?",')
lines.append('      tiktok_start: "00:01:05,397",  // Seg 6 — base sólida vs velocidad, turno rápido')
lines.append('      tiktok_hook: "🤖 Velocidad máxima… ¿o trampa mortal?",')
lines.append('      short_outro_cta: "Ve al canal y elige tu bando: ¿velocidad o calidad?",')
lines.append("      short_outro_duration_seconds: 5,")
lines.append("    },")
lines.append("  },")
lines.append("  timeline: [")

for i, seg in enumerate(segs):
    spk = SPEAKER_MAP[seg["speaker"]["id"]]
    start_tc = s_to_tc(seg["start_time"])
    end_tc = s_to_tc(seg["end_time"])
    text = seg["text"].strip().replace("\\", "\\\\").replace("`", "\\`")
    # escape quotes in text
    text_escaped = text.replace('"', '\\"')

    ed = EDITORIAL[i]
    headline = ed["headline"].replace('"', '\\"')
    key_quote = ed["key_quote"].replace('"', '\\"')
    fun_tags = ed["fun_tags"]
    fun_tags_str = ", ".join(f'"{t}"' for t in fun_tags)

    # Build words array
    words_clean = [w for w in seg["words"] if w["text"].strip()]

    lines.append(f"    {{")
    lines.append(f'      start_time: "{start_tc}",')
    lines.append(f'      end_time: "{end_tc}",')
    lines.append(f"      speaker_id: {spk},")
    lines.append(f'      text_content: "{text_escaped}",')
    lines.append(f"      overlay_ui: {{")
    lines.append(f'        headline: "{headline}",')
    lines.append(f'        key_quote: "{key_quote}",')
    lines.append(f"        fun_tags: [{fun_tags_str}],")
    lines.append(f"      }},")
    lines.append(f"      words: [")
    for w in words_clean:
        wt = w["text"].replace('"', '\\"')
        lines.append(f'        {{ text: "{wt}", start_time: {w["start_time"]:.3f}, end_time: {w["end_time"]:.3f} }},')
    lines.append(f"      ],")
    lines.append(f"    }},")

lines.append("  ],")
lines.append("};")
lines.append("")

output = "\n".join(lines)
out_path = "src/Podcats-production/vibe-coding/assets/data.ts"
with open(out_path, "w") as f:
    f.write(output)

print(f"Written {len(segs)} segments to {out_path}")
print(f"Total duration: {s_to_tc(segs[-1]['end_time'])}")
