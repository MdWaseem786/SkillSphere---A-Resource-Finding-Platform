// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ResourceList from "./components/ResourceList.jsx";
import Pagination from "./components/Pagination.jsx";
import Loader from "./components/Loader.jsx";
import Bookmarks from "./components/Bookmarks.jsx";

const PER_PAGE = 6;
const MAX_PAGES = 5;

export default function App() {
  const [view, setView] = useState("explore");
  const [query, setQuery] = useState("javascript");
  const [rawResults, setRawResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const topRef = useRef(null);

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ss_bookmarks_v1")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ss_bookmarks_v1", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.find((p) => p.url === item.url || p.id === item.id);
      if (exists) return prev.filter((p) => p.url !== item.url && p.id !== item.id);
      return [item, ...prev];
    });
  };

  const isBookmarked = (item) =>
    bookmarks.some((b) => b.url === item.url || b.id === item.id);

  // Normalize resource object
  const normalizeItem = (it, idx) => ({
    id: it.id ?? `${it.url ?? it.name}-${idx}`,
    name: it.name ?? it.title ?? it.full_name ?? "Untitled",
    description:
      it.description ??
      it.excerpt ??
      it.summary ??
      it.body_markdown?.slice(0, 200) ??
      "No description available.",
    url: it.url ?? it.link ?? it.html_url ?? "#",
    tags: it.keywords ?? it.tags ?? it.tag_list ?? [],
    raw: it,
  });

  // Fetch GitHub first, fallback to Dev.to
  async function fetchResourcesForQuery(q) {
    setLoading(true);
    setError("");
    setRawResults([]);
    setPage(1);

    try {
      // ✅ Primary: GitHub repos
      const ghUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(
        q
      )}&per_page=${PER_PAGE * MAX_PAGES}`;
      const ghResp = await fetch(ghUrl);
      if (ghResp.ok) {
        const ghData = await ghResp.json();
        if (ghData.items && ghData.items.length > 0) {
          const items = ghData.items
            .slice(0, PER_PAGE * MAX_PAGES)
            .map((repo, i) =>
              normalizeItem(
                {
                  id: repo.id,
                  name: repo.full_name,
                  description: repo.description,
                  url: repo.html_url,
                  keywords: repo.topics || [],
                },
                i
              )
            );
          setRawResults(items);
          setLoading(false);
          return;
        }
      }

      // ✅ Fallback: Dev.to
      const fallbackUrl = `https://dev.to/api/articles?tag=${encodeURIComponent(
        q
      )}&per_page=${PER_PAGE * MAX_PAGES}`;
      const resp2 = await fetch(fallbackUrl);
      if (!resp2.ok) throw new Error("No resources available from APIs");

      const data2 = await resp2.json();
      const items2 = (Array.isArray(data2) ? data2 : [])
        .slice(0, PER_PAGE * MAX_PAGES)
        .map((a, i) =>
          normalizeItem(
            {
              id: a.id,
              name: a.title,
              description:
                a.description ||
                a.description_text ||
                a.body_markdown?.slice(0, 200),
              url: a.url,
              keywords: a.tag_list ?? a.tags,
            },
            i
          )
        );

      setRawResults(items2);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch resources. Try another query or check your network.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResourcesForQuery(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalItems = rawResults.length;
  const totalPages = Math.max(
    1,
    Math.min(MAX_PAGES, Math.ceil(totalItems / PER_PAGE))
  );
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const currentItems = rawResults.slice(start, end);

  const handleSearch = async (q) => {
    setQuery(q);
    await fetchResourcesForQuery(q);
    setView("explore");
    setPage(1);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSetPage = (n) => {
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-root">
      <Navbar
        view={view}
        setView={setView}
        totalBookmarks={bookmarks.length}
        onHome={() => setView("explore")}
      />

      <div className="app-container" ref={topRef}>
        <h1 className="title">SkillSphere — Coding Resources</h1>

        <SearchBar defaultValue={query} onSearch={handleSearch} />

        {view === "bookmarks" ? (
          <Bookmarks bookmarks={bookmarks} onToggle={toggleBookmark} />
        ) : (
          <>
            {loading ? (
              <Loader />
            ) : error ? (
              <div className="notice error">{error}</div>
            ) : (
              <>
                <div className="meta-row">
                  <div className="meta-left">
                    <strong>{totalItems}</strong> resources found
                  </div>
                  <div className="meta-right">
                    Showing {Math.min(totalItems, start + 1)}–{Math.min(totalItems, end)} of {totalItems}
                  </div>
                </div>

                <ResourceList
                  resources={currentItems}
                  onToggleBookmark={toggleBookmark}
                  isBookmarked={isBookmarked}
                />

                {totalPages > 1 && (
                  <Pagination page={page} totalPages={totalPages} setPage={handleSetPage} />
                )}
              </>
            )}
          </>
        )}
        <footer className="footer">
          Built for students • Showing up to {PER_PAGE * MAX_PAGES} curated resources
        </footer>
      </div>
    </div>
  );
}
