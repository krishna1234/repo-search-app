export async function searchRepositories({
  query,
  language,
  stars,
  created,
  sort = "stars",
  order = "desc",
  page = 1,
  perPage = 10,
}) {
  const q = [
    query,
    language && `language:${language}`,
    stars && `stars:>=${stars}`,
    created && `created:>=${created}`,
  ]
    .filter(Boolean)
    .join("+");
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    q,
  )}&sort=${sort}&order=${order}&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 403) {
        return { error: "Rate limit exceeded" };
      } else if (response.status === 422) {
        return { error: "Invalid Search query" };
      } else {
        throw new Error("Failed to fetch repos");
      }
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}
