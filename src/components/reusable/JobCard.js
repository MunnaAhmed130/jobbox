import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetJobByIdQuery } from "../../features/job/jobApi";

const JobCard = ({ jobData }) => {
  const { _id, position, companyName, location, employmentType, openStatus } =
    jobData || {};

  const { data } = useGetJobByIdQuery(_id, { pollingInterval: 1000 });
  const applicants = data?.data?.applicants.length;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      key={_id}
      className="border border-gray-300 shadow-xl p-5 rounded-2xl text-primary"
    >
      <div className="flex justify-between  text-primary">
        <div>
          <p className="text-xl">{position}</p>
          <small className="text-primary/70 ">
            by{" "}
            <span className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all">
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      <div className="flex justify-between items-center mt-5">
        <p>{employmentType}</p>

        {pathname.includes("/posted-jobs") && (
          <button className="btn text-sm">
            Applicants
            <span> {applicants}</span>
          </button>
        )}

        <button className="btn" onClick={() => navigate(`/job-details/${_id}`)}>
          Details
        </button>
      </div>
      <div className="text-center mt-5">
        <span className=" px-4 py-2 border border-primary text-primary rounded-full">
          {openStatus ? "Open for application" : "Closed"}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
