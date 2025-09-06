export const generateBookDescription = (book) => {
    // Use book subject as description if available
    if (book.subject && book.subject.length > 0) {
        const subjects = book.subject.slice(0, 3).join(', ');
        return `A fascinating book exploring themes of ${subjects}.`;
    }

    // Fallback generic descriptions based on book type
    const fallbackDescriptions = [
        "A captivating story that has captured readers' imagination worldwide.",
        "An engaging narrative filled with compelling characters and plot twists.",
        "A thought-provoking work that explores the depths of human experience.",
        "A masterfully crafted tale that resonates with readers of all ages.",
        "An inspiring story that challenges perspectives and touches hearts."
    ];

    // Use title length to deterministically pick a description (consistent for same book)
    const index = (book.title?.length || 0) % fallbackDescriptions.length;
    return fallbackDescriptions[index];
};

export const getWeekNumber = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek);
};

export const formatAuthors = (authorNames, maxAuthors = 2) => {
    if (!authorNames || authorNames.length === 0) {
        return 'Unknown Author';
    }

    const authors = authorNames.slice(0, maxAuthors).join(', ');
    return authorNames.length > maxAuthors ? `${authors} & others` : authors;
};

export const getCoverImageUrl = (coverId, size = 'L') => {
    return coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
        : 'https://placehold.co/200x300/png?text=No+Cover';
};