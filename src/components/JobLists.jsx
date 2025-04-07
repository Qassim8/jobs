import React from "react";
import JobItem from "./JobItem";

const JobList = ({ jobs }) => {
  return (
    <div>
      {jobs.length === 0 ? (
        <p>Nothing to show</p>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobItem key={job.job_id} job={job} />
          ))}
        </section>
      )}
    </div>
  );
};

export default JobList;
