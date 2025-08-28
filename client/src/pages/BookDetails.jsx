import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';

const BookDetails = () => {
    const {bookID} = useParams();
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                setLoading(true);
                // Fetch data by replacing with the actual API endpoint
                const response = await axios.get(`https://openlibrary.org/works/${bookID}`);
                const bookData = response.data;

                // Extract needed information for BookDetails Page
                const title = bookData.title;
                const publicationYear = bookData.first_publish_date;

                // Fetch author data
                let authorName = "Unknown Author";
                if (bookData.authors && bookData.authors.length > 0) {
                    try {
                        const authorKey = bookData.authors[0].author.key;
                        const authorResponse = await axios.get(`https://openlibrary.org${authorKey}.json`);
                        authorName = authorResponse.data.name;
                    } catch (authorError) {
                        console.warn('Could not fetch author data:', authorError);
                    }
                }

                // Fetch description
                const fullDescription = bookData.description;

                const separator = '--';
                const endIndex = fullDescription.indexOf(separator);
                const description = fullDescription.slice(0, endIndex);

                // Fetch cover image
                let coverImage = null;
                if (bookData.covers && bookData.covers.length > 0) {
                    coverImage = `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg`;
                } else {
                    coverImage = `'https://placehold.co/200x300/png?text=No+Cover`;
                }


                // Set the final book state
                setBook({
                    title: title,
                    authorName: authorName,
                    description: description,
                    publicationYear: publicationYear,
                    coverImage: coverImage,

                });

            } catch (err) {
                setError('Failed to fetch book details');
                console.error('Error fetching book:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookID])



    return (
        <div>
            
        </div>
    );
};

export default BookDetails;