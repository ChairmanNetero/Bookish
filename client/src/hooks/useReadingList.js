import { useState, useEffect } from 'react';
import { backendAPI } from '../api/api';

export const useReadingList = (bookId) => {
    const [isInReadingList, setIsInReadingList] = useState(false);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        checkIfInReadingList();
    }, [bookId]);

    const checkIfInReadingList = async () => {
        try {
            setLoading(true);
            const response = await backendAPI.get('/reading-list');
            const readingList = response.data;

            const isInList = readingList.some(item => item.bookId === bookId);
            setIsInReadingList(isInList);
        } catch (error) {
            console.error('Error checking reading list:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToReadingList = async () => {
        try {
            setActionLoading(true);
            await backendAPI.post('/reading-list', { bookId });
            setIsInReadingList(true);
            return { success: true };
        } catch (error) {
            console.error('Error adding to reading list:', error);

            if (error.response?.status === 409) {
                return { success: false, message: 'Book already in reading list' };
            }

            return { success: false, message: 'Failed to add book to reading list' };
        } finally {
            setActionLoading(false);
        }
    };

    const removeFromReadingList = async () => {
        try {
            setActionLoading(true);
            await backendAPI.delete(`/reading-list/${bookId}`);
            setIsInReadingList(false);
            return { success: true };
        } catch (error) {
            console.error('Error removing from reading list:', error);
            return { success: false, message: 'Failed to remove book from reading list' };
        } finally {
            setActionLoading(false);
        }
    };

    const toggleReadingList = async () => {
        if (isInReadingList) {
            return await removeFromReadingList();
        } else {
            return await addToReadingList();
        }
    };

    return {
        isInReadingList,
        loading,
        actionLoading,
        addToReadingList,
        removeFromReadingList,
        toggleReadingList
    };
};