import { useState, useEffect } from "react";
import { getAllUrls, buildShortUrl } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function AnalyticsPage({ onSelectUrl }) {
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await getAllUrls(page, perPage);
        setUrls(data.urls);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, [page, perPage]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const handleRowsChange = (e) => {
    setPerpage(Number(e.target.value));
    setPage(1); //reset to page 1 after changing row count
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl">Analytics - All URLs</h1>
        <span>Rows</span>
        <select
          className="border px-2 py-1"
          onChange={handleRowsChange}
          value={perPage}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <span>Total: {total}</span>
      </div>

      {urls.length === 0 ? (
        <div className="p-8 border text-center">
          <p>No URLs created yet</p>
        </div>
      ) : (
        <div className="border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th>Title</th>
                  <th>Short URL</th>
                  <th>Original URL</th>
                  <th>Visits</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url) => (
                  //Title and original url could be very long, need to truncate them
                  <tr key={url.id} className="border-b">
                    <td className="p-3 max-w-xs truncate">
                      {url.title || "Untitled"}
                    </td>
                    <td className="p-3">{buildShortUrl(url.short_url)}</td>
                    <td className="p-3 max-w-xs truncate">
                      {url.original_url}
                    </td>
                    <td className="p-3">{url.visits_count}</td>
                    <td className="p-3">
                      {new Date(url.created_at).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => onSelectUrl(url.short_url)}
                        className="underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {urls.length > 0 && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-4 py-2 border disabled:opacity-20"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 border disabled:opacity-20"
            disabled={page * perPage >= total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
