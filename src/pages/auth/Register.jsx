import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const addUser = async () => {
    const userData = { username, email, password };
    try {
      setLoading(true)
      const response = await axios.post(
        "https://job-search-api-nine.vercel.app/api/auth/register",
         userData 
      );

      if (response.status === 201) {
        setSuccess(true);
        setInvalid(false);
        setLoading(false);
      }
    } catch (er) {
      if (er.response && er.response.status === 400) {
        setInvalid(true);
      }
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (username.length < 8)
      newErrors.username = "Username must be more than 8 char";
    if (email === "") newErrors.email = "Email is required";
    if (password.length < 8)
      newErrors.password = "Password must be more than 8 char";

    if (Object.values(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addUser();
    }
  };

  return (
    <>
      <SuccessModal
        show={success}
        close={() => {
          setUsername("");
          setEmail("");
          setPassword("");
          setSuccess(!success);
        }}
      />
      <div className=" mt-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-center text-2xl/9 font-bold tracking-tight text-gray-800">
            Create an Account
          </h1>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
            <form className="space-y-3" onSubmit={submitForm}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your name...."
                    className="block w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-700"
                >
                  Email Address
                </label>
                {invalid && (
                  <p className="text-red-500 text-sm text-end">
                    Email already exist!
                  </p>
                )}
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address..."
                    className="block w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="***********"
                    className="block w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="text-sm/6">
                <Link
                  to="/login"
                  className="font-semibold text-sky-600 hover:text-sky-500"
                >
                  Already have an account? Login
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md ${
                    loading
                      ? "bg-emerald-300 cursor-not-allowed"
                      : "bg-emerald-500 hover:bg-emerald-500"
                  } px-3 py-1.5 text-sm/6 font-semibold
                   text-white shadow-sm 
                   `}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
