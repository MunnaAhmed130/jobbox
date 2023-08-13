import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRegisterMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";
import {
  businessCategory,
  employeeRange,
  genderOption,
} from "../../assets/constants";

const EmployerRegistration = () => {
  const [countries, setCountries] = useState([]);

  const {
    user: { email },
  } = useSelector((state) => state.auth);

  const [postUser, { isLoading, isError, isSuccess, error }] =
    useRegisterMutation();

  const { handleSubmit, register, control } = useForm({
    defaultValues: { email },
  });

  const term = useWatch({ control, name: "term" });
  const navigate = useNavigate();

  useEffect(() => {
    isLoading && toast.loading("Submitting form ...", { id: "emplyer" });

    if (isSuccess) {
      toast.success("Emplyer registration complete", { id: "emplyer" });
      navigate("/");
    }

    isError && toast.error(error, { id: "emplyer" });
  }, [isLoading, isError, isSuccess]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const onSubmit = (data) => {
    const formData = { ...data, email: email, role: "employer" };
    postUser(formData);
  };

  return (
    <div className="pt-14">
      <div
        onClick={() => navigate("/register")}
        className="cursor-pointer w-fit mt-5 flex items-center"
      >
        <FaChevronLeft />
        <p>back</p>
      </div>

      <div className="flex justify-center items-center overflow-auto p-10">
        <form
          className="bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="w-full text-2xl text-primary mb-5">Employer</h1>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="firstName">
              First Name
            </label>
            <input type="text" id="firstName" {...register("firstName")} />
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input type="text" id="lastName" {...register("lastName")} />
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="text-gray-500"
              type="email"
              id="email"
              disabled
              {...register("email")}
            />
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <h1 className="mb-3">Gender</h1>
            <div className="flex gap-3">
              {genderOption.map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    id={option.value}
                    {...register("gender")}
                    value={option.value}
                  />
                  <label className="ml-2 text-lg" htmlFor={option.value}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <hr className="w-full mt-2 bg-black" />

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="companyName">
              Company's name
            </label>
            <input type="text" {...register("companyName")} id="companyName" />
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-3" htmlFor="employeeRange">
              Number of employee
            </label>
            <select {...register("employeeRange")} id="employeeRange">
              {employeeRange
                .sort((a, b) => a.localeCompare(b))
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-3" htmlFor="companyCategory">
              Company's Category
            </label>
            <select {...register("companyCategory")} id="companyCategory">
              {businessCategory
                .sort((a, b) => a.localeCompare(b))
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="roleInCompany">
              Your role in company
            </label>
            <input
              type="text"
              {...register("roleInCompany")}
              id="roleInCompany"
            />
          </div>

          <div className="flex justify-between items-center w-full mt-3">
            <div className="flex  w-full max-w-xs">
              <input
                className="mr-3"
                type="checkbox"
                {...register("term")}
                id="terms"
              />
              <label htmlFor="terms">I agree to terms and conditions</label>
            </div>

            <button disabled={!term} className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerRegistration;
