import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/* ─── Logo Center Overlay (rendered at composition level to avoid frame resets) ── */

export const LogoCenterOverlay: React.FC<{
  durationFrames: number;
}> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, mass: 0.7 },
  });
  const scale = interpolate(entrance, [0, 1], [0.75, 1]);

  const exitOpacity = interpolate(
    frame,
    [durationFrames - 12, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const pulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.97, 1.03]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: entrance * exitOpacity,
        zIndex: 5,
      }}
    >
      <Img
        src={staticFile("elantidoto127_circle.png")}
        style={{
          width: 420,
          height: "auto",
          transform: `scale(${scale * pulse})`,
          mixBlendMode: "multiply",
          filter: [
            "drop-shadow(0 0 60px rgba(240,147,251,0.7))",
            "drop-shadow(0 0 120px rgba(79,172,254,0.45))",
            "drop-shadow(0 4px 24px rgba(0,0,0,0.4))",
          ].join(" "),
        }}
      />
    </div>
  );
};

const SPEAKER_ACCENTS = {
  0: {
    color: "#4facfe",
    glow: "rgba(79,172,254,0.4)",
    bg: "rgba(79,172,254,0.08)",
  },
  1: {
    color: "#f093fb",
    glow: "rgba(240,147,251,0.4)",
    bg: "rgba(240,147,251,0.08)",
  },
} as const;

/**
 * Curated quotes — hand-picked insight from each segment's content.
 * NOT a copy-paste of the first sentence. Each is the most valuable, punchy takeaway.
 */
const SEGMENT_QUOTES: string[] = [
  /* 0  */ "¿El vibe coding salva empresas o cava su tumba económica?",
  /* 1  */ "Cualquiera crea software con la vibra, sin saber programar de verdad",
  /* 2  */ "Ha inundado la red de slop, de pura basura algorítmica",
  /* 3  */ "La obsesión ciega por la rapidez está destruyendo los ingresos a largo plazo",
  /* 4  */ "Las startups necesitan la IA como multiplicador absoluto",
  /* 5  */ "💭",
  /* 6  */ "Si tardas seis meses en pulir, el mercado ya cambió por completo",
  /* 7  */ "Cero conocimientos × IA = Cero. El mercado les está castigando",
  /* 8  */ "¿Y si la IA sí suple esa carencia?",
  /* 9  */ "Fragmentos perfectos por separado, un Frankenstein que colapsa al primer bug",
  /* 10 */ "Funciona. Eso es lo que importa para testear",
  /* 11 */ "Por fuera impecable, por dentro un bloque de plástico imposible de iterar",
  /* 12 */ "Al menos tienes algo que mostrar mientras la competencia dibuja planos",
  /* 13 */ "No busco arte",
  /* 14 */ "El perfeccionismo mata más fundadores que la falta de pulido",
  /* 15 */ "300.000 personas copiaron prompts inútiles en piloto automático",
  /* 16 */ "Fue bastante revelador",
  /* 17 */ "La IA produce el promedio de un promedio. El 98% de las apps son iguales",
  /* 18 */ "Externalizar decisiones aburridas permite escalar un equipo pequeño",
  /* 19 */ "Escalar la mediocridad tiene un coste enorme. El usuario ya está insensibilizado",
  /* 20 */ "¿La ventana de oportunidad ya se cerró?",
  /* 21 */ "No alcanzar calidad mínima hoy no es falta de tiempo, es pereza pura",
  /* 22 */ "El creador alquila la lógica. Cuando algo se rompe, no sabe arreglarlo",
  /* 23 */ "Ese es el núcleo del problema",
  /* 24 */ "Un producto mediocre que resuelve un problema urgente gana al perfecto que llega tarde",
  /* 25 */ "...",
  /* 26 */ "La calidad es un lujo que solo puedes resolver si sobrevives al primer mes",
  /* 27 */ "La IA no sustituye el talento. Es un filtro brutal",
  /* 28 */ "Un filtro de ejecución",
  /* 29 */ "El mercado recompensará a quienes dominen los fundamentos y se obsesionen con el oficio",
  /* 30 */ "Velocidad para entrar al juego, fundamentos para no colapsar",
  /* 31 */ "Cuando la ola de slop retroceda, se verá qué cimientos son reales y cuáles de plástico",
  /* 32 */ "¿Tienes agilidad para sobrevivir hoy y precisión para no derrumbarte mañana?",
];

