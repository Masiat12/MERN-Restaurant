import React from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Modal";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white shadow z-50">
      <div className="modal-action flex flex-col justify-center mt-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body"
        method="dialog"
      >
        <h3 className="font-bold text-black text-lg">Create an account</h3>

        {/* email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            {...register("email")}
          />

          {/* password */}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            {...register("password")}
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover mt-1">
              Forgot password?
            </a>
          </label>
        </div>
        {/* error text */}

        {/* signup btn */}
        <div className="form-control mt-6">
          <input
            type="submit"
            value="SignUp"
            className="btn bg-green text-white"
          />
        </div>
        <p className="text-center my-2">
          Have an account?{" "}
          <button 
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className="underline text-red ml-1">
            Login
          </button>{" "}
        </p>
        <Link
          to="/"
          onClick={() => document.getElementById("my_modal_3").close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </Link>
      </form>

      {/* social sign in */}
      <div className="text-center space-x-3 mb-5">
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaGoogle />
        </button>
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaFacebookF />
        </button>
        <button className="btn btn-circle hover:bg-green hover:text-white">
          <FaGithub />
        </button>
      </div>
    </div>
    <Modal/>
    </div>
  );
};

