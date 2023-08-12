import { useNavigate, useParams } from "react-router-dom";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort } from "react-icons/bs";
import { useApplyMutation, useGetJobByIdQuery } from "../features/job/jobApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import DetailsSidebar from "../components/jobDetails/DetailsSidebar";
import GeneralQanA from "../components/jobDetails/GeneralQanA";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { data } = useGetJobByIdQuery(id, { pollingInterval: 1000 });
  const [apply, applyState] = useApplyMutation();

  const applicant = data?.data?.applicants.filter(
    (applicant) => applicant.id === user._id
  );

  useEffect(() => {
    applyState.isLoading && toast.loading("Applying ...", { id: "applyToJob" });

    if (applyState.isSuccess) {
      toast.success("Successfully applied", { id: "applyToJob" });
    }

    applyState.isError && toast.error(applyState.error, { id: "applyToJob" });
  }, [applyState]);

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
    console.log(applyData);
  };

  // console.log(applicant?.length);

  return (
    <div className="pt-14 grid grid-cols-12 gap-5">
      <div className="col-span-9 mb-10">
        <div className="h-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={meeting} alt="" />
        </div>

        <div className="space-y-5">
          <div className="flex justify-between items-center mt-5">
            <h1 className="text-xl font-semibold text-primary">{position}</h1>

            <button
              onClick={handleApply}
              disabled={applicant?.length}
              className="btn "
            >
              {applicant?.length ? "Applied" : "Apply"}
            </button>
          </div>

          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>

          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {skills?.map((skill) => (
                <li className="flex items-center" key={skill}>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <li className="flex items-center" key={skill}>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li className="flex items-center" key={skill}>
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
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
