import { useEffect } from "react";

const useCollectCalories = (startTime, endTime, authToken) => {
    useEffect(() => {
        const collectCalories = async () => {
            if (startTime && endTime) {
                const baseDate = new Date(startTime).toISOString().split("T")[0];
                const detailLevel = "1min";
                const resource = "calories";
                const startTimeObj = new Date(startTime);
                const startTimeUrl = startTimeObj.toLocaleTimeString("en-US", {
                    timeZone: "America/Mexico_City",
                    hour12: false,
                });
                const endTimeObj = new Date(endTime);
                const endTimeUrl = endTimeObj.toLocaleTimeString("en-US", {
                    timeZone: "America/Mexico_City",
                    hour12: false,
                });
                const url = `https://api.fitbit.com/1/user/-/activities/${resource}/date/${baseDate}/1d/${detailLevel}/time/${startTimeUrl}/${endTimeUrl}.json`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                console.log("url", url);

                console.log("Response status:", response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log("data", data);

                    if (
                        data["activities-calories"] &&
                        data["activities-calories"].length > 0
                    ) {
                        const caloriesBurned = data["activities-calories"][0].value;
                        console.log("caloriesBurned", caloriesBurned);
                    } else {
                        console.log("No calories burned");
                    }
                } else {
                    console.log("Error fetching data");
                }
            } else {
                if (!startTime) {
                    console.log("No startTime");
                }
                if (!endTime) {
                    console.log("No endTime");
                }

            }
        };
        collectCalories();
    }, [startTime, endTime, authToken]);
    
    return { collectCalories };
};

export default useCollectCalories;