import { useState, useEffect } from 'react'
import { getAllUrls, buildShortUrl } from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function AnalyticsPage({ onSelectUrl }) {
    const [urls, setUrls] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const data = await getAllUrls()
                setUrls(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUrls()
    }, [])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorMessage message={error} />

    return (
        <div className="p-4 sm:p-8 max-w-6xl mx-auto">
            <h1 className="text-2xl mb-6">Analytics - All URLs</h1>

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
                                    <th className="p-3 text-left text-sm">Title</th>
                                    <th className="p-3 text-left text-sm">Short URL</th>
                                    <th className="p-3 text-left text-sm">Original URL</th>
                                    <th className="p-3 text-left text-sm">Visits</th>
                                    <th className="p-3 text-left text-sm">Created</th>
                                    <th className="p-3 text-left text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {urls.map((url) => (
                                    //Title and original url could be very long, need to truncate them
                                    <tr key={url.id} className="border-b">
                                        <td className="p-3 text-sm max-w-xs truncate">{url.title || 'Untitled'}</td>
                                        <td className="p-3 text-sm">{buildShortUrl(url.short_url)}</td>
                                        <td className="p-3 text-sm max-w-xs truncate">{url.original_url}</td>
                                        <td className="p-3 text-sm">{url.visits_count}</td>
                                        <td className="p-3 text-sm">{new Date(url.created_at).toLocaleString()}</td>
                                        <td className="p-3 text-sm">
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
        </div>
    )
}
