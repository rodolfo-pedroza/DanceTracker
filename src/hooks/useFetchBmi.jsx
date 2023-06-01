import { useState } from "react";

const useFetchBmi = ( weight, height ) => {
    const [bmi, setBmi] = useState(null);
    const [classification, setClassification] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBmi = async () => {
        try {
            const response = await fetch('https://calculatebmi-cirt52yvla-uc.a.run.app', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    weight: weight,
                    height: height,
                })
            });

            if (!response.ok) { 
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setBmi(data.bmi);
            setClassification(data.classification);
            setLoading(false);
        } catch (error) {
            console.log('There has been a problem with your fetch operation: ', error);
        }
    };

    return { bmi, classification, loading, fetchBmi };
}

export default useFetchBmi;