/**
 * Fun Spanish reaction tags with emojis, mapped per segment.
 */
const SEGMENT_TAGS: string[][] = [
  /* 0  */ ["🔥 Debate Épico", "📊 Mercado Roto"],
  /* 1  */ ["🤖 IA al Poder", "🗣️ Habla Natural"],
  /* 2  */ ["🚀 A Toda Velocidad", "💥 Slop Alert"],
  /* 3  */ ["😤 Fatiga Real", "📉 Ingresos en Peligro"],
  /* 4  */ ["🧪 Multiplicador IA", "⚡ Modo Startup"],
  /* 5  */ ["👂 Escuchando..."],
  /* 6  */ ["⏳ FOMO Intenso", "🏃 Corre o Muere"],
  /* 7  */ ["🧮 0 × IA = 0", "💀 Matemática Brutal"],
  /* 8  */ ["🧩 Pieza Faltante", "🤔 ¿Seguro?"],
  /* 9  */ ["🧟 Frankenstein", "🐛 Bug Incoming"],
  /* 10 */ ["✅ Funciona... ¿No?", "🤷 MVP Mode"],
  /* 11 */ ["🏠 Casa de Plástico", "🖨️ Impresión 3D"],
  /* 12 */ ["📐 Modo Arquitecto", "🐢 Lento pero..."],
  /* 13 */ ["🙅 No es Arte"],
  /* 14 */ ["🧮 5 Segundos", "💡 Problema Resuelto"],
  /* 15 */ ["🤖 Piloto Automático", "📋 Copy-Paste Masivo"],
  /* 16 */ ["📎 Caso Revelador"],
  /* 17 */ ["📱 Clones Infinitos", "😴 Zona Gris"],
  /* 18 */ ["👥 Equipo Pequeño", "⏰ Ahorra Horas"],
  /* 19 */ ["🥱 Insensibilizado", "📢 Alerta Mediocridad"],
  /* 20 */ ["🚪 Ventana Cerrada", "❓ ¿Ya fue?"],
  /* 21 */ ["📉 Retención Hundida", "😬 Pereza Pura"],
  /* 22 */ ["🔧 Motor Roto", "🤯 No Sabe Arreglarlo"],
  /* 23 */ ["🎯 El Núcleo"],
  /* 24 */ ["🏆 Velocidad Gana", "🥇 Derecho a Existir"],
  /* 25 */ ["💀 Ya."],
  /* 26 */ ["🗓️ Primer Mes", "🛟 Supervivencia"],
  /* 27 */ ["🔪 Filtro Brutal", "💪 Solo los Fuertes"],
  /* 28 */ ["🔪 Filtro de Ejecución"],
  /* 29 */ ["✍️ Papel y Lápiz", "🎖️ El Oficio"],
  /* 30 */ ["⚖️ Balance Imposible", "🎭 La Tensión"],
  /* 31 */ ["🌊 Ola de Slop", "🏛️ Cimientos Reales"],
  /* 32 */ ["👋 Gracias", "🎬 Fin del Debate"],
];

