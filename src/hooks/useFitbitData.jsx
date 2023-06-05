import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";

const useFitbitData = (baseDate) => {
  const { authToken } = useAuth();
  const [calories, setCaloriesBurned] = useState(0);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const fetchFitbitData = async () => {
      if (baseDate) {
        const detailLevel = "15min";
        const resources = ["calories", "steps", "distance"];

        for (const resource of resources) {

          const url = `https://api.fitbit.com/1/user/-/activities/${resource}/date/${baseDate}/1d/${detailLevel}.json`;

          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          console.log("URL:", url);
        //   console.log("Response status:", response.status);

          if (response.ok) {
            const data = await response.json();
            console.log("Data:", data);

            if (data[`activities-${resource}`] && data[`activities-${resource}`].length > 0) {
              const value = data[`activities-${resource}`][0].value;
              console.log(`${resource} value:`, value);
              if (resource === "calories") {
                setCaloriesBurned(value);
              } else if (resource === "steps") {
                setSteps(value);
              } else if (resource === "distance") {
                setDistance(value);
              }
            } else {
              console.log(`No ${resource} data`);
            }
          } else {
            console.log(`Error fetching ${resource} data`);
          }
        }
      } else {
        console.log("No baseDate");
      }
    };

    fetchFitbitData();
  }, [baseDate, authToken]);

  return { calories, steps, distance };
};

export default useFitbitData;
