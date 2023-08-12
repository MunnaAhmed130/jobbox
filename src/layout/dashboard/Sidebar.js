import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const {
    user: { role },
  } = useSelector((state) => state.auth);

  const employerRoutes = [{ name: "Add job", path: "add-job" }];
  const candidateRoutes = [{ name: "Applied jobs", path: "applied-jobs" }];

  return (
    <div className="bg-primary/10 xl:col-span-2 lg:col-span-3 col-span-4 h-screen sticky top-0 ">
      <ul className="flex flex-col gap-2 w-full h-full  p-3 ">
        <div className="flex justify-between items-center text-primary my-1">
          <Link to="/" className="flex items-center">
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <h1 className="2xl:text-xl xl:text-lg lg:text-base">Dashboard</h1>
        </div>

        {role === "employer" &&
          employerRoutes.map((route) => (
            <SidebarList route={route} key={route.name} />
          ))}

        {role === "candidate" &&
          candidateRoutes.map((route) => (
            <SidebarList route={route} key={route.name} />
          ))}
      </ul>
    </div>
  );
};

const SidebarList = ({ route: { path, name } }) => {
  return (
    <li>
      <Link
        className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
        to={path}
      >
        {name}
      </Link>
    </li>
  );
};

export default Sidebar;
