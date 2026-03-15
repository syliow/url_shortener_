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
        <div>
            <h1>Analytics - All URLs</h1>

            {urls.length === 0 ? (
                <p>No URLs created yet</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Short URL</th>
                            <th>Original URL</th>
                            <th>Visits</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((url) => (
                            <tr key={url.id}>
                                <td>{url.title || 'Untitled'}</td>
                                <td>{buildShortUrl(url.short_url)}</td>
                                <td>{url.original_url}</td>
                                <td>{url.visits_count}</td>
                                <td>{new Date(url.created_at).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => onSelectUrl(url.short_url)}>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
