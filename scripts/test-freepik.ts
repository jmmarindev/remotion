import { FreepikService } from '../src/services/freepik';

async function testFreepik() {
  console.log('=== Freepik API Integration Test ===\n');

  // 1. Check API key
  const apiKey = process.env.FREEPIK_API_KEY;
  if (!apiKey) {
    console.error('❌ FREEPIK_API_KEY is not defined in environment.');
    process.exit(1);
  }
  console.log('🔑 API Key found.\n');

  const service = new FreepikService();

  // 2. Test search (free license filter)
  console.log('--- Test 1: Search (free license) ---');
  try {
    const result = await service.search({
      query: 'podcast studio',
      limit: 5,
    });

    const items = result.data || [];
    console.log(`✅ Search OK — ${items.length} free results returned.`);

    // Verify all are free (no premium URLs)
    const premiumLeaks = items.filter(
      (item: any) => item.url?.includes('/premium-')
    );
    if (premiumLeaks.length > 0) {
      console.warn(
        `⚠️  ${premiumLeaks.length} premium assets leaked through the filter!`
      );
    } else {
      console.log('✅ All results confirmed free (no /premium- in URLs).');
    }

    items.forEach((item: any, i: number) => {
      console.log(`  ${i + 1}. [${item.id}] ${item.title}`);
      console.log(`     URL: ${item.url}`);
    });

    // 3. Test download of the first result
    if (items.length > 0) {
      const firstId = items[0].id;
      console.log(`\n--- Test 2: Download (ID: ${firstId}) ---`);
      try {
        const outputPath = await service.download(
          String(firstId),
          'test-freepik-download'
        );
        console.log(`✅ Download OK — saved to: ${outputPath}`);
      } catch (dlError: any) {
        console.error(`❌ Download failed: ${dlError.message}`);
      }
    }
  } catch (error: any) {
    console.error(`❌ Search failed: ${error.message}`);
    process.exit(1);
  }

  console.log('\n=== All tests passed ===');
}

testFreepik();
