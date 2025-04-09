import { BookmarkSimple, Calendar } from "@phosphor-icons/react";
import { useContext } from "react";
import { Link} from "react-router-dom";
import { favContext } from "../context/FavoritesProvider";

const JobItem = ({ job }) => {

  const {favItems, addToFav, removeFav} = useContext(favContext)  

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
