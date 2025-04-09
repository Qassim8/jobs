import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const favContext = createContext({});
function FavoritesProvider({ children }) {
  const [favItems, setFavItems] = useState();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");
  const nav = useNavigate();

  const getFavList = async () => {
    try {
      const response = await axios.get(
        `https://job-search-api-nine.vercel.app/api/favorites/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.data;
      if (response.status === 200) {
        setFavItems(data);
      }
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
      if (token) { getFavList(); }
  }, [token]);

  const addToFav = async (data) => {
    if (!token || !userId) {
      nav("/login");
    } else {
      try {
        const response = await axios.post(
          `https://job-search-api-nine.vercel.app/api/favorites/${userId}`,
          { ...data },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 201) {
          setFavItems([...favItems, data]);
          getFavList();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const removeFav = async (id) => {
    try {
      const response = await axios.delete(
        `https://job-search-api-nine.vercel.app/api/favorites/${userId}`,
        {
          data: { job_id: id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setFavItems(favItems.filter((el) => el.job_id !== id));
        getFavList();
      }
    } catch (err) {
      console.log(err);
    }
  };

    return <favContext.Provider value={{ favItems, addToFav, removeFav }}>{ children }</favContext.Provider>;
}

export default FavoritesProvider;
