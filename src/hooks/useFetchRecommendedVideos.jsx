import { useState, useEffect } from 'react'

const useFetchRecommendedVideos = (user) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://us-central1-dancetracker-0.cloudfunctions.net/recommendVideos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            age: user.age,
            bmi: user.bmi,
            bmr: user.bmr,
            bmiClassification: user.classification,
            genre: user.genre,
            weight: user.weight,
            height: user.height,
          }),
        });

        if (!response.ok) {
          throw new Error('Error fetching recommended videos');
        }

        const data = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { data, error, isLoading };
};

export default useFetchRecommendedVideos;

