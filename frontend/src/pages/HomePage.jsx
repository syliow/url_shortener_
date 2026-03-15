import { useState } from 'react'
import { createShortUrl, buildShortUrl, getShortUrlDomain } from '../api'
import Input from '../components/Input'
import Button from '../components/Button'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'

export default function HomePage() {
    const [longUrl, setLongUrl] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const data = await createShortUrl(longUrl)
            setResult(data)
            setLongUrl('')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(buildShortUrl(result.short_url))
        alert('Copied!')
    }

    return (
        <div className="p-4 sm:p-8 max-w-2xl mx-auto">
            <h2 className="text-xl mb-6">Quick create: Short link</h2>

            <div className="mb-6 text-sm">
                Domain: <strong>{getShortUrlDomain()}</strong>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="url-input" className="block mb-2">
                    Enter your destination URL
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                        id="url-input"
                        type="url"
                        placeholder="https://example.com/my-long-url"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create short link'}
                    </Button>
                </div>
            </form>

            <ErrorMessage message={error} />

            {loading && <LoadingSpinner />}

            {result && (
                <div className="mt-6 p-4 border">
                    <h3 className="mb-3">Your link is ready!</h3>
                    <div className="p-3 border mb-3 break-all">
                        <a href={buildShortUrl(result.short_url)} target="_blank" rel="noopener noreferrer">
                            {buildShortUrl(result.short_url)}
                        </a>
                    </div>
                    <Button onClick={handleCopy}>Copy link</Button>
                </div>
            )}
        </div>
    )
}