export const CenterContent: React.FC<{
  textContent: string;
  speakerId: 0 | 1;
  durationFrames: number;
  segmentIndex: number;
  type?: "full" | "insight" | "atomic";
  key_quote?: string;
  fun_tags?: string[];
  showLogo?: boolean;
  logoInstant?: boolean;
}> = ({
  textContent,
  speakerId,
  durationFrames,
  segmentIndex,
  type = "full",
  key_quote,
  fun_tags,
  showLogo = false,
  logoInstant = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = SPEAKER_ACCENTS[speakerId];
  const tags = fun_tags ?? SEGMENT_TAGS[segmentIndex] ?? SEGMENT_TAGS[0];
  const quote = key_quote ?? SEGMENT_QUOTES[segmentIndex] ?? "...";

  // Exit fade
  const exitOpacity = interpolate(
    frame,
    [durationFrames - 12, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (showLogo) {
    const logoEntrance = logoInstant
      ? 1
      : spring({
          frame: frame - 5,
          fps,
          config: { damping: 16, mass: 0.7 },
        });
    const logoScale = interpolate(logoEntrance, [0, 1], [0.75, 1]);
    const logoOpacity = logoEntrance;

    // Gentle floating pulse
    const pulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.97, 1.03]);

    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: exitOpacity * logoOpacity,
          zIndex: 5,
        }}
      >
        <Img
          src={staticFile("elantidoto127_circle.png")}
          style={{
            width: 420,
            height: "auto",
            transform: `scale(${logoScale * pulse})`,
            filter: [
              "drop-shadow(0 0 60px rgba(240,147,251,0.7))",
              "drop-shadow(0 0 120px rgba(79,172,254,0.45))",
              "drop-shadow(0 4px 24px rgba(0,0,0,0.4))",
            ].join(" "),
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        top: type === "atomic" ? "65%" : "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: type === "atomic" ? 24 : 36,
        opacity: exitOpacity,
        width: 900,
        zIndex: 5,
      }}
    >
      {/* Quote Card - smaller on atomic to leave room for avatar */}
      <div style={{ transform: type === "atomic" ? "scale(0.85)" : "none" }}>
        <QuoteCard quote={quote} accent={accent} frame={frame} fps={fps} />
      </div>

      {/* Fun reaction tags floating around */}
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          flexWrap: "wrap",
          position: "relative",
          minHeight: 60,
        }}
      >
        {tags.map((tag, i) => (
          <FunTag
            key={tag}
            text={tag}
            accent={accent}
            frame={frame}
            fps={fps}
            index={i}
            total={tags.length}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Quote Card ──────────────────────────────────────── */

const QuoteCard: React.FC<{
  quote: string;
  accent: { color: string; glow: string; bg: string };
  frame: number;
  fps: number;
}> = ({ quote, accent, frame, fps }) => {
  const entrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  const scale = interpolate(entrance, [0, 1], [0.85, 1]);
  const opacity = entrance;
  const floatY = Math.sin(frame * 0.04) * 3;

  return (
    <div
      style={{
        transform: `scale(${scale}) translateY(${floatY}px)`,
        opacity,
        backgroundColor: "rgba(5, 8, 22, 0.72)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 24,
        padding: "36px 48px",
        border: `2px solid ${accent.color}99`,
        boxShadow: `0 0 50px ${accent.glow}, 0 0 120px ${accent.color}22, 0 12px 40px rgba(0,0,0,0.5)`,
        outline: `1px solid ${accent.color}22`,
        outlineOffset: 6,
        maxWidth: 800,
        position: "relative",
      }}
    >
      {/* Big decorative quote mark */}
      <div
        style={{
          position: "absolute",
          top: -14,
          left: 20,
          fontSize: 80,
          color: accent.color,
          opacity: 0.25,
          fontFamily: "Georgia, serif",
          lineHeight: 1,
        }}
      >
        ❝
      </div>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 34,
          fontWeight: 500,
          color: "rgba(255,255,255,0.97)",
          textAlign: "center",
          lineHeight: 1.5,
          margin: 0,
          fontStyle: "italic",
          textShadow: `0 0 20px ${accent.color}44`,
        }}
      >
        {quote}
      </p>
    </div>
  );
};

/* ─── Fun Animated Tags ───────────────────────────────── */

const FunTag: React.FC<{
  text: string;
  accent: { color: string; glow: string };
  frame: number;
  fps: number;
  index: number;
  total: number;
}> = ({ text, accent, frame, fps, index }) => {
  // Staggered entrance with bounce
  const entrance = spring({
    frame: frame - (20 + index * 10),
    fps,
    config: { damping: 8, stiffness: 180 }, // bouncy!
  });

  // Each tag has its own unique floating pattern
  const phase = index * 2.5;
  const floatX = Math.sin(frame * 0.05 + phase) * 12;
  const floatY = Math.cos(frame * 0.07 + phase) * 8;
  const rotation = Math.sin(frame * 0.03 + phase) * 5;

  // Scale pulse when fully entered
  const pulse =
    entrance >= 0.95
      ? 1 + Math.sin(frame * 0.1 + index) * 0.05
      : interpolate(entrance, [0, 1], [0.4, 1]);

  const opacity = entrance;

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 24,
        fontWeight: 700,
        color: "white",
        background: `linear-gradient(135deg, ${accent.color}33, ${accent.color}66)`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "14px 28px",
        borderRadius: 40,
        border: `2px solid ${accent.color}cc`,
        boxShadow: `0 0 24px ${accent.glow}, 0 0 48px ${accent.color}22`,
        textShadow: `0 0 10px ${accent.glow}`,
        transform: `translateX(${floatX}px) translateY(${floatY}px) rotate(${rotation}deg) scale(${pulse})`,
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};
