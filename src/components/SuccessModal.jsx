import { Check, X } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";

function SuccessModal({ show, close }) {
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } fixed top-0 z-50 w-full h-screen before:absolute before:h-full before:w-full before:top-0 before:left-0 before:bg-slate-700/25 duration-300`}
    >
      <div className="absolute w-1/2 md:w-1/4 p-4 text-center bg-white rounded-lg shadow top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
                  className="text-slate-500 absolute top-2.5 right-2.5 hover:text-slate-800 text-md"
                  onClick={close}
              >
                  <X />
        </button>
        <div className="w-16 h-16 rounded-full bg-emerald-500 p-2 flex items-center justify-center mx-auto mb-3.5">
         <Check className="text-3xl text-white" />
        </div>

        <p className="text-slate-600 my-5">User created successfuly</p>
        <Link
                  to="/login"
                  onClick={close}
          className="auth-btn py-2 block w-1/2 mx-auto text-md text-center text-white !rounded-md !bg-emerald-500 hover:!bg-emerald-600"
        >
          Login now
        </Link>
      </div>
    </div>
  );
}

export default SuccessModal;
