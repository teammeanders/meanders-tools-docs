const REPO = "teammeanders/Meanders.Tools";

const RELEASES_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

export interface GitHubAsset {
  id: number;
  name: string;
  size: number;
  browser_download_url: string;
  content_type: string;
  download_count: number;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  assets: GitHubAsset[];
}

export async function getLatestRelease(): Promise<GitHubRelease> {
  const response = await fetch(RELEASES_URL, {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load the latest GitHub release.");
  }

  return response.json();
}
