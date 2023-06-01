import { useState, useEffect } from 'react';

const useBmiBmr = ( user ) => {
    const [bmi, setBmi] = useState(null);
    const [bmr, setBmr] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (user) {
            const fetchBmr = async () => {
                setLoading(true);
                const response = await fetch('https://bmibmr-cirt52yvla-uc.a.run.app', {
                    method: 'POST',
                    body: JSON.stringify({
                        weight: user.weight,
                        height: user.height,
                        age: user.age,
                        gender: user.gener
                        })
                    });
                const bmrData = await response.json();
                setBmr(bmrData);
                setLoading(false);
            };  
        }

        if ( user.height && user.weight && user.age && user.gender ) {
            fetchBmr();
        }
    }, [user]);

    return { bmi, bmr, loading };
};

export default useBmiBmr;