import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { showToast } from "../redux/slices/ToastSlice";
import { useDispatch } from "react-redux";
import { PasswordInput, TextLabelInput } from "../components/FormFields";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Spinner from "../components/Spinner";
import { setUserId, setUserProfile } from "../redux/slices/authSlice";
import { fetchUserProfile } from "../services/dashboardService";
import { errorHandler } from "../utils/utils";

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const fetchUser = async (id) => {
    const response = await fetchUserProfile(id);
    if (!response.error) {
      dispatch(
        showToast({
          status: "success",
          message: "Log in successful",
        })
      );
      dispatch(setUserProfile(response.data));
      navigate("/dashboard");
    } else {
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
    }
  };
  return (
    <div className="bg-gray-50 auth_bg min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto">
        <div>
          <h1 className="text-center text-3xl mb-5 logo">+ Sales Plus +</h1>
        </div>
        <div className="py-8 px-5 border border-gray-300 rounded-md bg-white">
          <div>
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p>Enter your credentials to access your account</p>
          </div>
          <div className="mt-5">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  const userCredential = await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  );
                  setLoading(false);

                  dispatch(setUserId(userCredential.user.uid));
                  fetchUser(userCredential.user.uid);
                } catch (error) {
                  setLoading(false);
                  dispatch(
                    showToast({
                      status: "error",
                      message: "Check credentials and try again",
                    })
                  );
                }
              }}
            >
              <Form>
                <div className="grid grid-cols-1 gap-5">
                  <TextLabelInput
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Email Address"
                  />
                  <PasswordInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <a href={"/forgot-password"}>
                  <p className="text-sm mt-2 font-semibold mb-3 text-primary inline">
                    Forgot your password?
                  </p>
                </a>
                <button
                  className="cursor-pointer font-semibold w-full block h-12 rounded-lg mt-8 bg-primary text-white hover:bg-primary-dark active:scale-[0.98]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Log In"}
                </button>
              </Form>
            </Formik>
            <div className="flex justify-center mt-3 mb-3">
              <p className="text-gray-400 text-sm">
                {"Don't have an account?"}{" "}
                <a href={"/signup"}>
                  <span className="text-primary font-semibold">Sign Up</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
