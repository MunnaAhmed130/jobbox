const DetailsSidebar = ({ data }) => {
  const {
    companyName,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
  } = data?.data || {};

  const companyWebsite = "#";

  return (
    <div className="col-span-3">
      <div className="rounded-xl bg-primary/10 p-5 text-primary space-y-5">
        <div>
          <p>Experience</p>
          <h1 className="font-semibold text-lg">{experience}</h1>
        </div>

        <div>
          <p>Work Level</p>
          <h1 className="font-semibold text-lg">{workLevel}</h1>
        </div>

        <div>
          <p>Employment Type</p>
          <h1 className="font-semibold text-lg">{employmentType}</h1>
        </div>

        <div>
          <p>Salary Range</p>
          <h1 className="font-semibold text-lg">{salaryRange}</h1>
        </div>

        <div>
          <p>Location</p>
          <h1 className="font-semibold text-lg">{location}</h1>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5">
        <div>
          <h1 className="font-semibold text-lg">{companyName}</h1>
        </div>

        <div>
          <p>Company Size</p>
          <h1 className="font-semibold text-lg">Above 100</h1>
        </div>

        <div>
          <p>Founded</p>
          <h1 className="font-semibold text-lg">2001</h1>
        </div>

        <div>
          <p>Email</p>
          <h1 className="font-semibold text-lg">company.email@name.com</h1>
        </div>

        <div>
          <p>Company Location</p>
          <h1 className="font-semibold text-lg">Los Angeles</h1>
        </div>

        <div>
          <p>Website</p>
          <a className="font-semibold text-lg" href={companyWebsite}>
            https://website.com
          </a>
        </div>
      </div>
    </div>
  );
};
export default DetailsSidebar;
