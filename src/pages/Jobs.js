import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/job/jobApi";

const Jobs = () => {
  const { data } = useGetJobsQuery();
  console.log(data);
  // const { position } = data.data || {};
  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Find Jobs</h1>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
        {data?.data.map((jobData) => (
          <JobCard jobData={jobData} key={jobData._id} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
