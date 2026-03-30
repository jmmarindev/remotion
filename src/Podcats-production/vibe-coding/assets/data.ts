import type { PodcastDebateData } from "../../episode-schema";

export const debateData: PodcastDebateData = {
  metadata: {
    episode_slug: "vibe-coding",
    episode_title: "Vibe Coding vs Rigor Técnico",
    audio_file: "Vibe_coding_frente_al_rigor_técnico.m4a",
    vibe_theme: "tech-analytical / debate",
    distribution_targets: {
      linkedin_start: "00:02:48,620", // Start of LinkedIn insight clip
      linkedin_end: "00:04:30,380", // End of LinkedIn insight clip
      linkedin_hook:
        "¿Te has preguntado por qué el perfeccionismo mata a tantos fundadores?",
      tiktok_start: "00:02:48,620", // Start of TikTok atomic clip
      tiktok_end: "00:04:01,590", // End of TikTok atomic clip
      tiktok_hook: "¡Alerta! El perfeccionismo está matando startups.",
      short_outro_cta: "Ve a nuestro canal para ver el debate completo.",
      short_outro_duration_seconds: 5,
    },
  },
  timeline: [
    {
      start_time: "00:00:00,220",
      end_time: "00:00:15,559",
      speaker_id: 0,
      text_content:
        "Bienvenidos a El Debate. Hoy, eh, analizamos una fractura crítica en el mercado tecnológico de este marzo de 2026. Hablamos de si el llamado vibe coding está salvando a las empresas o directamente cavando su timba económica.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "technology market fracture abstract",
          content_type: "illustration",
        },
        composition_note: "Background with dark overlay",
        asset_file: "asset_01.jpg",
      },
      overlay_ui: { headline: "La Fractura del Mercado" },
    },
    {
      start_time: "00:00:15,560",
      end_time: "00:00:31,660",
      speaker_id: 1,
      text_content:
        "Exacto. Y para contextualizar un poco, nos referimos a esta tendencia donde, bueno, cualquiera crea software simplemente dándole instrucciones en lenguaje natural a la inteligencia artificial. Todo basado en, digamos, la intuición y la vibra, en lugar de saber programar de verdad.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "robot writing code natural language",
          content_type: "vector",
        },
        composition_note: "Show AI taking text and building blocks",
        asset_file: "asset_02.jpg",
      },
      overlay_ui: { headline: "¿Qué es el Vibe Coding?" },
    },
    {
      start_time: "00:00:31,660",
      end_time: "00:00:53,080",
      speaker_id: 0,
      text_content:
        "Claro. Una democratización total que, seamos sinceros, ha inundado la red de slop, de pura basura algorítmica. Pero aquí está la tensión central de hoy. Yo sostengo que la velocidad de iteración y, eh, los multiplicadores de la IA son vitales para probar mercados...",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "fast speed iteration startup",
          content_type: "photo",
        },
        composition_note: "Speed motion blur abstract",
        asset_file: "asset_03.jpg",
      },
      overlay_ui: { headline: "Velocidad de Iteración" },
    },
    {
      start_time: "00:00:53,080",
      end_time: "00:01:10,220",
      speaker_id: 1,
      text_content:
        "Ya. Y mi postura, desde la dirección de producto, es que esa obsesión ciega por la rapidez ignora por completo los fundamentos del diseño. Y ojo, está destruyendo activamente los ingresos a largo plazo por la pura fatiga del consumidor.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "tired frustrated user computer",
          content_type: "photo",
        },
        composition_note: "Burnout and design failure",
        asset_file: "asset_04.jpg",
      },
      overlay_ui: { headline: "Fatiga del Consumidor" },
    },
    {
      start_time: "00:01:10,220",
      end_time: "00:01:18,760",
      speaker_id: 0,
      text_content:
        "A ver, el contexto es implacable ahora mismo. Para validar un mercado hoy, las startups necesitan usar la IA como un multiplicador absoluto.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "startup rocket launch tech",
          content_type: "illustration",
        },
        composition_note: "Startup pushing forward with AI",
        asset_file: "asset_05.jpg",
      },
      overlay_ui: { headline: "La IA como Multiplicador" },
    },
    {
      start_time: "00:01:18,760",
      end_time: "00:01:19,320",
      speaker_id: 1,
      text_content: "Mhm.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "listening abstract",
          content_type: "photo",
        },
        composition_note: "Brief reaction shot or keep previous image",
        asset_file: "asset_05.jpg", // reuse as it's very short
      },
      overlay_ui: { headline: "La IA como Multiplicador" },
    },
    {
      start_time: "00:01:19,320",
      end_time: "00:01:35,440",
      speaker_id: 0,
      text_content:
        "Crear un producto mínimo viable a través del vibe coding es pragmatismo puro. El FOMO tecnológico, ese miedo a quedarse atrás, es una fuerza real. Si tardas, no sé, seis meses en pulir la arquitectura y la interfaz, cuando sales el mercado ya ha cambiado por completo.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "hourglass running out fast market",
          content_type: "photo",
        },
        composition_note: "Depict time pressure",
        asset_file: "asset_06.jpg",
      },
      overlay_ui: { headline: "El FOMO Tecnológico" },
    },
    {
      start_time: "00:01:35,440",
      end_time: "00:01:50,900",
      speaker_id: 1,
      text_content:
        "Vale, entiendo ese FOMO, pero el problema es la matemática básica de ese multiplicador y por eso el mercado les está castigando ahora mismo. Si tienes cero conocimientos base de arquitectura, de software o de diseño, cero multiplicado por la IA sigue siendo cero.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "math equation zero failure",
          content_type: "vector",
        },
        composition_note: "Math conceptual 0 * AI = 0",
        asset_file: "asset_07.jpg",
      },
      overlay_ui: { headline: "Cero multiplicado por la IA" },
    },
    {
      start_time: "00:01:50,900",
      end_time: "00:01:57,500",
      speaker_id: 0,
      text_content:
        "Espera, espera. Eso asume que la IA no suple esa carencia. Y yo creo que sí lo hace en gran medida.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "bridge gap puzzle missing piece",
          content_type: "photo",
        },
        composition_note: "AI bridging a gap",
        asset_file: "asset_08.jpg",
      },
      overlay_ui: { headline: "Supliendo Carencias" },
    },
    {
      start_time: "00:01:57,500",
      end_time: "00:02:14,010",
      speaker_id: 1,
      text_content:
        "Es que no la suple de forma estructural. A ver, te explico por qué. La IA te da fragmentos de código perfectos por separado, pero si no tienes bases sólidas, no tienes ni idea de cómo coser esos fragmentos. El resultado es un monstruo de Frankenstein que colapsa al primer bug.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "frankenstein monster glitching bad code",
          content_type: "illustration",
        },
        composition_note: "Frankenstein glitch",
        asset_file: "asset_09.jpg",
      },
      overlay_ui: { headline: "El Monstruo de Frankenstein" },
    },
    {
      start_time: "00:02:14,010",
      end_time: "00:02:17,120",
      speaker_id: 0,
      text_content: "Bueno, pero funciona, que es lo importante para testear.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "prototype testing working MVP",
          content_type: "photo",
        },
        composition_note: "Working prototype",
        asset_file: "asset_10.jpg",
      },
      overlay_ui: { headline: "Prototipo Funcional" },
    },
    {
      start_time: "00:02:17,120",
      end_time: "00:02:33,600",
      speaker_id: 1,
      text_content:
        "Funciona a medias. Es como usar impresión tres D para construir una casa en un solo día. Por fuera parece impecable, claro, pero cuando intentas cambiar la fontanería te das cuenta de que todo es un bloque de plástico irrompible. Es rápido de lanzar, sí, pero es casi imposible de iterar.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "beautiful simple 3d plastic house illustration",
          content_type: "photo",
        },
        composition_note: "Melting or fake plastic house",
        asset_file: "asset_11.jpg",
      },
      overlay_ui: { headline: "La Casa de Plástico" },
    },
    {
      start_time: "00:02:33,600",
      end_time: "00:02:45,780",
      speaker_id: 0,
      text_content:
        "Vale, te compro la metáfora de la casa impresa, pero al menos tienes una casa que mostrar al cliente mientras tu competencia sigue, eh, dibujando planos en su estudio. Tu argumento asume que el usuario busca una obra de arte.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "drafting blueprints studio architect",
          content_type: "photo",
        },
        composition_note: "Architect studio looking slow",
        asset_file: "asset_12.jpg",
      },
      overlay_ui: { headline: "Mostrar al Cliente" },
    },
    {
      start_time: "00:02:45,780",
      end_time: "00:02:48,620",
      speaker_id: 1,
      text_content: "No, para nada. No busco arte.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "negative reaction head shake",
          content_type: "photo",
        },
        composition_note: "Continue from previous or generic",
        asset_file: "asset_12.jpg",
      },
      overlay_ui: { headline: "No Busco Arte" },
    },
    {
      start_time: "00:02:48,620",
      end_time: "00:03:02,540",
      speaker_id: 0,
      text_content:
        "Pero si mi aplicación le resuelve un problema contable complejo en cinco segundos, ¿qué le importa la jerarquía visual o la tipografía en esa etapa temprana? El perfeccionismo mata muchísimos más fundadores que la falta de pulido inicial.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "accounting software fast solution",
          content_type: "photo",
        },
        composition_note: "Solving a problem fast",
        asset_file: "asset_13.jpg",
      },
      overlay_ui: { headline: "El Perfeccionismo Mata" },
    },
    {
      start_time: "00:03:02,540",
      end_time: "00:03:16,280",
      speaker_id: 1,
      text_content:
        "Es que no hablamos de obras de arte, hablamos de lo que yo llamo precisión visible mínima. Y fíjate en el síndrome del prompter. Hace poco tuvimos ese experimento donde trescientas mil personas copiaron prompts inútiles en piloto automático.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "robot writing on computer",
          content_type: "photo",
        },
        composition_note: "Robot typing blindly",
        asset_file: "asset_14.jpg",
      },
      overlay_ui: { headline: "Precisión Visible Mínima" },
    },
    {
      start_time: "00:03:16,280",
      end_time: "00:03:19,000",
      speaker_id: 0,
      text_content: "Sí, recuerdo ese caso. Fue bastante revelador.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "nodding revelation idea",
          content_type: "photo",
        },
        composition_note: "Same as previous is fine",
        asset_file: "asset_14.jpg",
      },
      overlay_ui: { headline: "El Experimento" },
    },
    {
      start_time: "00:03:19,000",
      end_time: "00:03:37,380",
      speaker_id: 1,
      text_content:
        "Totalmente. Los creadores han externalizado su pensamiento crítico y su gusto humano. Y como la IA entrena con datos existentes, produce, matemáticamente hablando, el promedio de un promedio. Empuja todo hacia una zona gris donde el 98 % de las webs y aplicaciones son exactamente iguales.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "identical mobile apps clones interface",
          content_type: "vector",
        },
        composition_note: "Sea of cloned generic gray apps",
        asset_file: "asset_15.jpg",
      },
      overlay_ui: { headline: "El Promedio de un Promedio" },
    },
    {
      start_time: "00:03:37,380",
      end_time: "00:03:46,980",
      speaker_id: 0,
      text_content:
        "Ya, pero, eh, externalizar esa toma de decisiones aburrida es precisamente lo que permite escalar a un equipo pequeño. Te ahorra cientos de horas.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "small team working fast saving time clock",
          content_type: "photo",
        },
        composition_note: "Small team being super productive",
        asset_file: "asset_16.jpg",
      },
      overlay_ui: { headline: "Escalar Equipos Pequeños" },
    },
    {
      start_time: "00:03:46,980",
      end_time: "00:04:01,590",
      speaker_id: 1,
      text_content:
        "Escalar la mediocridad tiene un coste enorme, de verdad. Esa uniformidad genera desconfianza. Al principio, la novedad de un producto rápido generado por IA impresionaba, pero hoy el usuario ya está completamente insensibilizado.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "bored user scrolling phone generic",
          content_type: "photo",
        },
        composition_note: "Bored desensitized user",
        asset_file: "asset_17.jpg",
      },
      overlay_ui: { headline: "Escalar la Mediocridad" },
    },
    {
      start_time: "00:04:01,590",
      end_time: "00:04:04,260",
      speaker_id: 0,
      text_content:
        "¿Tú crees que esa ventana de oportunidad ya se ha cerrado?",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "closed window opportunity",
          content_type: "illustration",
        },
        composition_note: "Opportunity closing",
        asset_file: "asset_18.jpg",
      },
      overlay_ui: { headline: "¿Oportunidad Cerrada?" },
    },
    {
      start_time: "00:04:04,260",
      end_time: "00:04:15,590",
      speaker_id: 1,
      text_content:
        "Completamente. Las tasas de retención se hunden porque el usuario repudia la experiencia genérica. No alcanzar un estándar mínimo de calidad hoy no es por falta de tiempo, es pereza pura y dura.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "analytics graph going down retention fail",
          content_type: "vector",
        },
        composition_note: "Red graph going down",
        asset_file: "asset_19.jpg",
      },
      overlay_ui: { headline: "Pereza Pura y Dura" },
    },
    {
      start_time: "00:04:15,590",
      end_time: "00:04:27,700",
      speaker_id: 0,
      text_content:
        "A ver, reconozco el riesgo a largo plazo. El verdadero peligro del vibe coding no es que el producto nazca feo, es que el creador alquila la lógica. Y claro, cuando algo se rompe por debajo, no sabe cómo arreglarlo.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "broken engine clueless mechanic code",
          content_type: "photo",
        },
        composition_note: "Broken engine under the hood",
        asset_file: "asset_20.jpg",
      },
      overlay_ui: { headline: "Alquilar la Lógica" },
    },
    {
      start_time: "00:04:27,700",
      end_time: "00:04:30,380",
      speaker_id: 1,
      text_content: "Exactamente. Ese es el núcleo del problema.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "nucleus problem center abstract",
          content_type: "illustration",
        },
        composition_note: "Core agreement",
        asset_file: "asset_20.jpg",
      },
      overlay_ui: { headline: "El Núcleo del Problema" },
    },
    {
      start_time: "00:04:30,380",
      end_time: "00:04:43,040",
      speaker_id: 0,
      text_content:
        "Sin embargo, no compro del todo que la ventana de la velocidad se haya cerrado. Un producto mediocre que soluciona un problema urgente sigue ganando al producto perfecto que llega tarde. La velocidad algorítmica te da el derecho a existir en el mercado.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "fast runner winning race abstract",
          content_type: "photo",
        },
        composition_note: "Speed still wins",
        asset_file: "asset_21.jpg",
      },
      overlay_ui: { headline: "Derecho a Existir" },
    },
    {
      start_time: "00:04:43,040",
      end_time: "00:04:43,880",
      speaker_id: 1,
      text_content: "Ya.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "agreement listening face",
          content_type: "photo",
        },
        composition_note: "Keep previous",
        asset_file: "asset_21.jpg",
      },
      overlay_ui: { headline: "Derecho a Existir" },
    },
    {
      start_time: "00:04:43,880",
      end_time: "00:04:49,310",
      speaker_id: 0,
      text_content:
        "La calidad, eh, es un problema que solo tienes el lujo de resolver si logras sobrevivir al primer mes.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "survive first month startup luxury",
          content_type: "photo",
        },
        composition_note: "Survival themes",
        asset_file: "asset_22.jpg",
      },
      overlay_ui: { headline: "Sobrevivir el Primer Mes" },
    },
    {
      start_time: "00:04:49,310",
      end_time: "00:05:00,440",
      speaker_id: 1,
      text_content:
        "Pero sobrevivir un mes para morir al siguiente no es un modelo de negocio sostenible. La revolución de la IA no es un sustituto del talento creador. En realidad, es un filtro brutal.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "brutal filter sieve abstract",
          content_type: "illustration",
        },
        composition_note: "Filter passing out weak ones",
        asset_file: "asset_23.jpg",
      },
      overlay_ui: { headline: "Un Filtro Brutal" },
    },
    {
      start_time: "00:05:00,440",
      end_time: "00:05:02,340",
      speaker_id: 0,
      text_content: "Un filtro de ejecución, supongo.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "execution filter gear",
          content_type: "vector",
        },
        composition_note: "Keep previous",
        asset_file: "asset_23.jpg",
      },
      overlay_ui: { headline: "Filtro de Ejecución" },
    },
    {
      start_time: "00:05:02,340",
      end_time: "00:05:16,539",
      speaker_id: 1,
      text_content:
        "Exacto. Está exponiendo la ejecución perezosa. El mercado va a recompensar infinitamente a quienes tengan la disciplina de detenerse, escribir sus ideas en papel, dominar los fundamentos y obsesionarse verdaderamente con el oficio.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "writing notebook pen engineering draft",
          content_type: "photo",
        },
        composition_note: "Focus on craftsmanship",
        asset_file: "asset_24.jpg",
      },
      overlay_ui: { headline: "Obsesión por el Oficio" },
    },
    {
      start_time: "00:05:16,540",
      end_time: "00:05:23,420",
      speaker_id: 0,
      text_content:
        "Bueno, la tensión es ineludible. Necesitas la velocidad algorítmica para entrar al juego, pero los fundamentos sólidos para no colapsar.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "balance scale fast slow solid",
          content_type: "illustration",
        },
        composition_note: "Balance of speed and quality",
        asset_file: "asset_25.jpg",
      },
      overlay_ui: { headline: "La Tensión Ineludible" },
    },
    {
      start_time: "00:05:23,420",
      end_time: "00:05:33,640",
      speaker_id: 1,
      text_content:
        "Eso es. Cuando esta ola de slop retroceda, quedará al descubierto qué cimientos son reales y cuáles son, como decíamos antes, de plástico.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "ocean tide receding strong pillars versus plastic breaking",
          content_type: "photo",
        },
        composition_note: "Tide receding exposing pillars",
        asset_file: "asset_26.jpg",
      },
      overlay_ui: { headline: "Cimientos Reales vs Plástico" },
    },
    {
      start_time: "00:05:33,640",
      end_time: "00:05:48,368",
      speaker_id: 0,
      text_content:
        "Totalmente de acuerdo. Y el desafío queda sobre la mesa para quienes nos escuchan. Revisa los estándares de tu producto hoy. ¿Tienes la agilidad para sobrevivir al mercado actual y la precisión para no derrumbarte mañana? Gracias por acompañarnos en el debate.",
      visual_strategy: {
        asset_type: "freepik_asset",
        freepik_api_params: {
          query: "thank you watching debate conclusion abstract",
          content_type: "illustration",
        },
        composition_note: "Conclusion, clean out",
        asset_file: "asset_27.jpg",
      },
      overlay_ui: { headline: "Gracias por Acompañarnos" },
    },
  ],
};
