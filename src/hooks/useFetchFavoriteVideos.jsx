import { useState, useEffect } from "react";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/authContext";

const useFetchFavoriteVideos  = () => {
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const userId = user.uid;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const danceTypes = ["bachata", "reggaeton", "salsa"];
        const videoData = {};

        for (const danceType of danceTypes) {
          const danceDocRef = doc(db, "dance_routines", danceType);
          const routinesCollectionRef = collection(danceDocRef, "routines");
          const routineQuerySnapshot = await getDocs(routinesCollectionRef);
          const danceVideos = [];

          routineQuerySnapshot.forEach((routineDoc) => {
            const routineData = routineDoc.data();
            const video = {
              routine_id: routineDoc.id,
              title: routineData.title,
              rhythm: routineData.rhythm,
              difficulty: routineData.difficulty,
              duration: routineData.duration,
              video_url: routineData.video_id,
              creator: routineData.creator,
            };

            danceVideos.push(video);
          });

          videoData[danceType] = danceVideos;
        }

        // Fetch the favorite videos from the favorites collection
        const favoritesCollectionRef = collection(db, "userData", userId, "favorites");
        const favoritesQuerySnapshot = await getDocs(favoritesCollectionRef);
        const favoriteVideoIds = favoritesQuerySnapshot.docs.map((doc) => doc.id);

        // Filter videos based on favorite routine IDs
        const filteredVideos = {};
        for (const danceType in videoData) {
          const danceVideos = videoData[danceType];
          const favoriteVideos = danceVideos.filter((video) =>
            favoriteVideoIds.includes(video.routine_id)
          );
          filteredVideos[danceType] = favoriteVideos;
        }

        setVideos(filteredVideos);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const favoritesCollectionRef = collection(db, "userData", userId, "favorites");
    const unsubscribe = onSnapshot(favoritesCollectionRef, fetchVideos);

    return () => unsubscribe();
    }, [userId]);

  return { videos, loading, error };
};

export default useFetchFavoriteVideos;
