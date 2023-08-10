import { useEffect, useState } from "react";
import loginImage from "../assets/login.svg";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createUser,
  googleLogin,
} from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const [disabled, setDisabled] = useState(true);
  const {
    user: { email },
    authIsLoading,
    isError,
    error,
  } = useSelector((state) => state.auth);

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  // console.log(password, confirmPassword);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (authIsLoading) {
      toast.loading("Signing up....", { id: "signup" });
    }

    if (email && !isError) {
      toast.success("Sign up successful", { id: "signup" });
      reset();
      navigate("/register");
    }

    if (isError) {
      toast.error(error, { id: "signup" });
      dispatch(clearError());
    }
  }, [email, isError, authIsLoading, error]);

  const onSubmit = (data) => {
    // console.log(data);
    const { email, password } = data;
    dispatch(createUser({ email, password }));
    // reset();
  };

  return (
    <div className="flex h-screen items-center pt-14">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-[#FFFAF4] rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email")}
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="confirm-password" className="ml-5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  {...register("confirmPassword")}
                />
              </div>
              <div className="!mt-8 ">
                {/* {isError && <span className="break-words">{error}</span>} */}
                <button
                  type="submit"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={disabled}
                >
                  Sign up
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
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

export default Signup;
