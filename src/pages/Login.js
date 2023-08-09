import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearError, googleLogin, loginUser } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const { email, isLoading, isError, error, role } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(loginUser(data));
    // reset();
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  useEffect(() => {
    // if (isLoading) {
    //   toast.loading("Loggin in....", { id: "login" });
    // }

    if (email && !isError) {
      reset();
      toast.success("Welcome to Jobbox", { id: "login" });
      role ? navigate("/dashboard") : navigate("/register");
    }

    if (isError) {
      toast.error(error, { id: "login" });
      dispatch(clearError());
    }
  }, [email, isError, isLoading, error, role]);

  return (
    <div className="flex h-screen items-center">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-[#FFFAF4] rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-5">
                  Email
                </label>
                <input type="email" {...register("email")} id="email" />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                />
              </div>

              {/* {isError && <p className="text-red-500">{error}</p>} */}

              <div className="relative !mt-8">
                <button
                  type="Submit"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full"
                >
                  Login
                </button>
              </div>
              <div>
                <p>
                  Don't have an account?
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="font-bold text-white py-3 rounded-full bg-primary w-full"
              >
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
