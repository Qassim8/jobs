import React, { useEffect, useState } from 'react'
import JobItem from '../components/JobItem'
import axios from 'axios';

function Favorites() {
  const [favItems, setFavItems] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

    // const getFavList = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://job-search-api-nine.vercel.app/api/favorites/${userId}`,
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     );
    //     const data = await response.data;
    //     if (response.status === 200) {
    //       setFavItems(data);
    //     }
    //   } catch (er) {
    //     console.log(er);
    //   }
    // };

    // useEffect(() => {
    //   getFavList();
    // }, []);

  return (
    <div className='py-16 container mx-auto'>
      <JobItem job={favItems} />
    </div>
  )
}

export default Favorites