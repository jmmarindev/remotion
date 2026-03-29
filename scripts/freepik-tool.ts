import { parseArgs } from 'util';
import { FreepikService, FreepikSearchParams } from '../src/services/freepik';

async function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      action: { type: 'string', short: 'a' },
      query: { type: 'string', short: 'q' },
      id: { type: 'string', short: 'i' },
      name: { type: 'string', short: 'n' },
      limit: { type: 'string', short: 'l' },
      type: { type: 'string', short: 't' },
    },
    allowPositionals: true,
  });

  const action = positionals[0] || values.action;

  if (!action) {
    console.error(`
Usage:
  npx tsx scripts/freepik-tool.ts search --query "cyberpunk city" --limit 5
  npx tsx scripts/freepik-tool.ts download --id "12345" --name "my-asset.jpg"
    `);
    process.exit(1);
  }

  const service = new FreepikService();

  try {
    if (action === 'search') {
      const q = values.query;
      if (!q) throw new Error('Missing --query argument');
      
      console.log(`🔍 Searching Freepik for: "${q}"...`);
      const params: FreepikSearchParams = {
        query: q,
        limit: values.limit ? parseInt(values.limit) : 5,
        content_type: values.type as any,
      };

      const result = await service.search(params);
      
      console.log(`✅ Found ${result.meta?.total || 0} results! Top matches:`);
      
      const items = result.data || [];
      items.slice(0, params.limit).forEach((item: any, idx: number) => {
        console.log(`\n--- [Result ${idx + 1}] ---`);
        console.log(`ID:     ${item.id}`);
        console.log(`Title:  ${item.title}`);
        console.log(`Type:   ${item.type}`);
        console.log(`URL:    ${item.url || 'N/A'}`);
        if(item.image?.source?.url) console.log(`Image:  ${item.image.source.url}`);
      });
      
      console.log(`\n💡 To download an asset, use: \n   npx tsx scripts/freepik-tool.ts download --id <ID> --name <custom-name>`);

    } else if (action === 'download') {
      const id = values.id;
      if (!id) throw new Error('Missing --id argument');
      
      console.log(`📥 Downloading asset ID: ${id}...`);
      const outputPath = await service.download(id, values.name);
      console.log(`✅ Download complete! Saved to: ${outputPath}`);
      
    } else {
      console.error(`Unknown action: ${action}`);
      process.exit(1);
    }

  } catch (error: any) {
    console.error(`❌ Action '${action}' failed.`);
    console.error(error.message);
    process.exit(1);
  }
}

main();
