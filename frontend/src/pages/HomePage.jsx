import { useState } from 'react'
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

       //todo: try catch api here
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(`http://localhost:3000/${result.short_url}`)
        alert('Copied!')
    }

    return (
        <div>
            <h1>URL Shortener</h1>

            <div>
                <label htmlFor="url-input">Enter your destination URL</label>
                <form onSubmit={handleSubmit}>
                    <Input
                        id="url-input"
                        type="url"
                        placeholder="https://example.com/my-long-url"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create your short link'}
                    </Button>
                </form>

                <ErrorMessage message={error} />
            </div>

            {loading && <LoadingSpinner />}

            {result && (
                <div>
                    <h2>Your link is ready!</h2>
                    <div>
                        <p>Title: {result.title || 'Untitled'}</p>
                        <p>Short URL: http://localhost:3000/{result.short_url}</p>
                        <p>Original URL: {result.original_url}</p>
                        <Button onClick={handleCopy}>Copy Short URL</Button>
                    </div>
                </div>
            )}
        </div>
    )
}