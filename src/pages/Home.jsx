import React, { useEffect, useState } from "react";
import JobItem from "../components/JobItem";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [load, setLoad] = useState(false);
  const countries = ['sa', 'fr', 'ca', 'gr', 'tr'];

  const fetchJobs = async () => {
    try {
      setLoad(true)
      const response = await axios.get(
        `https://jsearch.p.rapidapi.com/search`,

        {
          params: {
            query: "all",
            country: countries
          },
          headers: {
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
            "X-RapidAPI-Key":
              "dfea7ee3cfmshbf3514d40aa0a4dp184dd9jsn3d74d929eca6",
          },
        }
      );
      const data = await response.data;
      if (response.status === 200) {
        setLoad(false);
        setJobs(data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Banner />
      <section className="py-16 container mx-auto">
        <h1 className="mb-10 text-3xl font-bold">Jobs</h1>
        {load ? (
          <Loader />
        ) : (
          <>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
              {jobs?.map((job, idx) => (
                <JobItem key={idx} job={job} />
              ))}
            </div>
            <Link
              to="/search"
              className="auth-btn text-white w-fit mt-10 mx-auto"
            >
              Search job
            </Link>
          </>
        )}
      </section>
    </>
  );
}

export default Home;
