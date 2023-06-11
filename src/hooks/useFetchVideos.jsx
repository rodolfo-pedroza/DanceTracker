import { useState, useEffect } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const useFetchVideos = () => {
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              video_id: routineData.video_id,
              creator: routineData.creator,
            };

            danceVideos.push(video);
          });

          videoData[danceType] = danceVideos;
        }

        setVideos(videoData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading, error };
};

export default useFetchVideos;
