import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";

const useFitbitData = (baseDate) => {
  const { authToken } = useAuth();
  const [fitbitData, setFitbitData] = useState({ calories: 0, steps: 0, distance: 0 });

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

          if (response.ok) {
            const data = await response.json();

            if (data[`activities-${resource}`] && data[`activities-${resource}`].length > 0) {
              const value = data[`activities-${resource}`][0].value;

              if (resource === "calories") {
                setFitbitData((prevData) => ({ ...prevData, calories: value }));
              } else if (resource === "steps") {
                setFitbitData((prevData) => ({ ...prevData, steps: value }));
              } else if (resource === "distance") {
                setFitbitData((prevData) => ({ ...prevData, distance: value }));
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

  return fitbitData;
};

export default useFitbitData;
