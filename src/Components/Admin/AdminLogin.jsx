import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import AdminAxios from "../../Axios/AdminAxios";
import { adminLogin } from "../../Redex/Auth/AdminSlice";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminAxios.post("/login", { email, password });
      if (response) {
        dispatch(
            adminLogin({
            token: response.data.token,
            admin: response.data.admin.email,
          })
        );
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        navigate("/admin/home");
      }
    } catch (error) {
      toast.error(error.response?.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8 mt-20">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="font-sans text-center font-black text-indigo-500 text-3xl ">
              ADMIN | LOGIN
            </h1>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-60 absolute">
                  Admin Name
                </p>
                <input
                  placeholder="Admin Name"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="border placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-4 mr-0 mb-0 ml-0 text-base block bg-white
                             border-gray-300 rounded-md"
                />
              </div>

              <div className="relative">
                <p
                  className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                             absolute"
                >
                  Password
                </p>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className=" border placeholder-gray-400 focus:outline-none
                                focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-4 mr-0 mb-0 ml-0 text-base block bg-white
                                 border-gray-300 rounded-md"
                />
              </div>
              <div className="relative">
                <button
                  type="submit"
                  className="w-full inline-block pt-4 pr-5 pb-4 pl-5 mt-3 text-xl font-medium text-center text-white bg-indigo-500
                                  rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
