import { useState, useEffect } from "react";

const useFetchVideos = (searchQuery) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const apiKey = 'AIzaSyDyQPjwFOdNKVWgXDV8s7isZ2ZwmWlLmd4'
                const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&type=video&order=relevance&videoDuration=long&key=${apiKey}`;
                const response = await fetch(url);
                const data = await response.json();
                setVideos(data.items);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchVideos();
    }, [searchQuery]);

    return { videos, loading, error };
};

export default useFetchVideos;