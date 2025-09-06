import {useState, useEffect} from 'react';

export const useBookData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWithErrorHandling = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    };

    const fetchBookDetails = async (bookId) => {
        try {
            setLoading(true);
            setError(null);

            // Fetch book details
            const bookData = await fetchWithErrorHandling(`https://openlibrary.org/works/${bookId}.json`);

            // Fetch author data
            let authorName = "Unknown Author";
            if (bookData.authors && bookData.authors.length > 0) {
                try {
                    const authorKey = bookData.authors[0].author.key;
                    const authorData = await fetchWithErrorHandling(`https://openlibrary.org${authorKey}.json`);
                    authorName = authorData.name;
                } catch (authorError) {
                    console.warn('Could not fetch author data:', authorError);
                }
            }

            // Process description
            let description = "No description available.";
            if (bookData.description) {
                const fullDescription = typeof bookData.description === 'string'
                    ? bookData.description
                    : bookData.description.value || bookData.description;

                const separator = '--';
                const endIndex = fullDescription.indexOf(separator);
                description = endIndex > 0 ? fullDescription.slice(0, endIndex) : fullDescription;
            }

            // Get cover image
            let coverImage = null;
            if (bookData.covers && bookData.covers.length > 0) {
                const coverIndex = bookData.covers.length > 1 ? 1 : 0;
                coverImage = `https://covers.openlibrary.org/b/id/${bookData.covers[coverIndex]}-L.jpg`;
            }

            return {
                title: bookData.title || "Unknown Title",
                author: authorName,
                description: description,
                coverImage: coverImage
            };

        } catch (err) {
            console.error('Error fetching book data', err);
            setError('Failed to load book data. Please try again.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingBooks = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchWithErrorHandling('https://openlibrary.org/trending/daily.json');

            // Get a deterministic selection based on the current day
            const today = new Date();
            const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            const availableBooks = data.works || [];
            const selectedBooks = [];

            for (let i = 0; i < Math.min(8, availableBooks.length); i++) {
                const index = (dayOfYear + i * 7) % availableBooks.length;
                if (!selectedBooks.find(book => book.key === availableBooks[index].key)) {
                    selectedBooks.push(availableBooks[index]);
                }
            }

            return selectedBooks;

        } catch (err) {
            console.error("Failed to fetch trending books:", err);
            setError('Failed to load trending books. Please try again.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        fetchBookDetails,
        fetchTrendingBooks,
        setError,
        setLoading
    };
};