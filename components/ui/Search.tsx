'use client'
import { ChangeEvent, useState, useRef, useEffect, FormEvent } from 'react';

// Custom debounce function
const useDebounce = (callback: Function, delay: number) => {
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            // cleanup function to clear the timeout
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (...args: any[]) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            callback(...args);
        }, delay);
    };
};

const SearchInput: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event.target.value);
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault(); // Prevent form submission
        // manually trigger the search when the button is clicked
        if (inputRef.current) search(inputRef.current.value);
    };

    const search = (searchInput: string) => {
        // Execute your search here
        console.log('Searching:', searchInput);
    };

    // Debounce search input by 300ms
    const debouncedSearch = useDebounce(search, 300);

    return (
        <form onSubmit={handleSearch} className="flex items-center justify-center w-full max-w-md outline-none">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                className="border border-gray-300  rounded-l-md px-3 py-2 w-full focus:ring-indigo-500focus:ring-offset-2"
                placeholder="Search"
                ref={inputRef}
            />
            <button
                type="submit"
                className="p-2 border-indigo-600 border bg-indigo-600 text-white rounded-r-md focus:ring-indigo-500focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
        </form>
    );
};

export default SearchInput;
