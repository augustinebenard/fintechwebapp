import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginHeroImage as bank } from "../assets/images";
import { herconomyLogoWhite as logo } from "../assets/images";
import { herconomyLogo as logo2 } from "../assets/images";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/auth.slice";
import { User } from "../model/user.model";

const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users);
  const router = useNavigate();
  const toastId = React.useRef(null) as any;
  const [form, setForm] = useState({ username: "", password: "" });
  const { username, password } = form;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e?.target?.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "" || password === "") {
      return toast.error("Please fill in all fields");
    }
    const user = users.find(
      (user: User) =>
        user.password === form.password && user.username === form.username
    );
    if (user) {
      if(user.active === false) {
        return toast.error("Your account has been disabled. Please contact the admin");
      }
      dispatch(authActions.login(user));
      router("/app/dashboard");
      if (!toast.isActive(toastId.current)) {
        return (toastId.current = toast.success("Login Successful"));
      }
    } else {
      if (!toast.isActive(toastId.current)) {
        return (toastId.current = toast.error("Invalid Username or Password"));
      }
    }
  };

  return (
    <main className="bg-primary-500 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-0">
      <div className="relative hidden lg:block z-20">
        <div className="absolute top-[15%] right-[50%] translate-x-[50%] translate-y-[50%]">
          <h1 className="text-center text-gray-100 text-[1.5rem] lg:text-[1.2rem] xl:text-[1.6rem] 2xl:text-[1.6rem]">
            Welcome to
          </h1>
          <div className="w-60 lg:w-[10rem] xl:w-[14rem] 2xl:w-[14rem] mx-auto mt-1">
            <img src={logo} alt="LoginImage" width={220} height={100} />
          </div>
        </div>
        <img
          src={bank}
          alt="LoginImage"
          className="bg-cover bg-center w-full h-[100vh]"
        />

        <div className="absolute bottom-[5%] right-[50%] translate-x-[50%] translate-y-[50%] whitespace-nowrap">
          <h2 className="italic font-bold text-primary-100">
            For Women Who Want To{" "}
            <span className="text-yellow-600">
              Take Control Of Their Finances........
            </span>
          </h2>
        </div>
      </div>
      <div className="bg-primary-500 text-slate-900 relative h-screen overflow-auto lg:h-auto w-[100%] p-2 lg:p-0 flex flex-col">
        <div className="flex w-[100%] m-auto">
          <div className="m-auto lg:my-auto md:ml-18 lg:ml-18 xl:ml-20 w-[100%] sm:w-[80%] md:w-[85%] lg:w-[40rem]">
            <div className="lg:hidden flex mb-8">
              <div className="my-auto">
                <h1 className="text-center font-semibold text-primary-900 text-[1.5rem] mr-2">
                  Welcome to
                </h1>
              </div>
              <div className="mb-auto">
                <img src={logo2} alt="LoginImage" width={220} height={50} />
              </div>
            </div>
            <h1 className="text-[1.4rem] md:text-[2rem] text-gray-500 font-bold">
              Admin Login
            </h1>
            <p className="text-[.8rem] md:text-[1rem] text-gray-300">
              Enter your credentials to login in to your account
            </p>
            <div className="text-gray-500">
              {/* use default login credentials */}
              <p className="text-[.6rem] italic md:text-[.8rem] text-gray-900 my-2">
                Default Admin Login Credentials:{" "}
                <span className="text-purple-600 font-bold">
                  {"{Username: Austin}"}
                </span>{" "}
                <span className="text-purple-800 font-bold">
                  {"{Password: 123456}"}
                </span>
              </p>

              <p className="text-[.6rem] italic md:text-[.8rem] text-gray-900 my-2">
                Default User Login Credentials:{" "}
                <span className="text-green-600 font-bold">
                  {"{Username: TestUser}"}
                </span>{" "}
                <span className="text-green-800 font-bold">
                  {"{Password: 123456}"}
                </span>
              </p>
            </div>
            <form
              className="py-2 m-auto"
              autoComplete="new-password"
              onSubmit={handleSubmit}
            >
              <Input
                name="username"
                label="Username"
                type="text"
                value={username}
                onChange={handleOnChange}
                placeholder="Enter username"
                required
              />
              <Input
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter password"
                required
              />

              <div className="flex">
                <p className="font-[500] text-[#FFFBFE] my-auto">
                  Forgot Password?
                </p>
              </div>
              <div className="my-6 md:my-6">
                <Button
                  disabled={isLoading || username === "" || password === ""}
                  className="relative z-20 text-[1.2rem]"
                  name="Log In"
                  value="Log In"
                  type="submit"
                  fullWidth
                >
                  {isLoading ? "Please wait..." : "Log In"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
