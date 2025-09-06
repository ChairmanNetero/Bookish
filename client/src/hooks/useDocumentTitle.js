import {useEffect} from 'react';

export function useDocumentTitle(title, defaultTitle = 'Bookish') {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title || defaultTitle;

        return () => {
            document.title = defaultTitle;
        };
    }, [title, defaultTitle]);
}