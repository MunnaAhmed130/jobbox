import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
  const { pathname } = useLocation();
  const { email, role } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth).then(() => dispatch(logout()));
  };

  return (
    <nav
      className={`h-14  fixed w-full flex z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}
    >
      <div className="mx-10 w-full">
        <ul className="max-w-7xl w-full mx-auto flex gap-3 h-full items-center">
          <li className="flex-auto font-semibold text-2xl">
            <Link to="/">JobBox</Link>
          </li>
          <li>
            <Link className="hover:text-primary" to="/jobs">
              Jobs
            </Link>
          </li>

          {email ? (
            <button
              onClick={handleSignOut}
              className=" px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all"
            >
              LogOut
            </button>
          ) : (
            <li>
              <Link
                className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
                to="/login"
              >
                Login
              </Link>
            </li>
          )}

          {!role && email && (
            <li>
              <Link
                className="border border-black px-3 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
                to="/register"
              >
                Get started
              </Link>
            </li>
          )}

          {email && role && (
            <li>
              <Link
                className="border border-black px-3 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
