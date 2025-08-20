import React, {useState, useEffect} from 'react';
import axios from 'axios';

const BookOfTheWeek = () => {
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState('');

    // Get week number to ensure same book shows for the entire week
    const getWeekNumber = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = now - start;
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.floor(diff / oneWeek);
    };

    // A predefined list of books IDs from Open Library
    const bookIds = [
        'OL27448W', // The Lord of the Rings
        'OL3140822W', // To Kill a Mockingbird
        'OL1168083W', // 1984
        'OL468431W', // The Great Gatsby
        'OL66554W', // Pride and Prejudice
        'OL893415W', // Dune
        'OL27482W', // The Hobbit
        'OL857600W', // The Feast of the Goat
        'OL82931W', // Light in August
        'OL36287W' // The Count of Monte Cristo
    ];

    // Fetching the data using axios
    const fetchBook = async () => {
        try {
            const weekNumber = getWeekNumber();

            // Determine which book to feature this week
            const bookId = bookIds[weekNumber % bookIds.length];

            // Fetch book details from Open Library
            const bookResponse = await axios.get(`https://openlibrary.org/works/${bookId}.json`);
            const bookData = bookResponse.data;
            console.log(bookData);

            // Fetch author data
            let authorName = "Unknown Author";
            if (bookData.authors && bookData.authors.length > 0) {
                const authorKey = bookData.authors[0].author.key;
                const authorResponse = await axios.get(`https://openlibrary.org${authorKey}.json`);
                authorName = authorResponse.data.name;
                console.log(authorName);
                setAuthor(authorName);
            }

            // Fetch the description (without external links)
            const fullDescription = bookData.description;

            const separator = '--';
            const endIndex = fullDescription.indexOf(separator);
            const description = fullDescription.slice(0, endIndex);

            // Get the cover image URL
            const coverImageURL = (bookData) => {
                if (bookData.covers && bookData.covers.length > 0) {
                    const coverId = bookData.covers[0];
                    return `https://covers.openlibrary.org/b/olid/${coverId}-L.jpg`;
                }
            }

            // Construct the book object
            const bookInfo = {
                title: bookData.title,
                author: authorName,
                description: description,
                coverImage: coverImageURL

            }
            console.log(bookInfo);

        } catch (err) {
            console.error('Error fetching book data', err);
        }
    };


    useEffect(() => {
        fetchBook();
    }, []);

    return (
        <div>

        </div>
    );
};

export default BookOfTheWeek;