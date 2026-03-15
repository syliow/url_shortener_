import { useState, useEffect } from 'react'
import { getUrlDetails, buildShortUrl } from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import Button from '../components/Button'

export default function UrlDetailsPage({ shortUrl, onBack }) {
    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getUrlDetails(shortUrl)
                setDetails(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchDetails()
    }, [shortUrl])

    if (loading) return <LoadingSpinner />
    if (error) return <ErrorMessage message={error} />
    if (!details) return <p>No data found. Please try again.</p>

    return (
        <div>
            <Button onClick={onBack}>Back to Analytics</Button>

            <h1>URL Details</h1>

            <div>
                <h2>URL Information</h2>
                <p><strong>Title:</strong> {details.title || 'Untitled'}</p>
                <p><strong>Short URL:</strong> {buildShortUrl(details.short_url)}</p>
                <p><strong>Original URL:</strong> {details.original_url}</p>
                <p><strong>Created At:</strong> {new Date(details.created_at).toLocaleString()}</p>
                <p><strong>Total Visits:</strong> {details.visits_count}</p>
            </div>

            <div>
                <h2>Visit History</h2>
                {details.visits.length === 0 ? (
                    <p>No visits yet</p>
                ) : (
                    <table border="1">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Country</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.visits.map((visit, index) => (
                                <tr key={index}>
                                    <td>{visit.city || 'Unknown'}</td>
                                    <td>{visit.country || 'Unknown'}</td>
                                    <td>{new Date(visit.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
