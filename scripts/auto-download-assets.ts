/**
 * Auto-pick inteligente: searches Freepik for each unique segment asset,
 * picks the best match based on context relevance, and downloads them all.
 *
 * Usage:
 *   npx tsx --env-file=env.local scripts/auto-download-assets.ts
 *   npx tsx --env-file=env.local scripts/auto-download-assets.ts --dry-run   # preview only
 */
import { FreepikService } from '../src/services/freepik';
import { debateData } from '../src/Podcats-production/data';
import { existsSync } from 'fs';
import { join } from 'path';

const ASSETS_DIR = join(process.cwd(), 'src', 'Podcats-production', 'assets');
const DRY_RUN = process.argv.includes('--dry-run');

interface AssetPlan {
  assetFile: string;
  query: string;
  contentType: string;
  headline: string;
  textContext: string;
  compositionNote: string;
}

/**
 * Extracts the unique asset download plan from the timeline.
 * Many short segments reuse the same asset_file — we only need one download per unique file.
 */
function buildAssetPlan(): AssetPlan[] {
  const seen = new Set<string>();
  const plan: AssetPlan[] = [];

  for (const seg of debateData.timeline) {
    const file = seg.visual_strategy.asset_file;
    if (seen.has(file)) continue;
    seen.add(file);

    plan.push({
      assetFile: file,
      query: seg.visual_strategy.freepik_api_params.query,
      contentType: seg.visual_strategy.freepik_api_params.content_type,
      headline: seg.overlay_ui.headline,
      textContext: seg.text_content.slice(0, 120),
      compositionNote: seg.visual_strategy.composition_note,
    });
  }

  return plan;
}

/**
 * Intelligent pick: score each search result against the segment context.
 * - Keyword overlap between the result title and the segment's headline + query
 * - Prefer photos for "photo" content_type, vectors for "vector", etc.
 * - Prefer landscape orientation (video is 16:9)
 * - Higher download count = community-validated quality
 */
function scoreCandidates(
  candidates: any[],
  plan: AssetPlan
): any[] {
  const contextWords = new Set(
    `${plan.query} ${plan.headline} ${plan.textContext}`
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 2)
  );

  return candidates
    .map((item) => {
      let score = 0;

      // 1. Keyword overlap in title
      const titleWords = (item.title || '').toLowerCase().split(/\W+/);
      for (const w of titleWords) {
        if (contextWords.has(w)) score += 3;
      }

      // 2. Content type match
      const imgType = item.image?.type || '';
      if (imgType === plan.contentType) score += 5;

      // 3. Landscape orientation bonus (our video is 16:9)
      const orientation = item.image?.orientation || '';
      if (orientation === 'horizontal') score += 4;
      if (orientation === 'square') score += 1;

      // 4. Popularity bonus (community-validated)
      const downloads = item.stats?.downloads || 0;
      if (downloads > 10000) score += 3;
      else if (downloads > 1000) score += 2;
      else if (downloads > 100) score += 1;

      // 5. Photo type general quality bonus
      if (imgType === 'photo') score += 1;

      return { ...item, _score: score };
    })
    .sort((a, b) => b._score - a._score);
}

async function main() {
  console.log('🎬 Auto-Pick Inteligente — Freepik Asset Downloader\n');

  const service = new FreepikService();
  const plan = buildAssetPlan();

  console.log(`📋 ${plan.length} unique assets to download.\n`);

  if (DRY_RUN) {
    console.log('🔍 DRY RUN — will search and score but NOT download.\n');
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const [idx, asset] of plan.entries()) {
    const targetPath = join(ASSETS_DIR, asset.assetFile);
    const label = `[${idx + 1}/${plan.length}] ${asset.assetFile}`;

    // Skip if already downloaded (not a placeholder)
    if (existsSync(targetPath)) {
      const stats = require('fs').statSync(targetPath);
      // Skip only if file is larger than 10KB (not a placeholder)
      if (stats.size > 10240) {
        console.log(`⏭️  ${label} — already exists (${(stats.size / 1024).toFixed(0)} KB), skipping.`);
        skipped++;
        continue;
      }
    }

    console.log(`\n🔍 ${label}`);
    console.log(`   Query: "${asset.query}" (${asset.contentType})`);
    console.log(`   Context: "${asset.headline}" — ${asset.compositionNote}`);

    try {
      // Search with more results for better selection
      const result = await service.search({
        query: asset.query,
        limit: 10,
        content_type: asset.contentType as any,
        orientation: 'landscape',
      });

      const candidates = result.data || [];

      if (candidates.length === 0) {
        // Retry with broader search (no content_type filter)
        console.log('   ⚠️  No results with filters, retrying broader search...');
        const broader = await service.search({
          query: asset.query,
          limit: 10,
        });
        candidates.push(...(broader.data || []));
      }

      if (candidates.length === 0) {
        console.log(`   ❌ No free results found for "${asset.query}". Skipping.`);
        failed++;
        continue;
      }

      // Score and pick the best candidate
      const ranked = scoreCandidates(candidates, asset);
      const winner = ranked[0];

      console.log(`   🏆 Picked: [${winner.id}] "${winner.title}" (score: ${winner._score})`);
      console.log(`   📊 ${winner.stats?.downloads || 0} downloads | ${winner.image?.orientation || '?'} | ${winner.image?.type || '?'}`);

      if (!DRY_RUN) {
        const outputPath = await service.download(String(winner.id), asset.assetFile);
        console.log(`   ✅ Saved: ${outputPath}`);
        downloaded++;
      } else {
        console.log(`   🔍 (dry-run) Would download ID ${winner.id}`);
        downloaded++;
      }

      // Small delay to respect rate limits
      await new Promise((r) => setTimeout(r, 500));

    } catch (err: any) {
      console.error(`   ❌ Failed: ${err.message}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`🎬 Done! Downloaded: ${downloaded} | Skipped: ${skipped} | Failed: ${failed}`);
  console.log('='.repeat(50));
}

main();
