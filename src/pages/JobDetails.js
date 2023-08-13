import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import meeting from "../assets/meeting.jpg";
import {
  useApplyMutation,
  useGetJobByIdQuery,
  useStatusMutation,
} from "../features/job/jobApi";
import DetailsSidebar from "../components/jobDetails/DetailsSidebar";
import GeneralQanA from "../components/jobDetails/GeneralQanA";
import List from "../components/jobDetails/List";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { data } = useGetJobByIdQuery(id, { pollingInterval: 1000 });

  const [status, statusState] = useStatusMutation();
  const [apply, applyState] = useApplyMutation();

  const { applicants, openStatus } = data?.data || {};

  const AlreadyApplied =
    applicants && applicants.filter((applicant) => applicant.id === user._id);

  useEffect(() => {
    applyState.isLoading && toast.loading("Applying ...", { id: "applyToJob" });

    if (applyState.isSuccess) {
      toast.success("Successfully applied", { id: "applyToJob" });
    }

    applyState.isError && toast.error(applyState.error, { id: "applyToJob" });
  }, [applyState]);

  useEffect(() => {
    statusState.isSuccess &&
      toast.success(`Job is ${openStatus ? "close" : "open"} to applicants`, {
        id: "status",
      });
  }, [statusState]);

  const { position, skills, requirements, responsibilities, overview, _id } =
    data?.data || {};

  const handleApply = () => {
    if (user.role === "employer") {
      toast.error("you need a candidate account to apply");
      return;
    }

    if (user.role === "") {
      navigate("/register");
      return;
    }

    const applyData = {
      userId: user._id,
      email: user.email,
      jobId: _id,
    };

    apply(applyData);
  };

  return (
    <div className="pt-14 grid grid-cols-12 gap-5">
      <div className="col-span-9 mb-10">
        <div className="h-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={meeting} alt="" />
        </div>

        <div className="space-y-5">
          <div className="flex justify-between items-center mt-5">
            <div>
              <h1 className="text-xl font-semibold text-primary inline-block">
                {position}
              </h1>
              <span className="border rounded-full py-1.5 px-4 ml-4">
                {openStatus ? "Open for application" : "Closed"}
              </span>
            </div>
            {user.role === "candidate" && openStatus && (
              <button
                onClick={handleApply}
                disabled={AlreadyApplied?.length}
                className="btn "
              >
                {AlreadyApplied?.length ? "Applied" : "Apply"}
              </button>
            )}

            {user.role === "employer" && (
              <div className="">
                <p className="border rounded-full py-1 px-5 bg-primary/10 text-primary font-semibold inline-block mr-5">
                  Number of applicants - {applicants.length}
                </p>
                <button
                  onClick={() => status({ id })}
                  className="btn"
                  disabled={statusState.isLoading}
                >
                  {openStatus ? "Close" : "Open"} Position
                </button>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>

          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {skills?.map((skill) => (
                <List skill={skill} />
              ))}
            </ul>
          </div>

          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <List skill={skill} />
              ))}
            </ul>
          </div>

          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <List skill={skill} />
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-5" />

        <GeneralQanA user={user} data={data} />
      </div>
      <DetailsSidebar data={data} />
    </div>
  );
};

export default JobDetails;
