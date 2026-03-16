import { useState, useEffect } from "react";
import { getUrlDetails, buildShortUrl } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";

export default function UrlDetailsPage({ shortUrl, onBack }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getUrlDetails(shortUrl);
        setDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [shortUrl]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!details) return <p>No data found. Please try again.</p>;

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button onClick={onBack}>Back to Analytics</Button>
        </div>

        <h1 className="mb-6">URL Details</h1>

        <div className="p-4 border mb-6">
          <div>
            <p>
              <strong>Title:</strong> {details.title || "Untitled"}
            </p>
            <p>
              <strong>Short URL:</strong> {buildShortUrl(details.short_url)}
            </p>
            <p>
              <strong>Original URL:</strong> {details.original_url}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(details.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Total Visits:</strong> {details.visits_count}
            </p>
          </div>
        </div>

        <div className="p-4 border">
          <h2 className="mb-4">Visit History</h2>
          {details.visits.length === 0 ? (
            <p>No visits yet</p>
          ) : (
            <table className="w-full border-collapse border text-center">
              <thead>
                <tr className="border-b">
                  <th className="p-3">City</th>
                  <th className="p-3">Country</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {details.visits.map((visit, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{visit.city || "Unknown"}</td>
                    <td className="p-3">{visit.country || "Unknown"}</td>
                    <td className="p-3">
                      {new Date(visit.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
