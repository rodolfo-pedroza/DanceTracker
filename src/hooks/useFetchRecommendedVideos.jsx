import { useState, useEffect } from 'react'

const useFetchRecommendedVideos = (user, bmi, bmr, bmiClassification) => {
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
            genre: user.genre,
            weight: user.weight,
            height: user.height,
            bmiClassification,
            bmi,
            bmr,
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

        // Log the error object
        console.log('Error object:', error);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, bmiClassification, bmi, bmr]);

  return { data, error, isLoading };
};

export default useFetchRecommendedVideos;

