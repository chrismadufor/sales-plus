import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { showToast } from "../redux/slices/ToastSlice";
import { useDispatch } from "react-redux";
import { PasswordInput, TextLabelInput } from "../components/FormFields";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = false;
  return (
    <div className="bg-gray-50 min-h-screen py-20 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto">
        <div>
          <h1 className="text-center text-3xl mb-5 logo">+ Sales Plus +</h1>
        </div>
        <div className="py-8 px-5 border border-gray-300 rounded-md bg-white">
          <div>
            <h1 className="text-2xl font-semibold">Create an account</h1>
            <p>Fill the form below to create your account</p>
          </div>
          <div className="mt-5">
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                businessName: "",
                businessAddress: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                phone: Yup.string().required("Phone number is required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
                password: Yup.string()
                  .min(8, "Must be 8 characters or more")
                  .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/,
                    "Password must contain one uppercase and lowercase letter, a number and a special character"
                  )
                  .required("Password is required"),
                confirmPassword: Yup.string()
                  .required("Confirm Password is required")
                  .oneOf([Yup.ref("password"), null], "Password must match"),
                businessName: Yup.string().required("Business name is required"),
                businessAddress: Yup.string().required("Business address is required"),
              })}
              onSubmit={async (values) => {
                console.log("Login", values);
                dispatch(
                  showToast({
                    status: "success",
                    message: "Sign up successful",
                  })
                );
                navigate("/")
              }}
            >
              <Form>
                <div className="grid grid-cols-1 gap-3">
                  <TextLabelInput
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                  />
                  <TextLabelInput
                    label="Email Address"
                    name="email"
                    type="text"
                    placeholder="janedoe@gmail.com"
                  />
                  <TextLabelInput
                    label="Phone Number"
                    name="phone"
                    type="text"
                    placeholder="+4472343875"
                  />
                  <TextLabelInput
                    label="Business Name"
                    name="businessName"
                    type="text"
                    placeholder="Zara Stores"
                  />
                  <TextLabelInput
                    label="Business Address"
                    name="businessAddress"
                    type="text"
                    placeholder="No 10 Downing street"
                  />
                  <PasswordInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <PasswordInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                <button
                  className="cursor-pointer font-semibold w-full block h-12 rounded-lg mt-8 bg-primary text-white hover:bg-primary-dark active:scale-[0.98]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Create Account"}
                </button>
              </Form>
            </Formik>
            <div className="flex justify-center mt-3 mb-3">
              <p className="text-gray-400 text-sm">
                {"Don't have an account?"}{" "}
                <a href={"/"}>
                  <span className="text-primary font-semibold">Sign in</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
