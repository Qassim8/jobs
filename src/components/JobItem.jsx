import { BookmarkSimple, Calendar } from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JobItem = ({ job }) => {
  const [favItems, setFavItems] = useState([]);
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
          setFavItems({ ...favItems, data });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const removeFav = async (id) => {
    try {
      const response = await axios.delete(
        `https://job-search-api-nine.vercel.app/api/favorites/${userId}/${id}`,
        {
          headers: {
            Authorization: `Barear Token`,
          },
        }
      );
      if (response.status === 200) {
        setFavItems(favItems.filter((el) => el.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

    useEffect(() => {
      getFavList();
    }, []);
  
  console.log(favItems)

  return (
    <div className="job-item">
      <p className="w-fit text-[13px] py-1 px-3 mb-5 bg-emerald-100 text-emerald-600 rounded-md flex justify-end items-center gap-2">
        <span>{job.job_posted_at}</span>
        <Calendar />
      </p>
      <h2 className="font-bold mb-2">{job.job_title}</h2>
      <p className="font-semibold">company: {job.employer_name}</p>
      <p className="text-emerald-800 text-sm font-bold mt-3">
        location: {job.job_location}
      </p>
      <p className="text-slate-500 text-sm mt-3">
        type: {job.job_employment_type}
      </p>
      <div className="flex justify-between items-center mt-5">
        {favItems && favItems?.find((el) => el.job_id === job.job_id) ? (
          <BookmarkSimple
            weight="fill"
            className={`text-slate-500 text-lg cursor-pointer`}
            onClick={() => removeFav(job.job_id)}
          />
        ) : (
          <BookmarkSimple
            className={`text-slate-500 text-lg cursor-pointer`}
            onClick={() =>
              addToFav({
                job_id: job.job_id,
                job_posted_at: job.job_posted_at,
                job_title: job.job_title,
                employer_name: job.employer_name,
                job_location: job.job_location,
                job_employment_type: job.job_employment_type,
              })
            }
          />
        )}
        <Link
          to={`/job/${job.job_id}`}
          className="auth-btn text-[12px] text-white"
        >
          Show details
        </Link>
      </div>
    </div>
  );
};

export default JobItem;
