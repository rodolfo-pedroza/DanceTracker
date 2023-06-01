import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const useFetchUserData = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    
    const fetchUserData = () => {
        setLoading(true);
        const userDocRef = doc(db, 'userData', user.uid);
        const profileDataRef = collection(userDocRef, 'profileData');

        const unsubscribe = onSnapshot(profileDataRef, (querySnapshot) => {
            if(querySnapshot.empty) {
                console.log('No matching documents.');
                setLoading(false);
                return;
            }

            const profileData = querySnapshot.docs[0].data();
            setUserData(profileData);
            setLoading(false);
        });

        return () => unsubscribe();
    }

    return { userData, loading, fetchUserData };
};

export default useFetchUserData;

