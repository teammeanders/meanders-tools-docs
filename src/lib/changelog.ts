const CHANGELOG_URL =
  "https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/CHANGELOG.md";

export async function getChangelog(): Promise<string> {
  const response = await fetch(CHANGELOG_URL, {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load changelog.");
  }

  return response.text();
}
