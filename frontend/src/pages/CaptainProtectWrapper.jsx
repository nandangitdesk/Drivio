import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';


const CaptainProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('captain-token');

    const {captain , setCaptain} = useContext(CaptainDataContext);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/captain-login");
        }
    }, [token, navigate]); 

    if (!token) {
        return null; 
    }

    axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/captains/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            
            setCaptain(response.data.captain);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("captain-token");
          navigate("/captain-login");
        });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
