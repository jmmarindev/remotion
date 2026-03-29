import { writeFileSync } from 'fs';
import { join } from 'path';

export interface FreepikSearchParams {
  query: string;
  limit?: number;
  page?: number;
  orientation?: 'landscape' | 'portrait' | 'square';
  content_type?: 'photo' | 'vector' | 'illustration' | 'psd';
  license?: 'free' | 'premium';
}

export interface FreepikResource {
  id: string;
  title: string;
  type: string;
  image: {
    source: {
      url: string;
    };
  };
}

export class FreepikService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.freepik.com/v1';

  constructor() {
    const key = process.env.FREEPIK_API_KEY;
    if (!key) {
      throw new Error('FREEPIK_API_KEY is not defined in environment variables');
    }
    this.apiKey = key;
  }

  private get headers() {
    return {
      'x-freepik-api-key': this.apiKey,
      'Accept': 'application/json',
    };
  }

  /**
   * Searches for resources on Freepik.
   * Defaults to free license. Uses client-side filtering + slicing because
   * the Freepik API has a known bug where adding `limit` causes the
   * `filters[license][]=free` filter to be silently ignored.
   */
  async search(params: FreepikSearchParams) {
    const desiredLimit = params.limit || 5;
    const targetLicense = params.license || 'free';

    // Build base params — intentionally omit `limit` when requesting free assets
    // because Freepik's API ignores the license filter when limit is present.
    const searchParams = new URLSearchParams();
    searchParams.append('term', params.query);
    if (targetLicense !== 'free') {
      searchParams.append('limit', desiredLimit.toString());
    }
    searchParams.append('page', (params.page || 1).toString());

    let url = `${this.baseUrl}/resources?${searchParams.toString()}`;

    // Freepik requires URL-encoded array notation for filters
    url += `&filters%5Blicense%5D%5B%5D=${targetLicense}`;
    if (params.orientation) url += `&filters%5Borientation%5D%5B%5D=${params.orientation}`;
    if (params.content_type) url += `&filters%5Bcontent_type%5D%5B%5D=${params.content_type}`;

    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      throw new Error(`Freepik API Error: ${response.status} - ${await response.text()}`);
    }

    const data = await response.json();

    // Strict client-side filter: double-check that no premium assets leaked through
    if (data.data && targetLicense === 'free') {
      data.data = data.data.filter((item: any) =>
        !item.url?.includes('/premium-') &&
        item.premium !== true &&
        item.subscription !== 'premium'
      );
    }

    // Slice to desired limit (we over-fetched on purpose)
    if (data.data) {
      data.data = data.data.slice(0, desiredLimit);
    }

    return data;
  }

  /**
   * Retrieves the download URL for a specific resource ID and downloads it.
   */
  async download(resourceId: string, customFilename?: string, outputDir?: string): Promise<string> {
    const url = `${this.baseUrl}/resources/${resourceId}/download`;
    
    const response = await fetch(url, { headers: this.headers });
    
    if (!response.ok) {
      throw new Error(`Freepik Download Error: ${response.status} - ${await response.text()}`);
    }

    const data = await response.json();
    const downloadUrl = data.data?.url || data.url; // Depends on exact response
    
    if (!downloadUrl) {
      throw new Error('Download URL not found in Freepik response: ' + JSON.stringify(data));
    }

    // Now actually download the file bytes
    const fileResponse = await fetch(downloadUrl);
    if (!fileResponse.ok) {
        throw new Error(`Failed to download file from URL. Status: ${fileResponse.status}`);
    }
    
    const buffer = await fileResponse.arrayBuffer();
    
    // Save to target directory (default: assets subdirectory)
    const targetDir = outputDir || join(process.cwd(), 'src', 'Podcats-production', 'assets');
    
    // Infer extension from content-type or URL if possible, fallback to .jpg
    const ct = fileResponse.headers.get('content-type') || '';
    let ext = '.jpg';
    if (ct.includes('png')) ext = '.png';
    else if (ct.includes('vector') || ct.includes('svg')) ext = '.svg';
    else if (ct.includes('zip') || downloadUrl.includes('.zip')) ext = '.zip'; // Some vectors are zipped

    const finalFilename = customFilename ? (customFilename.includes('.') ? customFilename : `${customFilename}${ext}`) : `freepik-${resourceId}${ext}`;
    const outputPath = join(targetDir, finalFilename);
    
    writeFileSync(outputPath, Buffer.from(buffer));
    
    return outputPath;
  }
}
