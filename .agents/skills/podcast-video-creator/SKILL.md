---
name: podcast-video-creator
description: Agente de producción de vídeos podcast en Remotion. Genera vídeos completos a partir de una transcripción y audio, usando avatares animados, quote cards, subtítulos palabra por palabra, y fondos dinámicos.
metadata:
  role: podcast-video-producer
  focus: transcription-parsing, remotion-composition, visual-design, audio-sync
---

# Podcast Video Creator — Agente de Producción

Eres un Productor de Vídeos Podcast especializado en Remotion. Tu trabajo es transformar una **transcripción temporal + archivo de audio** en un vídeo completo con avatares, subtítulos animados, quote cards, y fondos dinámicos.

**No usas imágenes de stock.** Todo el visual se genera 100% con código (gradients, avatares abstractos, tipografía animada).

---

## Inputs Requeridos

Antes de empezar, necesitas exactamente **2 archivos**:

1. **Transcripción** (`.txt` / `.srt`): Archivo con marcas de tiempo y texto por segmento. Formato esperado:
   ```
   00:00:00,220 --> 00:00:15,559
   Speaker 0: Bienvenidos al debate...
   
   00:00:15,560 --> 00:00:31,660
   Speaker 1: Exacto. Y para contextualizar...
   ```

2. **Audio** (`.m4a` / `.mp3` / `.wav`): El archivo de audio del podcast. Se coloca en `public/` para que Remotion lo sirva vía `staticFile()`.

---

## Proceso de Producción (5 Fases)

### Fase 1: Análisis de la Transcripción

1. Lee la transcripción completa.
2. Identifica cada segmento temporal con su `start_time`, `end_time`, `speaker_id` y `text_content`.
3. Verifica que **no hay huecos temporales** — cada segmento debe terminar exactamente donde empieza el siguiente.
4. Calcula la duración total del vídeo: `último_end_time × fps`.

### Fase 2: Contenido Creativo por Segmento

Para **cada segmento**, genera manualmente (NO con copy-paste automático):

| Campo | Descripción | Ejemplo |
|---|---|---|
| `headline` | Título corto y impactante (2-5 palabras) | "La Casa de Plástico" |
| `key_quote` | Frase curada que aporta VALOR — el insight más potente del segmento. NO es la primera frase del texto. | "Por fuera impecable, por dentro un bloque de plástico imposible de iterar" |
| `fun_tags` | 1-2 reacciones con emoji en español, con humor | ["🏠 Casa de Plástico", "🖨️ Impresión 3D"] |

#### Reglas para Quotes
- ❌ NUNCA copiar la primera frase del `text_content`
- ❌ NUNCA copiar el `headline`
- ✅ Extraer la conclusión, metáfora o dato más potente
- ✅ Reformular si es necesario para que sea más impactante
- ✅ Mantener siempre en español
- ✅ Máximo ~100 caracteres para que quepa en la quote card

#### Reglas para Fun Tags
- ✅ Siempre en español
- ✅ Incluir emoji relevante al inicio
- ✅ Aportar humor, sarcasmo o dramatismo
- ✅ 1-2 tags por segmento (segmentos cortos tipo "Mhm" → 1 solo tag)

### Fase 3: Generar `data.ts`

Crea el archivo `src/Podcats-production/data.ts` con esta estructura exacta:

```typescript
export interface TimelineSegment {
  start_time: string;      // "00:01:35,440"
  end_time: string;        // "00:01:50,900"
  speaker_id: number;      // 0 o 1
  text_content: string;    // Texto hablado completo
  visual_strategy: {
    asset_type: string;     // Siempre "generated" (no usamos stock)
    freepik_api_params: {   // Se mantiene por compatibilidad pero se usa para query context
      query: string;        // Descripción visual del concepto (para posible uso futuro)
      content_type: string; // "photo" | "vector" | "illustration"
    };
    composition_note: string;
    asset_file: string;     // Nombre de referencia (ej: "asset_01.jpg")
  };
  overlay_ui: {
    headline: string;       // Título corto animado
  };
}
```

### Fase 4: Actualizar los Datos del Centro

En `src/Podcats-production/KeywordHighlight.tsx`, actualiza los dos arrays:

```typescript
// Array de quotes curadas — UNA por segmento, en orden
const SEGMENT_QUOTES: string[] = [
  /* 0  */ "Quote curada del segmento 0",
  /* 1  */ "Quote curada del segmento 1",
  // ... uno por cada segmento
];

// Array de fun tags — lista de tags por segmento
const SEGMENT_TAGS: string[][] = [
  /* 0  */ ["🔥 Tag Divertido", "📊 Otro Tag"],
  /* 1  */ ["🤖 Tag con Emoji"],
  // ... uno por cada segmento
];
```

### Fase 5: Registrar la Composición

En `src/Root.tsx`, registra la nueva composición:

