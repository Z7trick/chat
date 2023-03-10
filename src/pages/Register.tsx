import MyForm, { Values } from "../components/Form/Form";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toastOptions } from "../utils/toastOptions";
import { toast } from "react-toastify";
import { FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchRegister } from "../redux/slices/chatSlice";
const Register = () => {
  const navigate = useNavigate();
  const { status, user } = useAppSelector((state) => state.chatSlice);
  const dispatch = useAppDispatch();
  if (user && user.loggedIn) {
    return <Navigate to="/home" replace={true} />;
    // {user && user.loggedIn && <Navigate to="/home" replace={true} />}
  }
  const handleValidation = (values: Values) => {
    const { password, username } = values;
    if (username!.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password!.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };
  if (status === "loading") {
    toast.loading("Loading...", toastOptions);
  } else {
    toast.dismiss();
  }
  const handleSubmit = async (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    if (handleValidation(values)) {
      resetForm();
      const data = await dispatch(fetchRegister(values));
      if (!data.payload) {
        toast.dismiss();
        return toast.error("Something goes wrong", toastOptions);
      }
      if (data.payload.status) {
        toast.dismiss();
        return toast.error(data.payload.status, toastOptions);
      }
      localStorage.setItem("token", JSON.stringify(data.payload.token));
      navigate("/home");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-[320px]:text-sm sm:py-3 bg-primary max-w-screen min-h-screen h-auto flex justify-center flex-col items-center">
      <h2 className="text-3xl mb-7 text-white ">Signup</h2>
      <MyForm handleSubmit={handleSubmit} />
      <div className="text-gray-200 mt-6 w-max h-max rounded-xl py-1 px-3">
        <span>Already have an account?</span>
        <Link
          className="bg-gray-800 text-green-500 font-bold px-3 py-2 ml-3 rounded-xl hover:text-white hover:bg-green-500 transition-all ease-in"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
