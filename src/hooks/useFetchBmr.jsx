import { useState } from "react";

const useFetchBmr = (weight, height, age, gender) => {
  const [bmr, setBmr] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBmr = async () => {
    try {
      setLoading(true);
      console.log("values fetch", weight, height, age, gender);
      const response = await fetch("https://bmibmr-cirt52yvla-uc.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weight, height, age, gender }),
      });
      const responseText = await response.text();
      const bmrData = JSON.parse(responseText);
      if (bmrData.bmr !== undefined) {
        setBmr(bmrData.bmr);
      } else {
        console.error("Invalid BMR data received:", bmrData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching BMR:", error);
    }
  };

  return { bmr, loading, fetchBmr };
};

export default useFetchBmr;
