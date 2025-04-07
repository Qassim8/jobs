import React from 'react'
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <section
      className="relative text-center bg-[url('https://www.myfamilyourneeds.co.uk/wp-content/uploads/2020/11/job-search-scaled.jpg')]
       bg-cover h-[80vh] before:absolute before:h-full before:w-full before:top-0 before:left-0 before:bg-slate-800/80"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 container mx-auto">
        <h1 className=" text-[40px] text-white">
          Explore thousands of career opportunities in various fields, and
          easily find the job that suits your skills
        </h1>
        <Link to="/search" className='auth-btn text-white max-w-fit mx-auto mt-5'>Search Jobs</Link>
      </div>
    </section>
  );
}

export default Banner