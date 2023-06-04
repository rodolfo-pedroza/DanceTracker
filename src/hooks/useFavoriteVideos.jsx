import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/authContext";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

const useFavoriteVideos = (videoId) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const checkIfFavorite = async () => {
            const userId = user.uid;
            const favoritesRef = doc(db, `userData/${userId}/favorites/${videoId}`)
            const favoriteVideo = await getDoc(favoritesRef)

            setIsInitialized(favoriteVideo.exists( ))
            setIsFavorite(!!favoriteVideo.data())
        }

        checkIfFavorite()
    }, [videoId, user])

    const toggleFavorite = async () => {
        const userId = user.uid
        const favoritesRef = doc(db, `userData/${userId}/favorites/${videoId}`)

        if (isFavorite) {
            await deleteDoc(favoritesRef)
        } else {
            await setDoc(favoritesRef, { videoId })
        }

        setIsFavorite(prevIsFavorite => !prevIsFavorite)
    }   

    return { isFavorite, toggleFavorite, isInitialized }
}

export default useFavoriteVideos