import { useEffect, useState } from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/job/jobApi";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { data, isSuccess } = useGetJobsQuery();

  const {
    user: { _id },
  } = useSelector((state) => state.auth);

  const { pathname } = useLocation();

  const postedJobs = data?.data?.filter((company) => company.companyId === _id);

  // console.log(data);
  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">
          {pathname.includes("/job") ? "Find Jobs" : "Posted Jobs"}
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
        {pathname.includes("/job") &&
          isSuccess &&
          data?.data?.map((jobData) => (
            <JobCard jobData={jobData} key={jobData._id} />
          ))}

        {!pathname.includes("/job") &&
          isSuccess &&
          postedJobs.map((jobData) => (
            <JobCard jobData={jobData} key={jobData._id} />
          ))}
      </div>
    </div>
  );
};

export default Jobs;