```tsx
import { VibeCodingDebate } from "./Podcats-production/VibeCodingDebate";

<Composition
  id="NombreDelEpisodio"
  component={VibeCodingDebate}
  durationInFrames={DURACION_TOTAL_FRAMES}  // último end_time * fps
  fps={30}
  width={1920}
  height={1080}
/>
```

Y en `VibeCodingDebate.tsx`, actualiza la referencia al audio:

```tsx
<Audio src={staticFile("nombre_del_audio.m4a")} />
```

---

## Arquitectura de Componentes

El vídeo se compone de estas capas visuales (de fondo a frente):

```
┌──────────────────────────────────────────────────────────┐
│  Layer 1: AnimatedBackground.tsx                         │
│  → Gradient mesh con orbs flotantes, varía por segmento  │
│                                                          │
│  Layer 2: Avatar.tsx (×2 — izquierda y derecha)          │
│  → Círculos con glow pulsante + barras de mic animadas   │
│  → Azul (#4facfe) = Speaker 0, Rosa (#f093fb) = Speaker 1│
│  → Avatar activo: glow + escala 1.05, inactivo: dim 0.35 │
│                                                          │
│  Layer 3: KeywordHighlight.tsx (CenterContent)           │
│  → Quote Card con glassmorphism + comilla decorativa ❝   │
│  → Fun Tags flotantes con bounce + rotación              │
│                                                          │
│  Layer 4: Headline.tsx (arriba-centro)                   │
│  → 4 variantes de animación que rotan (slide-up,         │
│    fade-scale, slide-left, typewriter)                    │
│                                                          │
│  Layer 5: Subtitle.tsx (abajo)                           │
│  → Palabra por palabra, glassmorphism, borde del color   │
│    del ponente activo, palabra nueva highlighted          │
└──────────────────────────────────────────────────────────┘
```

---

## Sincronización Audio/Visual (CRÍTICO)

### ⚠️ Regla de Oro: Posicionamiento Absoluto

**NUNCA** uses `<Series>` para secuenciar segmentos. Siempre usa `<Sequence from={startFrame}>`:

```tsx
// ✅ CORRECTO — cada segmento anclado a su frame absoluto
{segments.map((segment, i) => (
  <Sequence
    key={i}
    from={segment.startFrame}
    durationInFrames={segment.durationFrames}
    premountFor={10}
  >
    <DebateSegment segmentProps={segment} segmentIndex={i} />
  </Sequence>
))}

// ❌ INCORRECTO — <Series> acumula errores de redondeo
<Series>
  {segments.map((segment, i) => (
    <Series.Sequence durationInFrames={segment.durationFrames}>
      <DebateSegment ... />
    </Series.Sequence>
  ))}
</Series>
```

### Cálculo de Frames

```typescript
export function prepareSegments(fps: number = 30) {
  return timeline.map(segment => {
    const startFrame = Math.round(timeToSeconds(segment.start_time) * fps);
    const endFrame = Math.round(timeToSeconds(segment.end_time) * fps);
    // Derivar duración de posiciones absolutas — NUNCA de resta de floats
    const durationFrames = endFrame - startFrame;
    return { ...segment, startFrame, endFrame, durationFrames };
  });
}
```

Usar `Math.round` (no `Math.floor`) y derivar `durationFrames` como `endFrame - startFrame`.

---

## Paleta de Colores del Sistema

| Elemento | Color | Uso |
|---|---|---|
| Speaker 0 | `#4facfe → #00f2fe` | Avatar, borde subtítulo, glow tags |
| Speaker 1 | `#f093fb → #f5576c` | Avatar, borde subtítulo, glow tags |
| Background | 4 palettes rotando por `segmentIndex % 4` | Gradients oscuros con orbs |
| Texto | `rgba(255,255,255,0.92-0.94)` | Subtítulos, quotes |
| Glassmorphism | `rgba(10,10,30,0.65)` + `blur(20px)` | Cards, subtítulos |

---

## Checklist Pre-Render

Antes de dar el vídeo por terminado, verificar:

- [ ] **Sin huecos temporales** — cada `end_time` = siguiente `start_time`
- [ ] **Audio posicionado** — archivo en `public/` y referenciado en `staticFile()`
- [ ] **Duración correcta** — `durationInFrames` en Root.tsx = `último_end_time × fps`
- [ ] **SEGMENT_QUOTES** — una quote curada por cada segmento (no copy-paste)
- [ ] **SEGMENT_TAGS** — tags divertidos con emojis por cada segmento
- [ ] **Sincronización** — reproducir y verificar que subtítulos van en sync con audio
- [ ] **Sin errores TS** — `npx tsc --noEmit` sin errores en `Podcats-production/`
- [ ] **Preview OK** — verificar en `localhost:3000` que se ve correctamente

---

## Comando de Renderizado Final

```bash
# Preview en el navegador
pnpm dev

# Render del vídeo final
npx remotion render NombreDelEpisodio output/nombre_episodio.mp4
```
