import { BookmarkSimple, Check } from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

function JobDetails() {
  const [job, setJob] = useState({});
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  const fetchJob = async () => {
    try {
      setLoad(true);
      const response = await axios.get(
        `https://jsearch.p.rapidapi.com/job-details`,

        {
          params: { job_id: id },
          headers: {
            "x-rapidapi-key":
              "dfea7ee3cfmshbf3514d40aa0a4dp184dd9jsn3d74d929eca6",
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
          },
        }
      );
      const data = await response.data;
      if (response.status === 200) {
        setLoad(false);
        setJob(data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);


  return load ? (
    <Loader />
  ) : (
    <div className="my-16 p-5 container mx-auto border border-slate-400 rounded-md">
      <h1 className="text-3xl font-bold text-slate-800">{job[0]?.job_title}</h1>
      <h1 className="text-2xl text-slate-700 pt-3">{job[0]?.job_publisher}</h1>
      <div className="flex justify-between items-center pt-5 pb-2 border-b border-slate-400">
        <p className="text-slate-600">Location: {job[0]?.job_location}</p>
        <p className="text-slate-600">{job[0]?.job_posted_at}</p>
      </div>
      <div className="py-5">
        <h3 className="text-xl text-slate-800 pb-2">Description</h3>
        <p className="text-slate-600">{job[0]?.job_description}</p>
      </div>
      <div className="flex justify-between items-center py-5">
        <div>
          <h3 className="text-lg text-slate-700">Benefits</h3>
          <div className="flex flex-col gap-3">
            {job[0]?.job_benefits?.map((item) =>
              item ? (
                <p className="flex items-center gap-2">
                  <Check className="text-emerald-400 text-xl font-extrabold" />
                  {item}
                </p>
              ) : (
                <p>No Benefits</p>
              )
            )}
          </div>
        </div>
      </div>
      <Link
        target="_blank"
        to={job[0]?.job_apply_link}
        className="auth-btn text-white w-full"
      >
        Apply Now
      </Link>
    </div>
  );
}

export default JobDetails;
