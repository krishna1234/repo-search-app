"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "./components/SearchBar";
import RepositoryList from "./components/RepositoryList";
import PaginationControls from "./components/PaginationControls";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import { searchRepositories } from "./utils/api";
import { useDebounce } from "./utils/useDebounce";

// Force dynamic rendering to avoid prerendering issues with useSearchParams
export const dynamic = "force-dynamic";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [stars, setStars] = useState("");
  const [created, setCreated] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 300);
  const debouncedLanguage = useDebounce(language, 300);
  const debouncedStars = useDebounce(stars, 300);
  const debouncedCreated = useDebounce(created, 300);

  // Initialize state from URL parameters
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setLanguage(searchParams.get("language") || "");
    setStars(searchParams.get("stars") || "");
    setCreated(searchParams.get("created") || "");
    setPage(parseInt(searchParams.get("page") || "1"));
  }, [searchParams]);

  // Fetch repositories when debounced inputs or page change
  useEffect(() => {
    // Only fetch if at least one filter or query is set
    if (
      !debouncedQuery &&
      !debouncedLanguage &&
      !debouncedStars &&
      !debouncedCreated
    )
      return;

    const fetchRepositories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchRepositories({
          query: debouncedQuery,
          language: debouncedLanguage,
          stars: debouncedStars,
          created: debouncedCreated,
          page,
          perPage: 10,
        });
        setResults(data);
      } catch (err) {
        setError(err.message);
        setResults(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [
    debouncedQuery,
    debouncedLanguage,
    debouncedStars,
    debouncedCreated,
    page,
  ]);

  // Update URL when search parameters change
  useEffect(() => {
    // If all filters are cleared, reset to root URL
    if (!query && !language && !stars && !created && page === 1) {
      router.push("/");
      setResults(null); // Clear search results
      return;
    }

    const params = new URLSearchParams({
      q: query,
      language,
      stars,
      created,
      page: String(page),
    });
    router.push(`/?${params.toString()}`);
  }, [query, language, stars, created, page, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on manual search
  };

  const handleClear = () => {
    setQuery("");
    setLanguage("");
    setStars("");
    setCreated("");
    setPage(1);
    setResults(null); // Clear search results
  };

  const totalPages = results ? Math.ceil(results.total_count / 10) : 1;

  return (
    <>
      <div className="mb-8">
        <SearchBar
          query={query}
          language={language}
          stars={stars}
          created={created}
          onQueryChange={setQuery}
          onLanguageChange={setLanguage}
          onStarsChange={setStars}
          onCreatedChange={setCreated}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && results?.items.length === 0 && <EmptyState />}
      {!loading && !error && results?.items.length > 0 && (
        <>
          <RepositoryList repositories={results.items} />
          <PaginationControls
            page={page}
            totalPages={totalPages}
            query={query}
            language={language}
            stars={stars}
            created={created}
          />
        </>
      )}
    </>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GitHub Repository Search</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
