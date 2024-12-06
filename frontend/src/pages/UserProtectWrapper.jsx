import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import { useState } from 'react';


const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const {user , setUser} = useContext(UserDataContext);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }

        axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            if (response.status === 200) {
              setUser(response.data.user);
              setIsLoading(false);
            }
        })
        .catch((error) => {
            console.log(error);
            localStorage.removeItem("token");
            navigate("/login");
        });
    }, [token, navigate]); 

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return null; 
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
